import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices'

@Controller()
export class CurrencyController {
  @MessagePattern({ cmd: 'test' })
  async test(@Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const message = ctx.getMessage()
    channel.ack(message)

    return { test: 'TEST' }
  }
}
