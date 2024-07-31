import { Module } from '@nestjs/common'
import { WeatherController } from './weather.controller'
import { ConfigModule } from '@nestjs/config'
import { configModule } from '../../../shared/configs/configmodule.config'
import { HttpModule } from '@nestjs/axios'
import { WeatherService } from './weather.service'

@Module({
  imports: [ConfigModule.forRoot(configModule), HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
