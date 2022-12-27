import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CacheService } from 'src/cache/cache.service';

@Module({
  controllers: [UserController],
  providers: [UserService, CacheService]
})
export class UserModule {} 
