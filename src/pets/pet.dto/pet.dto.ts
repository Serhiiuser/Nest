import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PetDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({required: false,})
    @IsNumber()
    @IsOptional()
    type: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty()
    @IsString()
    logo: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    status: boolean

}