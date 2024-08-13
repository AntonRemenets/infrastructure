import { ClientProviderOptions, Transport } from '@nestjs/microservices'

//const URL = process.env.RABBITMQ_URL

export function rmqConfigCurrency(URL: string): ClientProviderOptions {
  return {
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
}

export function rmqConfigWeather(URL: string): ClientProviderOptions {
  return {
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
}
