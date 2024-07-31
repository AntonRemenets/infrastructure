import { Module } from '@nestjs/common'
import { GatewayController } from './gateway.controller'
import { ClientsModule } from '@nestjs/microservices'
import { rmqConfigCurrency, rmqConfigWeather } from '../configs/rmq.config'
import { AuthGuard } from '../guards/auth.guard'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [ClientsModule.register([rmqConfigCurrency, rmqConfigWeather])],
  controllers: [GatewayController],
  providers: [AuthGuard, JwtService],
})
export class GatewayModule {}
