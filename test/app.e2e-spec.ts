import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateSchoolDto } from 'src/school/dto/create-school.dto';
import { CreateNewsDto } from 'src/school/dto/create-news.dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  describe('School', () => {
    describe('Create a school and news', () => {
      const userDto: CreateUserDto = {
        name: '관리자',
        type: 'admin',
      };
      it('should create a admin user', () => {
        return pactum
          .spec()
          .post('/api/user')
          .withBody(userDto)
          .expectStatus(201);
      });
      const schoolDto: CreateSchoolDto = {
        name: '용문고',
        location: '서울시 성북구 안암동',
      };
      it('should create a school', () => {
        return pactum
          .spec()
          .post('/api/school/1')
          .withBody(schoolDto)
          .expectStatus(201);
      });

      // it('should subscribe a school', () => {
      //   return pactum
      //   .spec()
      //   .patch('/api/user/1?schoolId=1&updateType=add')
      //   .expectStatus(201)
      // })

      // it('should unsubscribe a school', () => {
      //   return pactum
      //   .spec()
      //   .patch('/api/user/1?schoolId=1&updateType=delete')
      //   .expectStatus(201)
      // })
      // const newsDto: CreateNewsDto={
      //   title: '12월 공지사항',
      //   content: '30일에 방학식 합니다.'
      // }
      // it('should create a news', () => {
      //   return pactum
      //   .spec()
      //   .post('http://localhost:3333/api/school/news?userId=1&schoolId=1')
      //   .withBody(newsDto)
      //   .expectStatus(201)
      // })
    });
  });

  // afterAll(() => {
  //   app.close();
  // });
});
