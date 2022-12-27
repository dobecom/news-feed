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

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
