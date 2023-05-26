import * as path from 'path';
import { readFileSync } from 'fs';
import * as mailgun from 'mailgun-js';
import * as handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

import KafkaService from './email.kafka';

@Injectable()
export default class EmailService {
  private mailgunClient: mailgun.Mailgun;

  constructor(
    private readonly kafkaService: KafkaService,
    private readonly configService: ConfigService,
  ) {
    this.mailgunClient = mailgun({
      apiKey: configService.get('MAILGUN_API_KEY'),
      domain: configService.get('MAILGUN_DOMAIN'),
    });
    this.kafkaService.subscribe('email.send', (message) => {
      if (message.type === 'user_created') {
        this.sendWelcomeEmail(message);
      }
      if (message.type === 'user_deleted') {
        this.sendDeleteEmail(message);
      }
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    template: string,
    context: any,
    type: string,
  ): Promise<void> {
    try {
      const source = readFileSync(template, 'utf8');
      const compiledTemplate = handlebars.compile(source);
      const content = compiledTemplate(context);

      const data = {
        from: this.configService.get('EMAIL_FROM'),
        to,
        subject,
        html: content,
      };

      await this.mailgunClient.messages().send(data);
    } catch (error) {
      Logger.error('Error sending email:', error);

      this.kafkaService.send('email.failed', { type, payload: to });
    }
  }

  getTemplate(name: string): string {
    return path.join(process.cwd(), `src/views/${name}.hbs`);
  }

  async sendWelcomeEmail({ type, payload }: any): Promise<void> {
    const templatePath = this.getTemplate('welcome');
    const context = { email: payload };

    this.sendEmail(payload, 'Congratulations!', templatePath, context, type);
  }

  async sendDeleteEmail({ type, payload }: any): Promise<void> {
    const templatePath = this.getTemplate('delete');
    const context = { email: payload };

    this.sendEmail(payload, 'Bad news', templatePath, context, type);
  }
}
