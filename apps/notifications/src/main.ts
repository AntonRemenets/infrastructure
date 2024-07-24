import { NestFactory } from '@nestjs/core'
import { NotificationsModule } from './notifications.module'
import { MicroserviceOptions } from '@nestjs/microservices'
import { rmqConfig } from './configs/rmq.config'

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule)
  app.connectMicroservice<MicroserviceOptions>(rmqConfig)

  await app.startAllMicroservices()
}
bootstrap()
