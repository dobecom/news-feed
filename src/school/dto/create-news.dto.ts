import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ example: '12월 행사 안내', description: '학교 소식 제목' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: '방학식 합니다', description: '학교 소식 내용' })
  @IsString()
  readonly content: string;
}
