import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisConfigService } from './cache/cache.config';
import { CacheModule } from './cache/cache.module';
import { PrismaModule } from './prisma/prisma.module';
import { SchoolModule } from './school/school.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SchoolModule,
    UserModule,
    PrismaModule, 
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useClass: RedisConfigService,
      inject: [ConfigService],
    }),
    CacheModule,
  ],
})
export class AppModule {}
