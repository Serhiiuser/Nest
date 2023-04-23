import {forwardRef, Module} from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import {UsersModule} from "../users/users.module";
import {UsersService} from "../users/users.service";
import {PrismaService} from "../core/odm/prisma.service";

@Module({
  imports: [forwardRef(() => UsersModule), ],
  providers: [PetsService,UsersService,PetsModule,PrismaService],
  controllers: [PetsController],
  exports: [PetsService]
})
export class PetsModule {}
