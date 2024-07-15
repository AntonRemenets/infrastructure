import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

const PORT: number = 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  await app.listen(PORT)
  console.log(`Gateway started on port ${PORT}`)
}
bootstrap()
