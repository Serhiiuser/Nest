import {
    Body,
    Controller,
    Delete, forwardRef,
    Get,
    HttpStatus, Inject,
    Param,
    Patch,
    Post,
    Req,
    Res,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {CreateUserDto} from "./dto/users.dto";
import {UsersService} from "./users.service";
import {ApiParam, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "../core/file-upload/file.upload";
import {PetsService} from "../pets/pets.service";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,
        private readonly petsService: PetsService,
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
    @UseInterceptors(
        FileInterceptor(
            'file', {
                storage: diskStorage({
                        destination: './public',
                        filename: editFileName,
                    }),
              fileFilter:  imageFileFilter
            }
        )
    )
    async createUser(
        @Req() req: any,
        @Body() body: CreateUserDto,
        @Res() res: any,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (file){
            body.avatar = `public/${file.filename}`

        }
        return res
            .status(HttpStatus.CREATED)
            .json(await this.userService
                .createUser(body));
    }

    @ApiParam({name: 'userId', required: true})
    @Patch('/:userId')
    async updateUser(
        @Req() req: any,
        @Res() res: any,
        @Param('userId') userId: string,) {

    }

    @Post('animals/userId')
    async addPet() {}

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
