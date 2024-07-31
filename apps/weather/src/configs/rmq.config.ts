import { MicroserviceOptions, Transport } from '@nestjs/microservices'

const URL = process.env.RABBITMQ_URL
const QUEUE = 'weather_queue'

export const rmqConfig: MicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [`${URL}`],
    queue: QUEUE,
    noAck: false,
    queueOptions: {
      durable: false,
    },
  },
}
