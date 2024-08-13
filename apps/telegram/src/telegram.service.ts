import { Hears, Start, Update } from 'nestjs-telegraf'
import { Inject, Injectable } from '@nestjs/common'
import { Context } from 'telegraf'
import { firstValueFrom, timeout } from 'rxjs'
import { ClientProxy } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

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

  @Hears('курсы')
  async getCurrency(ctx: Context) {
    try {
      const data = await firstValueFrom(
        this.currencyService
          .send({ cmd: 'rates' }, {})
          .pipe(timeout(this.DELAY)),
      )
      await ctx.reply(JSON.stringify(data, null, 2))
    } catch (e) {
      console.log(e)
      await ctx.reply('Unable to fetch data')
    }
  }

  @Hears('прогноз')
  async getForecast(ctx: Context) {
    try {
      const data = await firstValueFrom(
        this.weatherService
          .send({ cmd: 'forecast-weather' }, {})
          .pipe(timeout(this.DELAY)),
      )
      await ctx.reply(JSON.stringify(data, null, 2))
    } catch (e) {
      console.log(e)
      await ctx.reply('Unable to fetch data')
    }
  }
}
