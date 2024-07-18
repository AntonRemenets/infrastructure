import { NestFactory } from '@nestjs/core'
import { CurrenciesModule } from './currencies.module'
import { ConfigService } from '@nestjs/config'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(CurrenciesModule)
  const config = app.get(ConfigService)
  const URL = config.get('RABBITMQ_URL')
  const QUEUE = 'currency_queue'

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`${URL}`],
      noAck: false,
      queue: QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  })

  app.startAllMicroservices()
}
bootstrap()
