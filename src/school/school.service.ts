import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from './const/user-type.const';
import { CreateNewsDto } from './dto/create-news.dto';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  async createSchool(userId: number, dto: CreateSchoolDto) {
    try {
      const user = await this.prisma.user.findFirst({
        select: {
          type: true,
        },
        where: {
          id: userId,
        },
      });

      if (!user) throw new ForbiddenException('The user is not exist');

      let result = null;
      if (user.type === UserType.ADMIN) {
        let school = await this.prisma.school.create({
          data: {
            ...dto,
          },
        });
        result = {
          data: {
            name: school.name,
            location: school.location,
          },
          message: 'The school was created successfully',
        };
        return result;
      } else {
        result = {
          message: "The user don't have right to create a school"
        }
        return result;
      }
    } catch (err) {
      console.log(`Create School Err : ${err.code}, ${err}`);
      throw err;
    }
  }
  createNews(userId:number, dto:CreateNewsDto){

    return null;
  }

  findAll() {
    return `This action returns all school`;
  }

  findOne(id: number) {
    return `This action returns a #${id} school`;
  }

  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    return `This action updates a #${id} school`;
  }

  remove(id: number) {
    return `This action removes a #${id} school`;
  }
}
