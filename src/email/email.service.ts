import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Email } from './interface/email.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendForgotPassword(payload: Email) {
    await this.mailService.sendMail({
      to: payload.to,
      from: this.configService.getOrThrow(`MAIL_SENDER`),
      subject: `Forgot Password`,
      context: {
        name: payload.name,
        otp: payload.otp,
      },
      template: './forgot-password',
    });
  }

  async sendWelcomeEmail(payload: Email) {
    await this.mailService.sendMail({
      to: payload.to,
      from: this.configService.getOrThrow(`MAIL_SENDER`),
      subject: `Selamat datang di Aplikasi Absensi`,
      context: {
        password: payload.password,
        email: payload.to,
      },
      template: './welcome',
    });
  }
}
