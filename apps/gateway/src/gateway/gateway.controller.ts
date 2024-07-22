import { Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Controller('api')
export class GatewayController {
  constructor(@Inject('CURRENCY') private currencyService: ClientProxy) {}

  @Get('cbr-rates')
  async getCbrRates() {
    return this.currencyService.send({ cmd: 'cbr_rates' }, {})
  }
}
