import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateSubscribe(id: number, schoolId: number) {
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

      if (res.subsSchoolIds.includes(schoolId)) {
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
    } catch (err) {
      if (err.code === 'P2025') {
        console.log(`User Subscribe School Err (record not exist)`);
      } else {
        console.log(`User Subscribe School Err : ${err.code}, ${err}`);
      }
      throw err;
    }
  }

  async getSubscribedSchools(id: number) {
    let result;

    try {
      const user = await this.prisma.user.findFirst({
        select: {
          subsSchoolIds: true,
        },
        where: {
          id,
        },
      });
      if (!user) throw new ForbiddenException('The user is not exist');

      const schools = await this.prisma.school.findMany({
        select: {
          id: true,
          name: true,
          location: true,
        },
        where: {
          id: {
            in: user.subsSchoolIds.map((schoolId) => schoolId),
          },
        },
      });
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
      console.log(`User Subscribe School Err : ${err.code}, ${err}`);
      throw err;
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
