import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices'
import { CurrencyService } from './currency.service'

@Controller()
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @MessagePattern({ cmd: 'cbr_rates' })
  async getCbrRates(@Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const message = ctx.getMessage()
    channel.ack(message)

    return this.currencyService.getFromCbr()
  }
}
