import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { config } from './config/config';
import UserModule from './credentials/credentials.module';
import AuthModule from './auth/auth.module';
import BcryptModule from './bcrypt/bcrypt.module';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        config: {
          host: 'redis-auth',
          port: config.get('REDIS_PORT'),
        },
      }),
    }),

    AuthModule,
    UserModule,
    BcryptModule,
  ],
})
export default class AppModule {}
