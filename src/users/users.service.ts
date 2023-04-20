import {Injectable} from '@nestjs/common';
import {User} from "@prisma/client";


import {CreateUsersDto} from "../users/dto/users.dto";
import {PrismaService} from "../core/odm/prisma.service";







@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async createUser(userData: CreateUsersDto):Promise<User> {
        return  this.prismaService.user.create({
            data:{
                id:userData.id,
                name:userData.name,
                age:userData.age,
                email:userData.email,
                city:userData.city,
                status:userData.status,

            }
        })


    }

    async getUserList(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }
    async getUserById(userId:string){
        return this.prismaService.user.findUnique({
            where: {id: Number(userId)},
            select: {
                name: true,
                city:true
            }
        });
    }

    async deleteUser(id: string) {
        // this.prismaService.user.deleteMany()
        //  return this.prismaService.user.deleteMany();
    }
}
// import { Injectable } from '@nestjs/common';
// import { User } from '@prisma/client';
// import {CreateUsersDto} from './dto/users.dto'
// import {PrismaService} from "../core/odm/prisma.service";


// @Injectable()
// export class UsersService {
//     constructor(private readonly prismaService: PrismaService) {}
//
//     async createUser(userData: CreateUsersDto):Promise<User>{
//         return this.prismaService.user.create({
//             data: {
//                 name: userData.name,
//                 city: userData.city,
//                 status: userData.status,
//                 age: userData.age,
//                 email: userData.email,
//
//             },
//         });
//     }
//
//     async getUserList(): Promise<User[]> {
//         return this.prismaService.user.findMany({
//             orderBy: {
//                 name: 'asc',
//             },
//             take: 5,
//         });
//     }
//
//     async getUserById(userId: string) {
//         return this.prismaService.user.findFirst({
//             where: { id: Number(userId) },
//             select: {
//                 id: true,
//                 name: true,
//                 city: true,
//                 age: true,
//             },
//             // include: {
//             //   pets: true,
//             // },
//         });
//     }
//
//     async deleteUser(id: string) {
//         // const user = this.users.find((item) => item.id === id);
//         // //slice на вибір
//         // return this.users;
//     }
//
//     async findByUsername(userEmail: string) {
//         return this.prismaService.user.findFirst({
//             where: { email: userEmail },
//         });
//     }
// }
