import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { configModule } from '../../../shared/configs/configmodule.config'
import { GatewayModule } from './gateway/gateway.module'

@Module({
  imports: [ConfigModule.forRoot(configModule), AuthModule, GatewayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
