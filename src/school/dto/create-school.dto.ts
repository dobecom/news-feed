import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSchoolDto {
  @ApiProperty({ example: '용문고', description: '학교명' })
  @IsString()
  name: string;

  @ApiProperty({ example: '서울시 성북구 안암동', description: '지역명' })
  @IsString()
  location: string;
}
