import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { CbrCurrencyModel, CbrUnit, Units } from './models/currency.model'
import * as xmlutils from 'xml-js'
import { CurrencyResponse } from '../../../shared/contracts/currency.response'

@Injectable()
export class CurrencyService {
  constructor(private readonly httpService: HttpService) {}

  // Получение курса валют с cbr.ru
  async getFromCbr(): Promise<CurrencyResponse> {
    const cbr_url: string = process.env.CBR_URI + this.dateToString()
    try {
      const { data } = await this.httpService.axiosRef.get(cbr_url)
      return this.parseXml(data)
    } catch (e) {
      console.log(e)
    }
  }

  private parseXml(data: any): CurrencyResponse {
    const obj = xmlutils.xml2json(data, {
      compact: true,
    })
    const json: CbrCurrencyModel = JSON.parse(obj)
    const cbrUpdate: string = json.ValCurs._attributes.Date
    const list: CbrUnit[] = json.ValCurs.Valute
    const result: CurrencyResponse = {
      update: cbrUpdate,
      usd: undefined,
      euro: undefined,
    }

    for (const cbrUnit of list) {
      if (cbrUnit._attributes.ID === Units.USD) {
        result.usd = cbrUnit.Value._text
      } else if (cbrUnit._attributes.ID === Units.EURO) {
        result.euro = cbrUnit.Value._text
      }
    }

    return result
  }

  private dateToString(): string {
    const fullDate = new Date()
    const year = fullDate.getFullYear()
    const month =
      fullDate.getMonth() + 1 < 10
        ? '0' + (fullDate.getMonth() + 1)
        : fullDate.getMonth() + 1
    const date =
      fullDate.getDate() < 10 ? '0' + fullDate.getDate() : fullDate.getDate()

    return date + '/' + month + '/' + year
  }
}
