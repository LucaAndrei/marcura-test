import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  selectedCurrency: IVoyageCostBaseCurrency;
  isLoading = true;

  selectedCurrency$: Observable<any>;
  private resolverData$: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private costsService: CostsService) {

  }

  ngOnInit(): void {
    this.resolverData$ = this.activatedRoute.data.subscribe(resolverData => {
      this.voyageCosts = resolverData.voyageCosts;
      this.exchangeRates = resolverData.exchangeRates;
      this.baseCurrency = this.voyageCosts.baseCurrency;
      this.costsService.selectCurrency(this.voyageCosts.daCurrency.currency, this.exchangeRates.paymentCurrencies);
      this.selectedCurrency$ = this.costsService.getSelectedCurrency();
      this.isLoading = false;
    })

  }

  onCurrencyChange(selectedCurrency: string) {
    this.costsService.selectCurrency(selectedCurrency, this.exchangeRates.paymentCurrencies);
  }

  ngOnDestroy(): void {
    this.resolverData$.unsubscribe();
  }
}
