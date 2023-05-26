import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import AuthService from 'src/auth/auth.service';
import CredentialsService from 'src/credentials/credentials.service';
import Credentials from 'src/credentials/entities/credentials.entity';

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
    private readonly credentialsService: CredentialsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET_ACCESS'),
    });
  }

  async validate(payload: any): Promise<Credentials> {
    const credentials = await this.credentialsService.getOne({
      userId: payload.sub,
    });

    if (!credentials) throw new UnauthorizedException();

    const isAuthorized = await this.authService.getTokenByKey(payload.sub);

    if (!isAuthorized) throw new UnauthorizedException();

    return credentials;
  }
}
