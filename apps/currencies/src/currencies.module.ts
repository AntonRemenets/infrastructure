import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configModule } from '../../../shared/configs/configmodule.config'
import { CurrencyController } from './currency.controller'
import { CurrencyService } from './currency.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [ConfigModule.forRoot(configModule), HttpModule],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrenciesModule {}
