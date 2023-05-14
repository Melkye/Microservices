import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import AuthService from 'src/auth/auth.service';
import User from 'src/user/entities/user.entity';
import UserService from 'src/user/user.service';

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET_ACCESS'),
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.getOne({ id: payload.sub });

    if (!user) throw new UnauthorizedException();

    const isAuthorized = await this.authService.getTokenByKey(payload.sub);

    if (!isAuthorized) throw new UnauthorizedException();

    return user;
  }
}
