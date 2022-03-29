import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IExchangeRate, IPaymentCurrency, IVoyageCostBaseCurrency, IVoyageCosts } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CostsService {
  private apiUrl = '../assets';

  constructor(private http: HttpClient) { }

  getCosts(): Observable<IVoyageCosts> {
    return this.http.get<IVoyageCosts>(`${this.apiUrl}/costs.json`);
  }

  getExchangeRates(): Observable<IExchangeRate> {
    return this.http.get<IExchangeRate>(`${this.apiUrl}/exchange-rates.json`);
  }
}
