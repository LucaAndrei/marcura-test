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
  @Input() selectedCurrency: string;
  @Input() amount: number;
  @Input() exchangeRate: number;
  @Input() isEditable = false;
  @Output() onScreenedAmountChanged = new EventEmitter<number>();

  amountFormControl = new FormControl('');
  private amount$: Subscription;
  constructor() {

  }
  ngOnInit() {
    if (this.isEditable) {
      this.amountFormControl.setValue(this.amount);
      this.amount$ = this.amountFormControl.valueChanges.subscribe(res => {
        this.onScreenedAmountChanged.emit(parseFloat(res));
      });
    }
  }

  ngOnDestroy(): void {
    if (this.amount$) {
      this.amount$.unsubscribe();
    }
  }
}
