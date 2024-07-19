import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { CurrencyModel } from './models/currency.model'
import { CurrencyResponse } from '../../../shared/contracts/currency.response'

@Injectable()
export class CurrencyService {
  constructor(private readonly httpService: HttpService) {}
  private URL =
    process.env.CURRENCY_API_URI + process.env.CURRENCY_API_KEY + '/latest/USD'

  async get(): Promise<Promise<CurrencyResponse> | void> {
    const { data } = await firstValueFrom(
      this.httpService.get<CurrencyModel>(this.URL),
    )

    return {
      result: data.result,
      last_update: data.time_last_update_utc,
      rates: data.conversion_rates.RUB,
    }
  }
}
