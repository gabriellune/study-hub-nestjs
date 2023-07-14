import { connect } from 'amqplib';
import 'dotenv/config';

export async function publisher(message: string) {
  const connection = await connect('amqp://dev:dev@localhost:5672');

  const channel = await connection.createChannel();

  const queue = process.env.PUB_QUEUE;

  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(message));
}
