/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class BcryptService {
  constructor(private readonly configService: ConfigService) {}
  hash(password: string): Promise<string> {
    return bcrypt.hash(
      password,
      Number(this.configService.get('BCRYPT_SALT_ROUNDS')) || 10,
    );
  }

  compare(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
