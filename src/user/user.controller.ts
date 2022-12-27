import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id/:schoolId/:updateType')
  @ApiOperation({ summary: 'Subscribe / Unsubscribe School' })
  updateSubscribe(
    @Param('id') id: string,
    @Query('schoolId') schoolId: string,
    @Query('updateType') updateType: string,
  ) {
    return this.userService.updateSubscribe(+id, +schoolId, updateType);
  }

  @Get(':id/school')
  getSubscribedSchools(@Param('id') id: string) {
    return this.userService.getSubscribedSchools(+id);
  }

  @Get(':id/school/news')
  getSubscribedSchoolsNews(@Param('id') id: string) {
    return this.userService.getSubscribedSchoolsNews(+id);
  }
}
