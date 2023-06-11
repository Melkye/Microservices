import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import KafkaService from './user.kafka';
import UserService from './user.service';
import UserController from './user.controller';
import UserRepository from './user.repository';

@Module({
  imports: [HttpModule],
  providers: [UserService, UserRepository, KafkaService],
  controllers: [UserController],
})
export default class UserModule {}
