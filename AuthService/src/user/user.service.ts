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

  async updateOne(criteria: Partial<User>, dto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(criteria, dto);
  }

  async deleteOne(criteria: Partial<User>): Promise<User> {
    return this.userRepository.delete(criteria);
  }

  async getOne(criteria: Partial<User>): Promise<User> {
    return this.userRepository.findOne(criteria);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find({});
  }
}
