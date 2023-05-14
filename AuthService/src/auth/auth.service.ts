import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import SignUpDto from './dto/sign-up.dto';
import AuthRepository from './auth.repository';
import UserService from 'src/user/user.service';
import Tokens from './interfaces/tokens.interface';
import BcryptService from 'src/bcrypt/bcrypt.service';
import User from 'src/user/entities/user.entity';

@Injectable()
export default class AuthService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly userService: UserService,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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
      secret: this.configService.get('JWT_SECRET'),
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

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getOne({ email });

    if (!user) throw new BadRequestException();

    const isValidPassword = await this.bcryptService.compare(
      password,
      user.password,
    );
    if (!isValidPassword) throw new BadRequestException();

    return user;
  }

  async signUp(dto: SignUpDto): Promise<Tokens> {
    const passwordHash = await this.bcryptService.hash(dto.password);

    const { id } = await this.userService.create({
      ...dto,
      password: passwordHash,
    });

    const tokens = await this.getTokens(id);

    await this.authRepository.saveToken(id, tokens.refreshToken);

    return tokens;
  }

  async signIn(user: User): Promise<Tokens> {
    const tokens = await this.getTokens(user.id);

    await this.authRepository.saveToken(user.id, tokens.refreshToken);

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
}
