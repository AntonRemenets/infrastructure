import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { NIZHNIY_TAGIL } from './locations'

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  // TODO: remove ANY
  async getCurrentWeather(): Promise<any> {
    const url = this.getUrl(NIZHNIY_TAGIL.id)
    const { data } = await this.httpService.axiosRef.get(url)

    return data
  }

  private getUrl(id: number): string {
    return `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.WEATHER_TOKEN}&lang=ru&units=metric`
  }
}
