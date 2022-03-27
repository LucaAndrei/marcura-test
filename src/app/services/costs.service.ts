import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IExchangeRate, IVoyageCosts } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CostsService {
  private apiUrl = '../assets';
  private selectedCurrency = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  selectCurrency(currency: string) {
    this.selectedCurrency.next(currency);
  }

  getSelectedCurrency() {
    return this.selectedCurrency.asObservable();
  }

  getCosts(): Observable<IVoyageCosts> {
    return this.http.get<IVoyageCosts>(`${this.apiUrl}/costs.json`).pipe(
      tap(voyageCosts => {
        this.selectCurrency(voyageCosts.daCurrency.currency);
      }),
      map(voyageCosts => {
        return {
          ...voyageCosts,
          costs: voyageCosts.costs.sort((a, b) => a.displayOrder - b.displayOrder)
        }
      })
    );
  }

  getExchangeRates(): Observable<IExchangeRate> {
    return this.http.get<IExchangeRate>(`${this.apiUrl}/exchange-rates.json`);
  }
}
