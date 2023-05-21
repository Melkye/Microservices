import { Injectable } from '@nestjs/common';

import Credentials from './entities/credentials.entity';
import CredentialsRepository from './credentials.repository';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';
import { CreateCredentialsDto } from './dto/create-credentials.dto';

@Injectable()
export default class CredentialsService {
  constructor(private readonly credentialsRepository: CredentialsRepository) {}

  async create(dto: CreateCredentialsDto): Promise<Credentials> {
    const credentials = new Credentials(dto);

    return this.credentialsRepository.save(credentials);
  }

  async updateOne(
    criteria: Partial<Credentials>,
    dto: UpdateCredentialsDto,
  ): Promise<Credentials> {
    return this.credentialsRepository.update(criteria, dto);
  }

  async deleteOne(criteria: Partial<Credentials>): Promise<Credentials> {
    return this.credentialsRepository.delete(criteria);
  }

  async getOne(criteria: Partial<Credentials>): Promise<Credentials> {
    return this.credentialsRepository.findOne(criteria);
  }

  async getAll(): Promise<Credentials[]> {
    return this.credentialsRepository.find({});
  }
}
