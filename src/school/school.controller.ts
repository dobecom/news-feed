import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { CreateNewsDto } from './dto/create-news.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateNewsDto } from './dto/update-news.dto';

@ApiTags('School')
@Controller('api/school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Create School' })
  createSchool(@Param('userId') userId: string, @Body() dto: CreateSchoolDto) {
    let result = this.schoolService.createSchool(+userId, dto);
    return result;
  }

  @Post('news/:userId/:schoolId')
  @ApiOperation({ summary: 'Create News' })
  createNews(
    @Query('userId') userId: string,
    @Query('schoolId') schoolId: string,
    @Body() dto: CreateNewsDto,
  ) {
    let result = this.schoolService.createNews(+userId, +schoolId, dto);
    return result;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update News' })
  updateNews(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    return this.schoolService.updateNews(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete News' })
  removeNews(@Param('id') id: string) {
    return this.schoolService.removeNews(+id);
  }
}
