import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SchoolModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
