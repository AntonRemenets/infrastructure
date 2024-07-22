export class CbrCurrencyModel {
  _declaration: any
  ValCurs: {
    _attributes: { Date: string }
    Valute: CbrUnit[]
  }
}

export class CbrUnit {
  _attributes: { ID: string }
  CharCode: { _text: string }
  Value: { _text: string }
}

export enum Units {
  USD = 'R01235',
  EURO = 'R01239',
}
