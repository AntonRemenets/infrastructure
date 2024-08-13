import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'
import { ConfigModule } from '@nestjs/config'
import { TelegramController } from './telegram.controller'
import { TelegramService } from './telegram.service'
import { ClientsModule } from '@nestjs/microservices'
import { rmqConfigCurrency, rmqConfigWeather } from './configs/rmq.config'
import { configModule } from '../../../shared/configs/configmodule.config'

@Module({
  imports: [
    ConfigModule.forRoot(configModule),
    ClientsModule.register([
      rmqConfigCurrency(process.env.RABBITMQ_URL),
      rmqConfigWeather(process.env.RABBITMQ_URL),
    ]),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAF_TOKEN,
    }),
  ],
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class TelegramModule {}
