import {Injectable} from '@nestjs/common';
import {User} from "@prisma/client";
import * as bcrypt from 'bcryptjs';



import {CreateUserDto} from "./dto/users.dto";
import {PrismaService} from "../core/odm/prisma.service";
import {RegisterDto} from "../auth/dto/auth.dto";


@Injectable()
export class UsersService {
    private salt = 10;

    constructor(private readonly prismaService: PrismaService) {}

    async createUserByManager(userData: CreateUserDto):Promise<User> {
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
    async createUser(userData: RegisterDto): Promise<User> {
        const passwordHash = await this.hashPassword(userData.password);
        return this.prismaService.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: passwordHash,
            },
        });
    }
    async hashPassword(password: string) {
        return bcrypt.hash(password, this.salt);
    }

    async getUserList() {
        return this.prismaService.user.findMany();
    }
    async getUserById(userId:string){
        return this.prismaService.user.findFirst({
            where: { id: String(userId) },
        });
    }

    async deleteUser(id: string) {
        // this.prismaService.user.deleteMany()
        //  return this.prismaService.user.deleteMany();
    }
    async findByUserEmail(userEmail:string) {
        return  this.prismaService.user.findFirst({
            where: {email: userEmail}
        });
    }
}
