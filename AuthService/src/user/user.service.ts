import { Injectable } from '@nestjs/common';

import User from './entities/user.entity';
import UserRepository from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = new User(dto);

    return this.userRepository.save(user);
  }

  async updateByEmail(email: string, dto: UpdateUserDto): Promise<User> {
    return this.userRepository.update({ email }, dto);
  }

  async deleteByEmail(email: string): Promise<User> {
    return this.userRepository.delete({ email });
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }
}
