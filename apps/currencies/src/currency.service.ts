import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import * as process from 'node:process'
import { firstValueFrom } from 'rxjs'
import { CurrencyResponse } from '../../../shared/contracts/currency.response'
import { CurrencyModel } from './models/currency.model'

@Injectable()
export class CurrencyService {
  constructor(private readonly httpService: HttpService) {}

  async get(): Promise<Promise<CurrencyResponse> | void> {
    const URL: string =
      process.env.CURRENCY_API_URI +
      process.env.CURRENCY_API_KEY +
      '/latest/USD'
    const { data } = await firstValueFrom(
      this.httpService.get<CurrencyModel>(URL),
    )

    return {
      result: data.result,
      last_update: data.time_last_update_utc,
      rates: data.conversion_rates.RUB,
    }
  }
}
