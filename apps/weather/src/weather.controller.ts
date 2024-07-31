import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices'
import { WeatherService } from './weather.service'

@Controller()
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  // TODO: remove ANY
  @MessagePattern({ cmd: 'current-weather' })
  async getCurrentWeather(@Ctx() ctx: RmqContext): Promise<any> {
    const channel = ctx.getChannelRef()
    const message = ctx.getMessage()
    channel.ack(message)

    return this.weatherService.getCurrentWeather()
  }
}
