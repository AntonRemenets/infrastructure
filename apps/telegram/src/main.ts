import { NestFactory } from '@nestjs/core'
import { TelegramModule } from './telegram.module'

// async function bootstrap() {
//   const app = await NestFactory.create(TelegramModule)
//   app.connectMicroservice<MicroserviceOptions>(rmqConfig)
//
//   await app.startAllMicroservices()
// }
// bootstrap()

async function bootstrap() {
  const app = await NestFactory.create(TelegramModule)
  await app.init()
}
bootstrap()
