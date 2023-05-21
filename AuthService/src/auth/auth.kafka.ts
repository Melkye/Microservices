import { Injectable } from '@nestjs/common';
import { Kafka, Consumer, Producer } from 'kafkajs';

@Injectable()
export default class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'auth-service',
      brokers: ['localhost:9092'],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({
      groupId: 'auth-group',
      heartbeatInterval: 30000,
      sessionTimeout: 60000,
      maxWaitTimeInMs: 50000,
    });
  }

  async send(topic: string, message: any): Promise<void> {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      console.error('Error during email sending: ', error);
    } finally {
      await this.producer.disconnect();
    }
  }

  async subscribe(
    topic: string,
    callback: (message: any) => void,
  ): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = JSON.parse(message.value.toString());
        callback(value);
      },
    });
  }
}
