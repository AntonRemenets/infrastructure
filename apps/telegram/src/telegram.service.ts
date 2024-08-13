import { Hears, Start, Update } from 'nestjs-telegraf'
import { Inject, Injectable } from '@nestjs/common'
import { Context } from 'telegraf'
import { firstValueFrom, timeout } from 'rxjs'
import { ClientProxy } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { CurrencyResponse } from '../../../shared/contracts/currency.response'
import { WeatherForecastResponse } from '../../../shared/contracts/weather.response'

@Update()
@Injectable()
export class TelegramService {
  constructor(
    private config: ConfigService,
    @Inject('CURRENCY') private currencyService: ClientProxy,
    @Inject('WEATHER') private weatherService: ClientProxy,
  ) {}

  private DELAY = Number(this.config.get('MICROSERVICE_DELAY'))

  @Start()
  async start(ctx: Context) {
    await ctx.reply('Welcome')
  }

  @Hears('Курсы')
  async getCurrency(ctx: Context) {
    try {
      const data: CurrencyResponse = await firstValueFrom(
        this.currencyService
          .send({ cmd: 'rates' }, {})
          .pipe(timeout(this.DELAY)),
      )
      //await ctx.reply(JSON.stringify(data, null, 2))
      await ctx.reply(
        `Курсы валют на ${data.update}:\nДоллар: ${data.usd},\nЕвро: ${data.euro}.`,
      )
    } catch (e) {
      console.log(e)
      await ctx.reply('Unable to fetch data')
    }
  }

  // TODO: сделать красивый вывод
  @Hears('Прогноз')
  async getForecast(ctx: Context) {
    try {
      const data: WeatherForecastResponse = await firstValueFrom(
        this.weatherService
          .send({ cmd: 'forecast-weather' }, {})
          .pipe(timeout(this.DELAY)),
      )
      if (!data) {
        await ctx.reply('Unable to fetch data')
      }
      let msg = ''
      for (const item of data.result) {
        msg =
          msg +
          `${item.timestamp} температура: ${Math.floor(item.temp)} ${item.description},\n`
      }
      await ctx.reply(`Погода в ${data.city}:\n` + msg)
    } catch (e) {
      console.log(e)
      await ctx.reply('Unable to fetch data')
    }
  }
}
