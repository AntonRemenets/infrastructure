import { NestFactory } from '@nestjs/core'
import { CurrenciesModule } from './currencies.module'

async function bootstrap() {
  const app = await NestFactory.create(CurrenciesModule)
  await app.listen(3000)
}
bootstrap()
