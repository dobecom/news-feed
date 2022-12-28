import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: '김현립', description: '이름' })
    @IsString()
    name: string;
    
    @ApiProperty({ example: 'admin', description: 'admin : 관리자, student : 학생' })
    @IsString()
    type: string;
}
