
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from "path";
import {MailService} from "./mail/mail.service";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: 'smtp://serhiik91@gmail.com:EpqnOh1DHQP8v5XV@smtp-relay.sendinblue.com:587',
            // transport: 'smtp://serhiik91@gmail.com:Samsunga50a50!',
            defaults: {
                from: '"nest-bonus" <september@nestjs.com>',
            },
            template: {
                dir:path.join(__dirname, '..', '..', '/templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class CoreModule {}