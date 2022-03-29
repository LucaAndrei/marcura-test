import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IVoyageCostBaseCurrency } from 'src/app/models';

@Component({
  selector: 'app-currency-amount',
  templateUrl: './currency-amount.component.html',
  styleUrls: ['./currency-amount.component.scss']
})
export class CurrencyAmountComponent implements OnInit, OnDestroy {
  @Input() baseCurrency: IVoyageCostBaseCurrency;
  @Input() set selectedCurrency(_selectedCurrency: IVoyageCostBaseCurrency) {
    this._selectedCurrency = _selectedCurrency;
    if (this.isEditable) {
      this.setAmount();
    }
  }
  get selectedCurrency() {
    return this._selectedCurrency;
  }
  private _selectedCurrency: IVoyageCostBaseCurrency;
  @Input() amount: number;
  @Input() isEditable = false;
  @Output() onScreenedAmountChanged = new EventEmitter<number>();

  amountFormControl = new FormControl('');
  private amount$: Subscription;
  constructor() { }

  ngOnInit() {
    if (this.isEditable) {
      this.setAmount();
    }
  }

  private setAmount() {
    this.amountFormControl.setValue((this.amount * this.selectedCurrency.exchangeRate).toFixed(2), {emitEvent: false});
    this.amount$ = this.amountFormControl.valueChanges.subscribe(res => {
      this.onScreenedAmountChanged.emit(parseFloat(res));
    });
  }

  ngOnDestroy(): void {
    if (this.amount$) {
      this.amount$.unsubscribe();
    }
  }
}
