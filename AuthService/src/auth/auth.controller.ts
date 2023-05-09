import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import AuthService from './auth.service';
import SignInDto from './dto/sign-in.dto';
import SignUpDto from './dto/sign-up.dto';
import Tokens from './interfaces/tokens.interface';
import LocalAuthGuard from 'src/guards/local-auth.guard';
import JwtAccessGuard from 'src/guards/jwt-access.guard';
import AuthUser from 'src/decorators/auth-user.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('/api/auth-service/auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Body() dto: SignInDto, @AuthUser() user: any): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @UseGuards(JwtAccessGuard)
  @Get('logout')
  async logOut(@AuthUser() user: any): Promise<void> {
    await this.authService.logOut(user.sub);
  }

  @Get('refresh')
  async refresh(
    @Headers() headers: { authorization: string },
  ): Promise<Tokens> {
    return this.authService.refreshTokens(headers.authorization.split(' ')[1]);
  }

  @Get('ping')
  ping(): string {
    return 'Hey boy';
  }
}
