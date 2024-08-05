import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  UseGuards,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, timeout } from 'rxjs'
import * as process from 'node:process'
import { CurrencyResponse } from '../../../../shared/contracts/currency.response'
import { AuthGuard } from '../guards/auth.guard'
import { WeatherResponse } from '../../../../shared/contracts/weather.response'

const DELAY = Number(process.env.MICROSERVICE_DELAY)

@UseGuards(AuthGuard)
@Controller('api')
export class GatewayController {
  constructor(
    @Inject('CURRENCY') private currencyService: ClientProxy,
    @Inject('WEATHER') private weatherService: ClientProxy,
  ) {}

  @Get('rates')
  async getRates(): Promise<CurrencyResponse> {
    try {
      return await firstValueFrom(
        this.currencyService.send({ cmd: 'rates' }, {}).pipe(timeout(DELAY)),
      )
    } catch (e) {
      throw new HttpException(
        'Unable to fetch data',
        HttpStatus.SERVICE_UNAVAILABLE,
      )
    }
  }

  @Get('current-weather')
  async getWeather(): Promise<WeatherResponse> {
    try {
      return await firstValueFrom(
        this.weatherService
          .send({ cmd: 'current-weather' }, {})
          .pipe(timeout(DELAY)),
      )
    } catch (e) {
      throw new HttpException(
        'Unable to fetch data',
        HttpStatus.SERVICE_UNAVAILABLE,
      )
    }
  }
}
