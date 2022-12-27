import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CacheService {
  // redis default expiration time = 1시간
  private readonly DEFAULT_EXPIRATION = this.config.get<number>('REDIS_EXPIRATION_SEC');
  private readonly redis: Redis;
  constructor(
    private readonly redisService: RedisService,
    private config: ConfigService
  ) {
    this.redis = redisService.getClient();
  }

  get(key: string) {
    return this.redis.get(key);
  }

  set(key: string, value: string, expire?: number) {
    return this.redis.set(key, value, "EX", expire ?? this.DEFAULT_EXPIRATION);
  }

  // async del(key: string): Promise<number> {
  //   return this.redis.del(key);
  // }
}
