import { Module } from '@nestjs/common';
import {PrismaService} from "../core/odm/prisma.service";
import {UsersController} from "./users.controller";


@Module({
    imports: [],
    controllers: [],
    providers: [PrismaService],
})
export class UsersModule {

}
