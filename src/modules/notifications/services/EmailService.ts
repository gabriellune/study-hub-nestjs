import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail(target: string, subject: string, text: string): void {
    this.mailerService.sendMail({
      to: target,
      from: process.env.EMAIL_USER,
      subject,
      text,
    });
  }
}
