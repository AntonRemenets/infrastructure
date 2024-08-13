import { NestFactory } from '@nestjs/core'
import { TelegramModule } from './telegramm.module'

async function bootstrap() {
  const app = await NestFactory.create(TelegramModule)
  await app.listen(3000)
}
bootstrap()
