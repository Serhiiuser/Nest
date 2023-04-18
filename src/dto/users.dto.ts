import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUsersDto {
    @ApiProperty({minLength: 2, maxLength: 40})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({required: false,maxLength: 100})
    @IsNumber()
    @IsOptional()
    age: number;

    @ApiProperty({required: true,example: 'user@mail.com'})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    status: boolean;
}