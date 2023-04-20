import {Injectable} from '@nestjs/common';
import {User} from "@prisma/client";

import {CreateUsersDto} from "../dto/users.dto";
import {PrismaService} from "../core/odm/prisma.service";


@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async createUser(userData: CreateUsersDto):Promise<User> {
        return this.prismaService.user.create({
            data: {
                name: userData.name,
                city: userData.city,
                age: userData.age,
                status: userData.status,
                email: userData.email
            }
        })
    }

    async getUserList(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }
    async getUserById(userId:string){
        return this.prismaService.user.findUnique({
            where: {id:userId},
            select: {
                name: true,
                city:true
            }
        });
    }

    async deleteUser(id: string) {
        this.prismaService.user.delete( {id:userId})
         return this.prismaService.user.deleteMany();
    }
}
