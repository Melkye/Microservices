import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';

import AuthService from './auth.service';
import SignUpDto from './dto/sign-up.dto';
import Tokens from './interfaces/tokens.interface';
import LocalAuthGuard from 'src/guards/local-auth.guard';
import JwtAccessGuard from 'src/guards/jwt-access.guard';
import AuthUser from 'src/decorators/auth-user.decorator';
import User from 'src/user/entities/user.entity';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@AuthUser() user: User): Promise<Tokens> {
    return this.authService.signIn(user);
  }

  @UseGuards(JwtAccessGuard)
  @Get('logout')
  async logOut(@AuthUser() user: User): Promise<void> {
    await this.authService.logOut(user.id);
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
