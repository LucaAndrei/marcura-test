import { Component, EventEmitter, Input, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IPaymentCurrency } from 'src/app/models';

@Component({
  selector: 'app-select-currency',
  templateUrl: './select-currency.component.html',
  styleUrls: ['./select-currency.component.scss']
})
export class SelectCurrencyComponent implements OnDestroy {
  @Input() selectedValue: string;
  @Input() list: IPaymentCurrency[] = [];
  @Output() onItemSelected = new EventEmitter<string>();

  selectedCurrency = new FormControl();
  private selectedCurrency$: Subscription;

  constructor() {
    this.selectedCurrency$ = this.selectedCurrency.valueChanges.subscribe(res => {
      this.onItemSelected.emit(res);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.selectedValue?.currentValue) {
      this.selectedCurrency.setValue(changes.selectedValue.currentValue, { emitEvent: false })
    }
  }

  ngOnDestroy(): void {
    this.selectedCurrency$.unsubscribe();
  }
}
