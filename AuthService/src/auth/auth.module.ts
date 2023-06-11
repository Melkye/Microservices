import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import KafkaService from './auth.kafka';
import AuthService from './auth.service';
import AuthRepository from './auth.repository';
import AuthController from './auth.controller';
import BcryptModule from 'src/bcrypt/bcrypt.module';
import { jwt_constants } from './constants/jwt.contants';
import LocalStrategy from 'src/strategies/local.strategy';
import JwtAccessStrategy from 'src/strategies/jwt-access.strategy';
import CredentialsModule from 'src/credentials/credentials.module';

@Module({
  imports: [
    HttpModule,
    BcryptModule,
    CredentialsModule,
    JwtModule.register({ secret: jwt_constants.access_secret }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    LocalStrategy,
    JwtAccessStrategy,
    KafkaService,
  ],
})
export default class AuthModule {}
