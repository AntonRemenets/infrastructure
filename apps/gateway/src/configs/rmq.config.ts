import { ClientProviderOptions, Transport } from '@nestjs/microservices'

const URL = process.env.RABBITMQ_URL

export const rmqConfigCurrency: ClientProviderOptions = {
  name: 'CURRENCY',
  transport: Transport.RMQ,
  options: {
    urls: [`${URL}`],
    queue: 'currency_queue',
    queueOptions: {
      durable: false,
    },
  },
}

export const rmqConfigWeather: ClientProviderOptions = {
  name: 'WEATHER',
  transport: Transport.RMQ,
  options: {
    urls: [`${URL}`],
    queue: 'weather_queue',
    queueOptions: {
      durable: false,
    },
  },
}
