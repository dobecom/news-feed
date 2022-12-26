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
          // data: {
          //   update,
          // },
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
