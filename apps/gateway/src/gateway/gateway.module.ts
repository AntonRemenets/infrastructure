import { Module } from '@nestjs/common'
import { GatewayController } from './gateway.controller'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

@Module({
  controllers: [GatewayController],
  providers: [
    {
      provide: 'CURRENCY',
      useFactory: (config: ConfigService) => {
        const URL = config.get('RABBITMQ_URL')
        const QUEUE = 'currency_queue'

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`${URL}`],
            queue: QUEUE,
            queueOptions: {
              durable: false,
            },
          },
        })
      },
      inject: [ConfigService],
    },
  ],
})
export class GatewayModule {}
