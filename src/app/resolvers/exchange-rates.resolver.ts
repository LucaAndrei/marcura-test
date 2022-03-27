import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IExchangeRate } from '../models';
import { CostsService } from '../services/costs.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesResolver implements Resolve<IExchangeRate> {
  constructor(private costsService: CostsService) { }
  resolve(): Observable<IExchangeRate> {
    return this.costsService.getExchangeRates();
  }
}
