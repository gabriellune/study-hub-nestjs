import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import 'dotenv/config';
import { EmailService } from './services/EmailService';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
    }),
  ],
  providers: [EmailService],
  controllers: [],
})
export class NotificationModule {}
