import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import KafkaService from './auth.kafka';
import SignUpDto from './dto/sign-up.dto';
import AuthRepository from './auth.repository';
import Tokens from './interfaces/tokens.interface';
import BcryptService from 'src/bcrypt/bcrypt.service';
import Credentials from '../credentials/entities/credentials.entity';
import CredentialsService from 'src/credentials/credentials.service';

@Injectable()
export default class AuthService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly credentialsService: CredentialsService,
    private readonly kafkaService: KafkaService,
  ) {
    this.kafkaService.subscribe('email.failed', (message) => {
      if (['user_deleted', 'user_created'].includes(message.type)) {
        Logger.error(`Error sending email to ${message.payload}`);
      }
    });
  }

  getAccessToken(sub: string): string {
    return this.jwtService.sign(
      {
        sub,
        exp:
          Math.floor(Date.now() / 1000) +
          Number(this.configService.get('ACCESS_TTL')),
      },
      { secret: this.configService.get('JWT_SECRET_ACCESS') },
    );
  }

  getRefreshToken(sub: string): string {
    return this.jwtService.sign(
      {
        sub,
        exp:
          Math.floor(Date.now() / 1000) +
          Number(this.configService.get('REFRESH_TTL')),
      },
      { secret: this.configService.get('JWT_SECRET_REFRESH') },
    );
  }

  async verifyAccessToken(token: string): Promise<{ sub: string }> {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET_ACCESS'),
    });
  }

  async verifyRefreshToken(token: string): Promise<{ sub: string }> {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET_REFRESH'),
    });
  }

  async getTokens(accountId: string): Promise<Tokens> {
    const accessToken = this.getAccessToken(accountId);
    const refreshToken = this.getRefreshToken(accountId);

    return { accessToken, refreshToken };
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<Credentials> {
    const credentials = await this.credentialsService.getOne({ email });

    if (!credentials) throw new BadRequestException();

    const isValidPassword = await this.bcryptService.compare(
      password,
      credentials.password,
    );
    if (!isValidPassword) throw new BadRequestException();

    return credentials;
  }

  async signUp(dto: SignUpDto): Promise<Tokens> {
    const passwordHash = await this.bcryptService.hash(dto.password);

    const { id } = await this.createUser({ ...dto, password: passwordHash });

    this.kafkaService.send('email.send', {
      type: 'user_created',
      payload: dto.email,
    });

    const tokens = await this.getTokens(id);

    await this.authRepository.saveToken(id, tokens.refreshToken);

    return tokens;
  }

  async createUser({ password, ...dto }: SignUpDto) {
    try {
      const response = await this.httpService
        .post(
          `http://${this.configService.get(
            'BOOKSHOP_USER_SERVICE_HOST',
          )}:${this.configService.get('BOOKSHOP_USER_SERVICE_PORT')}/user`,
          { ...dto },
        )
        .toPromise();

      await this.credentialsService.create(
        new Credentials({ ...dto, password, userId: response.data.id }),
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async signIn(credentials: Credentials): Promise<Tokens> {
    const tokens = await this.getTokens(credentials.userId);

    this.kafkaService.send('email.send', {
      type: 'user_created',
      payload: credentials.email,
    });

    await this.authRepository.saveToken(
      credentials.userId,
      tokens.refreshToken,
    );

    return tokens;
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    const { sub: userId } = await this.verifyRefreshToken(refreshToken);

    if (!userId) throw new UnauthorizedException();

    const oldRefreshToken = await this.authRepository.getToken(userId);

    if (!oldRefreshToken) throw new UnauthorizedException();

    const newTokens = await this.getTokens(userId);

    await this.authRepository.saveToken(userId, newTokens.refreshToken);

    return newTokens;
  }

  async logOut(userId: string) {
    await this.authRepository.removeToken(userId);
  }

  async getTokenByKey(key: string): Promise<string | null> {
    return this.authRepository.getToken(key);
  }

  async validateAccessToken(token: string): Promise<boolean> {
    try {
      await this.verifyAccessToken(token);

      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteCredentials(email: string): Promise<Credentials> {
    return this.credentialsService.deleteOne({ email });
  }
}
