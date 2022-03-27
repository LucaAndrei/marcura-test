import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IExchangeRate, IVoyageCostBaseCurrency, IVoyageCosts } from 'src/app/models';
import { CostsService } from 'src/app/services/costs.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss']
})
export class CostsComponent implements OnInit, OnDestroy {
  voyageCosts: IVoyageCosts;
  exchangeRates: IExchangeRate;
  baseCurrency: IVoyageCostBaseCurrency;
  selectedCurrency: string;
  exchangeRate: number;

  private selectedCurrency$: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private costsService: CostsService) {

  }

  ngOnInit(): void {
    this.voyageCosts = this.activatedRoute.snapshot.data.voyageCosts;
    this.exchangeRates = this.activatedRoute.snapshot.data.exchangeRates;
    this.baseCurrency = this.voyageCosts.baseCurrency;
    this.selectedCurrency$ = this.costsService.getSelectedCurrency().subscribe(res => {
      this.selectedCurrency = res;
      this.exchangeRate = this.getExchangeRate(this.selectedCurrency);
    });
  }

  onCurrencyChange(selectedCurrency: string) {
    this.costsService.selectCurrency(selectedCurrency);

  }

  private getExchangeRate(selectedCurrency: string) {
    return this.exchangeRates.paymentCurrencies.find(currency => currency.toCurrency === selectedCurrency)!.exchangeRate;
  }

  ngOnDestroy(): void {
    this.selectedCurrency$.unsubscribe();
  }

}
