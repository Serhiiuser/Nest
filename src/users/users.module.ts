import { Module } from '@nestjs/common';
import {PrismaService} from "../core/odm/prisma.service";


@Module({
    imports: [],
    controllers: [],
    providers: [PrismaService],
})
export class UsersModule {

}
