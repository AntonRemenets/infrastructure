import { Module } from '@nestjs/common'
import { GatewayController } from './gateway.controller'
import { ClientsModule } from '@nestjs/microservices'
import { rmqConfig } from '../configs/rmq.config'

@Module({
  imports: [ClientsModule.register([rmqConfig])],
  controllers: [GatewayController],
})
export class GatewayModule {}
