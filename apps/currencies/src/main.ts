import { NestFactory } from '@nestjs/core'
import { CurrenciesModule } from './currencies.module'
import { MicroserviceOptions } from '@nestjs/microservices'
import { rmqConfig } from './configs/rmq.config'

async function bootstrap() {
  const app = await NestFactory.create(CurrenciesModule)
  app.connectMicroservice<MicroserviceOptions>(rmqConfig)

  app.startAllMicroservices()
}
bootstrap()
