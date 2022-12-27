import { ForbiddenException, Injectable } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateType } from './const/update-type.const';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private redis: CacheService) {}

  async updateSubscribe(id: number, schoolId: number, updateType: string) {
    let result;
    try {
      // 학교 id 존재 하는지 확인
      const school = await this.prisma.school.findFirst({
        where: {
          id: schoolId,
        },
      });
      if (!school) throw new ForbiddenException('The school is not exist');

      // 이미 구독중인 학교인지 확인
      const res = await this.prisma.user.findFirst({
        select: {
          subsSchoolIds: true,
        },
        where: {
          id,
        },
      });

      let isSubscribed = res.subsSchoolIds.includes(schoolId);

      if (updateType === UpdateType.ADD) {
        // 학교 구독하기
        if (isSubscribed) {
          //이미 구독 중인 경우
          // throw new BadRequestException("Already subscribed");
          result = {
            message: 'Already subscribed',
          };
          return result;
        } else {
          const update = await this.prisma.user.update({
            data: {
              subsSchoolIds: {
                push: schoolId, // prisma ORM list add 방법
              },
            },
            where: {
              id,
            },
          });
          result = {
            data: school.name,
            message: 'Subscription was completed successfully',
          };
          return result;
        }
      } else if (updateType === UpdateType.DELETE) {
        //학교 구독 해제하기
        if (isSubscribed) {
          let subscribedList = res.subsSchoolIds;
          let filteredList = subscribedList.filter((e) => e !== schoolId);
          const update = await this.prisma.user.update({
            data: {
              subsSchoolIds: filteredList,
            },
            where: {
              id,
            },
          });
          result = {
            data: school.name,
            message: 'Unsubscription was completed successfully',
          };
          return result;
        } else {
          result = {
            message: 'The school is already not subscribed',
          };
          return result;
        }
      } else {
        // 구독 또는 구독해제 파라미터가 잘못된 경우
        result = {
          message: 'updateType should be add or delete',
        };
        return result;
      }
    } catch (err) {
      if (err.code === 'P2025') {
        console.log(`User Subscribe School Err (record not exist)`);
      } else {
        console.log(`User Subscribe School Err : ${err.code}, ${err}`);
      }
      throw err;
    }
  }

  async getSchools(userId: number) {
    try {
      const user = await this.prisma.user.findFirst({
        select: {
          subsSchoolIds: true,
        },
        where: {
          id: userId,
        },
      });
      if (!user) throw new ForbiddenException('The user is not exist');

      const schools = await this.prisma.school.findMany({
        select: {
          id: true,
          name: true,
          location: true,
          news: true,
        },
        where: {
          id: {
            in: user.subsSchoolIds.map((schoolId) => schoolId),
          },
        },
      });
      return schools;
    } catch (err) {
      console.log(`Get Schools Err : ${err.code}, ${err}`);
      throw err;
    }
  }

  async getSubscribedSchools(id: number) {
    let result;

    try {
      const schools = await this.getSchools(id);
      if (schools.length > 0) {
        result = {
          data: schools,
          message: 'Get all subscribed schools was completed successfully',
        };
      } else {
        result = {
          message: 'No subscribed schools',
        };
      }

      return result;
    } catch (err) {
      console.log(`Get Subscribed Schools Err : ${err.code}, ${err}`);
      throw err;
    }
  }

  async getSubscribedSchoolsNews(id: number) {
    let result;
    try {
      const schools = await this.getSchools(id);
      const news = await this.prisma.news.findMany({
        select: {
          id: true,
          createdAt: true,
          title: true,
          content: true,
          schoolId: true,
        },
        where: {
          schoolId: {
            in: schools.map((e) => e.id),
          },
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      });
      if (news.length > 0) {
        result = {
          data: news,
          message: 'Get all subscribed schools news was completed successfully',
        };
        return result;
      } else {
        result = {
          message: 'No news here',
        };
        return result;
      }
    } catch (err) {
      console.log(`Get Subscribe Schools News Err : ${err.code}, ${err}`);
      throw err;
    }
  }
}
