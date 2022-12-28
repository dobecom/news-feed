import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    // 외래키로 묶인 테이블인 경우 삭제하는 순서 고려하여 트랜잭션으로 묶어서 삭제 처리
    return this.$transaction([
      this.news.deleteMany(),
      this.school.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
