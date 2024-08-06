import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices'
import { WeatherService } from './weather.service'
import { WeatherResponse } from '../../../shared/contracts/weather.response'

@Controller()
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @MessagePattern({ cmd: 'current-weather' })
  async getCurrentWeather(@Ctx() ctx: RmqContext): Promise<WeatherResponse> {
    const channel = ctx.getChannelRef()
    const message = ctx.getMessage()
    channel.ack(message)

    return this.weatherService.getCurrentWeather()
  }

  @MessagePattern({ cmd: 'forecast-weather' })
  async getForecastWeather(@Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const message = ctx.getMessage()
    channel.ack(message)

    return this.weatherService.getForecastWeather()
  }
}
