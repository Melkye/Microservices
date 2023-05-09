import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import SignUpDto from './dto/sign-up.dto';
import SignInDto from './dto/sign-in.dto';
import AuthRepository from './auth.repository';
import UserService from 'src/user/user.service';
import Tokens from './interfaces/tokens.interface';
import BcryptService from 'src/bcrypt/bcrypt.service';

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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getByEmail(email);

    const isValidPassword = await this.bcryptService.compare(
      password,
      user.password,
    );
    if (!isValidPassword) throw new Error();

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

  async signIn(dto: SignInDto): Promise<Tokens> {
    const user = await this.userService.getByEmail(dto.email);

    const isValidPassword = await this.bcryptService.compare(
      dto.password,
      user.password,
    );
    if (!isValidPassword) throw new Error();

    const tokens = await this.getTokens(user.id);

    await this.authRepository.saveToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
