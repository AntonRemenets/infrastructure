interface IWeather {
  main: string
  description: string
}

interface ITemp {
  temp: number
}

interface IForecast {
  dt: number
  main: ITemp
  // Массив погоды
  weather: IWeather[]
  // Time of data forecasted, ISO, UTC
  dt_text: string
}

export class WeatherCurrentModel {
  // Погода - общее
  weather: IWeather[]

  // Температура
  main: ITemp

  // Видимость
  visibility?: number

  // Ветер
  wind?: {
    speed: number
    deg: number
  }

  // Облачность
  clouds?: {
    all: number
  }

  // // Дождь
  // rain?: {
  //   1h: number
  // }
  //
  // // Снег
  // snow?: {
  //   1h: number
  // }

  // Восход - закат
  sys?: {
    sunrise: number
    sunset: number
  }

  // Город
  name: string
}

export class WeatherForecastModel {
  list: IForecast[]
  city: {
    name: string
    sunset: number
  }
}
