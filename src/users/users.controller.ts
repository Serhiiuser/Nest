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
    UploadedFile, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreateUserDto} from "./dto/users.dto";
import {UsersService} from "./users.service";
import {ApiParam, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "../core/file-upload/file.upload";
import {PetsService} from "../pets/pets.service";
import {AuthGuard} from "@nestjs/passport";
import {PetDto} from "../pets/pet.dto/pet.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        @Inject(forwardRef(() => PetsService))
        private readonly userService: UsersService,
        private readonly petsService: PetsService,
    ) {

    }

    @UseGuards(AuthGuard())
    @Get()
    async getUsersList(@Req() req: any, @Res() res: any) {
        console.log(req.user)
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
                fileFilter: imageFileFilter
            }
        )
    )
    async createUser(
        @Req() req: any,
        @Body() body: CreateUserDto,
        @Res() res: any,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (file) {
            body.avatar = `public/${file.filename}`

        }
        return res
            .status(HttpStatus.CREATED)
            .json(await this.userService
                .createUserByManager(body));
    }

    @ApiParam({name: 'userId', required: true})
    @Patch('/:userId')
    async updateUser(
        @Req() req: any,
        @Res() res: any,
        @Param('userId') userId: string,) {

    }

    @Post('animals/userId')
    async addNewPet
    (@Req() req: any,
     @Res() res: any,
     @Body() body: PetDto,
     @Param('userId') userId: string,
     ){
        const user = await this.userService.getUserById(userId);
        if (!user) {
            return res
                .status(HttpStatus.NOT_FOUND)
                .json({ message: `User with id: ${userId} not fount` });
        }
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
