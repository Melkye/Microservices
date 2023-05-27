import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await this.httpService
        .post(
          `http://${this.configService.get(
            'BOOKSHOP_AUTH_SERVICE_HOST',
          )}:${this.configService.get(
            'BOOKSHOP_AUTH_SERVICE_PORT',
          )}/auth/validate`,
          { token },
        )
        .toPromise();

      return response.data;
    } catch (error) {
      console.error(error);
      throw new ServiceUnavailableException();
    }
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers } = context.switchToHttp().getRequest();

    return this.validateToken(headers.authorization.split(' ')[1]);
  }
}
