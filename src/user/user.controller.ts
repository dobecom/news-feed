import { Controller, Get, Patch, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
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
  @ApiOperation({ summary: 'Get Subscribed School List' })
  getSubscribedSchools(@Param('id') id: string) {
    return this.userService.getSubscribedSchools(+id);
  }

  @Get(':id/school/news')
  @ApiOperation({ summary: 'Get Subscribed School\'s News List ' })
  getSubscribedSchoolsNews(@Param('id') id: string) {
    return this.userService.getSubscribedSchoolsNews(+id);
  }

  // 뉴스피드 페이징 처리 - 페이징 처리 시, 기존 구독해제 학교의 소식 조회와 중복되는 문제 발생
  // @Get(':id/school/news/:page/:count')
  // getSubscribedSchoolsNews(
  //   @Param('id') id: string,
  //   @Query('page') page: string,
  //   @Query('count') count: string,
  // ) {
  //   return this.userService.getSubscribedSchoolsNews(+id, +page, +count);
  // }
}
