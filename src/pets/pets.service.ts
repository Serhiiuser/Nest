import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {PetDto} from "./pet.dto/pet.dto";
import {PrismaService} from "../core/odm/prisma.service";
import {UsersService} from "../users/users.service";
import {Pets} from "@prisma/client";

@Injectable()
export class PetsService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly prismaService: PrismaService,
        private readonly userService: UsersService,
        ) {}

    async createAnimal(data:PetDto,userId: string):Promise<Pets>{
        const user = await this.userService.getUserById(userId);
        if (!user){
            throw new HttpException("No user", HttpStatus.NOT_FOUND);
        }

        return this.prismaService.pets.create({
            data: {
                name:data.name,
                type:data.type,
                status:data.status,
                ownerId:user.id,
                image:data.image,
                logo:data.logo,

            }
        })
    }
    async updateAnimal(data: any): Promise<Pets> {
        return this.prismaService.pets.create({
            data: {
                name: data.name,
                type: data.type,
                ownerId: data.ownerId,
                status: data.status,
                // image: data.image,
                // logo: data.logo,
            },
        });
    }

}
