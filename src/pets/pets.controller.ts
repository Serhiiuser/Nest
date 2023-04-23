import {Body, Controller, HttpStatus, Patch, Req, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileFieldsInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "../core/file-upload/file.upload";
import {CreateUserDto} from "../users/dto/users.dto";
import {PetDto} from "./pet.dto/pet.dto";
import {PetsService} from "./pets.service";

@Controller('pets')
export class PetsController {
    constructor(
        private readonly petsService: PetsService) {
    }
    @Patch()
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                {name:'image',maxCount:1},
                {name:'logo',maxCount:1},
            ],
            {storage: diskStorage({
                    destination: './public/animals',
                    filename: editFileName,
                }),
                fileFilter:  imageFileFilter
                }
        )
    )
    async updatePet(
        @Req() req: any,
        @Body() body: PetDto,
        @Res() res: any,
        @UploadedFile() files:{image?: Express.Multer.File[];logo?: Express.Multer.File[]}
    ) {
        if (files?.image){
            body.image = `/public/animals/${files.image[0].filename}`

        }
        if (files?.logo) {
            body.logo = `/public/animals/${files.logo[0].filename}`
        }
        return res.status(HttpStatus.OK).json(await this.petsService.updateAnimal(body))
    }
}
