import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IExchangeRate, IPaymentCurrency, IVoyageCostBaseCurrency, IVoyageCosts } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CostsService {
  private apiUrl = '../assets';
  private selectedCurrency = new BehaviorSubject<IVoyageCostBaseCurrency>({ currency: '', exchangeRate: 0 });

  constructor(private http: HttpClient) { }

  selectCurrency(currency: string, paymentCurrencies: IPaymentCurrency[]) {
    const exchangeRate = paymentCurrencies.find(pCurrency => pCurrency.toCurrency === currency)!.exchangeRate
    this.selectedCurrency.next({
      currency,
      exchangeRate
    });
  }

  getSelectedCurrency() {
    return this.selectedCurrency.asObservable();
  }

  getCosts(): Observable<IVoyageCosts> {
    return this.http.get<IVoyageCosts>(`${this.apiUrl}/costs.json`);
  }

  getExchangeRates(): Observable<IExchangeRate> {
    return this.http.get<IExchangeRate>(`${this.apiUrl}/exchange-rates.json`);
  }
}
