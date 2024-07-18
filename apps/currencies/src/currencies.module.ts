import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configModule } from '../../../shared/configs/configmodule.config'
import { CurrencyController } from './currency.controller'

@Module({
  imports: [ConfigModule.forRoot(configModule)],
  controllers: [CurrencyController],
  providers: [],
})
export class CurrenciesModule {}
