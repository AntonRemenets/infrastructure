import { NestFactory } from '@nestjs/core'
import { WeatherModule } from './weather.module'
import { MicroserviceOptions } from '@nestjs/microservices'
import { rmqConfig } from './configs/rmq.config'

async function bootstrap() {
  const app = await NestFactory.create(WeatherModule)
  app.connectMicroservice<MicroserviceOptions>(rmqConfig)

  await app.startAllMicroservices()
}
bootstrap()
