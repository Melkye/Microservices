import { Module } from '@nestjs/common';

import AuthService from './auth.service';
import UserModule from 'src/user/user.module';
import AuthRepository from './auth.repository';
import AuthController from './auth.controller';
import BcryptModule from 'src/bcrypt/bcrypt.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import {
  RedisManager,
  RedisModule,
  RedisService,
} from '@liaoliaots/nestjs-redis';
import JwtAccessStrategy from 'src/strategies/jwt-access.strategy';
import LocalStrategy from 'src/strategies/local.strategy';
import { Redis } from 'ioredis';
import { jwt_constants } from './constants/jwt.contants';

@Module({
  imports: [
    BcryptModule,
    UserModule,
    JwtModule.register({ secret: jwt_constants.access_secret }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, LocalStrategy, JwtAccessStrategy],
})
export default class AuthModule {}
