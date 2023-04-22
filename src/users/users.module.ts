import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PetsModule } from '../pets/pets.module';
import { PetsService } from '../pets/pets.service';
import {PrismaService} from "../core/odm/prisma.service";


@Module({
    imports: [ forwardRef(() => PetsModule)],
    controllers: [UsersController],
    providers: [PrismaService, UsersService, PetsService],
})
export class UsersModule {}