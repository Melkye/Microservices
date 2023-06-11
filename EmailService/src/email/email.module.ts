import { Module } from '@nestjs/common';
import EmailService from './email.service';
import KafkaService from './email.kafka';

@Module({
  providers: [EmailService, KafkaService],
})
export default class EmailModule {}
