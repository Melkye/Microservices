import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';

import KafkaService from './user.kafka';
import User from './entities/user.entity';
import UserRepository from './user.repository';
import UpdateUserDto from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly kafkaService: KafkaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.kafkaService.subscribe('email.failed', (message) => {
      if (['user_deleted', 'user_created'].includes(message.type)) {
        Logger.error(`Error sending email to ${message.payload}`);
      }
    });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = new User(dto);

    return this.userRepository.save(user);
  }

  async updateOne(criteria: Partial<User>, dto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(criteria, dto);
  }

  async deleteOne(criteria: Partial<User>): Promise<User> {
    try {
      const { email } = await this.getOne(criteria);

      this.kafkaService.send('email.send', {
        type: 'user_deleted',
        payload: email,
      });

      await this.httpService
        .delete(
          `http://${this.configService.get(
            'AUTH_SERVICE_SERVICE_HOST',
          )}:${this.configService.get(
            'AUTH_SERVICE_SERVICE_PORT',
          )}/auth/${email}`,
        )
        .toPromise();

      return this.userRepository.delete(criteria);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async getOne(criteria: Partial<User>): Promise<User> {
    return this.userRepository.findOne(criteria);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find({});
  }
}
