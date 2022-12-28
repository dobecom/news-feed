import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserType } from './const/user-type.const';
import { CreateNewsDto } from './dto/create-news.dto';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  async checkIsAdminUser(userId: number) {
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
      let result = false;
      if (user.type === UserType.ADMIN) {
        result = true;
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async createSchool(userId: number, dto: CreateSchoolDto) {
    let result;
    try {
      let isAdminUser = await this.checkIsAdminUser(userId);
      if (isAdminUser) {
        let school = await this.prisma.school.create({
          data: {
            ...dto,
          },
        });
        result = {
          data: {
            ...school,
          },
          message: 'The school was created successfully',
        };
        return result;
      } else {
        // throw new BadRequestException("The user don't have right to create a school");
        result = {
          message: "The user don't have right to create a school",
        };
        return result;
      }
    } catch (err) {
      console.log(`Create School Err : ${err.code}, ${err}`);
      throw err;
    }
  }

  async createNews(userId: number, schoolId: number, dto: CreateNewsDto) {
    try {
      let result;
      let isAdminUser = await this.checkIsAdminUser(userId);
      if (isAdminUser) {
        const news = await this.prisma.news.create({
          select: {
            title: true,
          },
          data: {
            ...dto,
            schoolId: schoolId,
          },
        });
        result = {
          data: news.title,
          message: 'The news was created successfully',
        };
        return result;
      } else {
        // throw new BadRequestException("The user don't have right to create a school");
        result = {
          message: "The user don't have right to create a school",
        };
        return result;
      }
    } catch (err) {
      console.log(`Create News Err : ${err.code}, ${err}`);
      throw err;
    }
  }

  async updateNews(id: number, dto: UpdateNewsDto) {
    try {
      const news = await this.prisma.news.update({
        select: {
          title: true,
        },
        data: {
          ...dto,
        },
        where: {
          id,
        },
      });
      let result = {
        data: news.title,
        message: 'The news was updated successfully',
      };
      return result;
    } catch (err) {
      if (err.code === 'P2025') {
        console.log(`Update News Err (record not exist)`);
      } else {
        console.log(`Update News Err : ${err.code}, ${err}`);
      }
      throw err;
    }
  }

  async removeNews(id: number) {
    try {
      const news = await this.prisma.news.delete({
        select: {
          title: true,
        },
        where: {
          id,
        },
      });
      let result = {
        data: news.title,
        message: 'The news was deleted successfully',
      };
      return result;
    } catch (err) {
      if (err.code === 'P2025') {
        console.log(`Delete News Err (record not exist)`);
      } else {
        console.log(`Delete News Err : ${err.code}, ${err}`);
      }
      throw err;
    }
  }
}
