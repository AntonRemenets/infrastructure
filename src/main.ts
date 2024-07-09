import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const PORT: number = 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(PORT)
  console.log(`Gateway started on port ${PORT}`)
}
bootstrap()
