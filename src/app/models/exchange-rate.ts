export interface IPaymentCurrency {
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
}

export interface IExchangeRate {
  sourceCurrency: string;
  paymentCurrencies: IPaymentCurrency[];
}
