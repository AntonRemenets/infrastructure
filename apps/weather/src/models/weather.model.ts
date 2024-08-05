interface IWeather {
  main: string
  description: string
}

export class WeatherModel {
  // Погода - общее
  weather: IWeather[]

  // Температура
  main: {
    temp: number
  }

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
