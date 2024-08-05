import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { NIZHNIY_TAGIL } from './locations'
import { WeatherResponse } from '../../../shared/contracts/weather.response'
import { WeatherModel } from './models/weather.model'

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrentWeather(): Promise<WeatherResponse> {
    const url = this.getUrl(NIZHNIY_TAGIL.id)
    try {
      const { data } = await this.httpService.axiosRef.get<WeatherModel>(url)
      const sunset = new Date(data.sys.sunset * 1000)
      //console.log(data.weather.description)

      return {
        city: data.name,
        temp: data.main.temp,
        description: data.weather[0].description,
        sunset: sunset.toLocaleTimeString(),
      }
    } catch (e) {
      console.log(e.code)
    }
  }

  private getUrl(id: number): string {
    return `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.WEATHER_TOKEN}&lang=ru&units=metric`
  }
}
