import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const PORT: number = 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  await app.listen(PORT)
  console.log(`Server started on port ${PORT}`)
}
bootstrap()
