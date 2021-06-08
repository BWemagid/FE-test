export class Data {
    id?: number
    categoryCode?:string
    image?: string
    dates?:{
        valueDate: Date
    }
    transaction?:{
        amountCurrency:{
            amount: number
            currencyCode: string
        }
        type: string
        creditDebitIndicator: string
    }
    merchant?:{
        name: string
        accountNumber: string
    }
  }