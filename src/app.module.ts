import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { configModule } from './configs/configs'

@Module({
  imports: [ConfigModule.forRoot(configModule), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
