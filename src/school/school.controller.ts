import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { CreateNewsDto } from './dto/create-news.dto';

@Controller('api/school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post(':userId')
  createSchool(@Param('userId') userId: string, @Body() dto: CreateSchoolDto) {
    let result = this.schoolService.createSchool(+userId, dto);
    return result;
  }

  @Post('news/:userId')
  createNews(@Param('userId') userId: string, @Body() dto: CreateNewsDto) {
    let result = this.schoolService.createNews(+userId, dto);
    return result;
  }

  @Get()
  findAll() {
    return this.schoolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.update(+id, updateSchoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolService.remove(+id);
  }
}
