import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, Length} from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email:string

    @ApiProperty()
    @IsString()
    @Length(5,20)
    @IsNotEmpty()
    password: string

}

export class RegisterDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email:string

    @ApiProperty()
    @IsString()
    @Length(5,20)
    @IsNotEmpty()
    password: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

}