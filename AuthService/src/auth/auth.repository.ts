import { Redis } from 'ioredis';
import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export default class AuthRepository {
  private readonly redisClient: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = redisService.getClient();
  }

  async saveToken(key: string, token: string): Promise<void> {
    await this.redisClient.set(key, token);
  }

  getToken(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  removeToken(key: string): Promise<number> {
    return this.redisClient.del(key);
  }

  removeAllTokens(): Promise<string> {
    return this.redisClient.flushall();
  }
}
