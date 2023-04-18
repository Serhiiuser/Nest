import { Injectable } from '@nestjs/common';
import {CreateUsersDto} from "../dto/users.dto";

@Injectable()
export class UsersService {
    private users: any = [];

    async createUser (userData: CreateUsersDto) {
         this.users.push(userData)
        return this.users;
    }
    async updateUserUser (userData: CreateUsersDto) {

        return this.users;
    }
    async deleteUser (userData: CreateUsersDto) {
         this.users.push(userData)
        return this.users;
    }
}
