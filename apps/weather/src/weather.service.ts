import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { NIZHNIY_TAGIL } from './locations'
import {
  IForecast,
  WeatherForecastResponse,
  WeatherResponse,
} from '../../../shared/contracts/weather.response'
import {
  WeatherCurrentModel,
  WeatherForecastModel,
} from './models/weather.model'
import { format, fromUnixTime, getDate } from 'date-fns'

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

  async getForecastWeather(): Promise<WeatherForecastResponse> {
    const url = this.getUrl('forecast', NIZHNIY_TAGIL.id)
    try {
      const { data } =
        await this.httpService.axiosRef.get<WeatherForecastModel>(url)

      return this.getForecast(data)
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

  private getForecast(data: WeatherForecastModel): WeatherForecastResponse {
    const weatherResult = []
    for (const weather of data.list) {
      const obj: IForecast = {
        timestamp: undefined,
        temp: undefined,
        description: undefined,
      }
      const hour: string = format(fromUnixTime(weather.dt), 'HH')
      const date: number = Number(format(fromUnixTime(weather.dt), 'dd'))
      const currentDate = getDate(new Date())

      if (date < currentDate + 3) {
        if (hour === '08' || hour === '14' || hour === '20') {
          obj.timestamp = format(fromUnixTime(weather.dt), 'dd-MM HH:mm')
          obj.temp = weather.main.temp
          obj.description = weather.weather[0].description

          weatherResult.push(obj)
        }
      }
    }
    return {
      message: `Прогноз погоды в городе ${data.city.name}`,
      result: weatherResult,
    }
  }
}
