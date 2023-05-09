import { Module } from '@nestjs/common';

import UserService from './user.service';
import UserController from './user.controller';
import UserRepository from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export default class UserModule {}
