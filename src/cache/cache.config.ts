import { Injectable } from '@nestjs/common';
import {
  RedisOptionsFactory,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigService implements RedisOptionsFactory {
  constructor(private config: ConfigService) {}

  async createRedisOptions(): Promise<RedisModuleOptions> {
    return {
      config: {
        host: this.config.get<string>('REDIS_HOSTNAME'),
        port: this.config.get<number>('REDIS_PORT'),
        // password: this.configService.get<string>('REDIS_PASSWORD'),
      },
    };
  }
}