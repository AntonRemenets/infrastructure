export interface IForecast {
  timestamp: string
  temp: number
  description: string
}

export class WeatherResponse {
  city: string
  temp: number
  weather?: string
  description?: string
  sunrise?: string
  sunset?: string
}

export class WeatherForecastResponse {
  city: string
  result: IForecast[]
}
