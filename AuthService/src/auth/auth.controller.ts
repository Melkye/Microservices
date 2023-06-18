import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  UseGuards,
  Param,
} from '@nestjs/common';

import AuthService from './auth.service';
import SignUpDto from './dto/sign-up.dto';
import Tokens from './interfaces/tokens.interface';
import LocalAuthGuard from 'src/guards/local-auth.guard';
import JwtAccessGuard from 'src/guards/jwt-access.guard';
import AuthUser from 'src/decorators/auth-user.decorator';
import Credentials from '../credentials/entities/credentials.entity';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import SignInDto from './dto/sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @ApiBody({ type: SignInDto })
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@AuthUser() credentials: Credentials): Promise<Tokens> {
    return this.authService.signIn(credentials);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Get('logout')
  async logOut(@AuthUser() credentials: Credentials): Promise<void> {
    await this.authService.logOut(credentials.userId);
  }

  @ApiBearerAuth()
  @Get('refresh')
  async refresh(
    @Headers() headers: { authorization: string },
  ): Promise<Tokens> {
    return this.authService.refreshTokens(headers.authorization.split(' ')[1]);
  }

  @Post('validate')
  async validate(@Body() body: { token: string }): Promise<boolean> {
    return this.authService.validateAccessToken(body.token);
  }

  @Delete(':email')
  async delete(@Param('email') email: string): Promise<Credentials> {
    return this.authService.deleteCredentials(email);
  }

  @Get('healthz')
  ping(): string {
    return 'Health OK';
  }
}
