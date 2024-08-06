import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { NIZHNIY_TAGIL } from './locations'
import { WeatherResponse } from '../../../shared/contracts/weather.response'
import {
  WeatherCurrentModel,
  WeatherForecastModel,
} from './models/weather.model'

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrentWeather(): Promise<WeatherResponse> {
    const url = this.getUrl('current', NIZHNIY_TAGIL.id)
    try {
      const { data } =
        await this.httpService.axiosRef.get<WeatherCurrentModel>(url)
      const sunset = new Date(data.sys.sunset * 1000)

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

  async getForecastWeather() {
    const url = this.getUrl('forecast', NIZHNIY_TAGIL.id)
    try {
      const { data } =
        await this.httpService.axiosRef.get<WeatherForecastModel>(url)

      return data
    } catch (e) {
      console.log(e.code)
    }
  }

  private getUrl(type: string, id: number): string {
    if (type === 'current') {
      return `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.WEATHER_TOKEN}&lang=ru&units=metric`
    } else if (type === 'forecast') {
      return `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${process.env.WEATHER_TOKEN}&lang=ru&units=metric`
    } else {
      return null
    }
  }
}
