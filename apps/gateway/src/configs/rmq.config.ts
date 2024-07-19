import { ClientProviderOptions, Transport } from '@nestjs/microservices'

const URL = process.env.RABBITMQ_URL
const QUEUE = 'currency_queue'

export const rmqConfig: ClientProviderOptions = {
  name: 'CURRENCY',
  transport: Transport.RMQ,
  options: {
    urls: [`${URL}`],
    queue: QUEUE,
    queueOptions: {
      durable: false,
    },
  },
}
