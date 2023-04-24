import {Injectable} from '@nestjs/common';
import {User} from "@prisma/client";


import {CreateUserDto} from "./dto/users.dto";
import {PrismaService} from "../core/odm/prisma.service";


@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async createUser(userData: CreateUserDto):Promise<User> {
        return  this.prismaService.user.create({
            data: {
                age: userData.age,
                avatar: userData.avatar,
                city: userData.city,
                email: userData.email,
                name: userData.name,
                password:userData.password,
                status: userData.status

            }
        });
    }

    async getUserList() {
        return this.prismaService.user.findMany();
    }
    async getUserById(userId:string){
        return this.prismaService.user.findUnique({
            where: {id: String(userId)},
            select: {
                id:true,
                name: true,
                city:true,
                age:true
            }
        });
    }

    async deleteUser(id: string) {
        // this.prismaService.user.deleteMany()
        //  return this.prismaService.user.deleteMany();
    }
    async findByUserName (userEmail:string) {
        return  this.prismaService.user.findFirst({
            where: {email: userEmail}
        });
    }
}
