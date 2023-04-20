import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res} from '@nestjs/common';
import {CreateUsersDto} from "../dto/users.dto";
import {UsersService} from "./users.service";
import {ApiParam, ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {

    }

    @Get()
    async getUsersList(@Req() req: any, @Res() res: any) {
        return res.status(HttpStatus.OK).json(await this.userService.getUserList());

    }
    @ApiParam({name: 'userId', required: true})
    @Get('/:userId')
    async getById(
        @Req() req: any,
        @Res() res: any,
        @Param('userId') userId: string,) {
        return res.status(HttpStatus.OK).json(await this.userService.getUserById(userId));

    }

    @Post()
    async createUser(
        @Req() req: any,
        @Body() body: CreateUsersDto,
        @Res() res: any
    ) {
        return res.status(HttpStatus.CREATED).json(await this.userService.createUser(body));
    }

    @ApiParam({name: 'userId', required: true})
    @Patch('/:userId')
    async updateUser(
        @Req() req: any,
        @Res() res: any,
        @Param('userId') userId: string,) {

    }

    @Delete('/:userId')
    async deleteUser(
        @Req() req: any,
        @Res() res: any,
        @Param('userId') userId: string,
    ) {
        return res
            .status(HttpStatus.OK)
            .json(await this.userService.deleteUser(userId));
    }

}
