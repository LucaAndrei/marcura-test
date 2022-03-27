import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICostItem, IExpenseCategory, IVoyageCostBaseCurrency, PaymentType } from 'src/app/models';
import { CostsService } from 'src/app/services/costs.service';

@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrls: ['./expense-category.component.scss']
})
export class ExpenseCategoryComponent implements OnDestroy {
  @Input() set category(_category: IExpenseCategory) {
    this._category = _category;
    this.totalQuotedAmount = this._category.costItems
      .map(costItem => costItem.costs)
      .reduce((acc, curVal) => [...acc, ...curVal], [])
      .filter(cost => cost.type === PaymentType.Quoted)
      .reduce((acc, curVal) => acc + curVal.amount, 0);
    this.totalScreenedAmount = this._category.costItems
      .map(costItem => costItem.costs)
      .reduce((acc, curVal) => [...acc, ...curVal], [])
      .filter(cost => cost.type === PaymentType.Screened)
      .reduce((acc, curVal) => acc + curVal.amount, 0);
  }
  get category() {
    return this._category;
  }
  @Input() baseCurrency: IVoyageCostBaseCurrency;
  @Input() exchangeRate: number;

  selectedCurrency: string;
  _category: IExpenseCategory;
  totalQuotedAmount: number;
  totalScreenedAmount: number;

  private selectedCurrency$: Subscription;
  constructor(private costsService: CostsService) {
    this.selectedCurrency$ = this.costsService.getSelectedCurrency().subscribe(res => {
      this.selectedCurrency = res;
    });
  }

  ngOnDestroy() {
    this.selectedCurrency$.unsubscribe();
  }
  onScreenedAmountChanged(event: number, item: ICostItem) {
    const category = this._category.costItems.find(costItem => costItem.id === item.id)?.costs.find(cost => cost.type === PaymentType.Screened);
    category!.amount = event;
    this.totalScreenedAmount = this._category.costItems
      .map(costItem => costItem.costs)
      .reduce((acc, curVal) => [...acc, ...curVal], [])
      .filter(cost => cost.type === PaymentType.Screened)
      .reduce((acc, curVal) => acc + curVal.amount, 0);
  }
}