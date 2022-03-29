import { Component, Input } from '@angular/core';
import { ICostItem, IExpenseCategory, IVoyageCostBaseCurrency, PaymentType } from 'src/app/models';
import { getTotalAmountByPaymentType } from 'src/app/utils/utils';

@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrls: ['./expense-category.component.scss']
})
export class ExpenseCategoryComponent {
  @Input() set category(_category: IExpenseCategory) {
    this._category = _category;
    this.totalQuotedAmount = getTotalAmountByPaymentType(this._category.costItems, PaymentType.Quoted);
    this.totalScreenedAmount = getTotalAmountByPaymentType(this._category.costItems, PaymentType.Screened);
  }
  get category() {
    return this._category;
  }

  @Input() baseCurrency: IVoyageCostBaseCurrency;
  @Input() selectedCurrency: IVoyageCostBaseCurrency;

  totalQuotedAmount: number;
  totalScreenedAmount: number;

  private _category: IExpenseCategory;

  constructor() { }

  onScreenedAmountChanged(event: number, item: ICostItem) {
    const category = this._category.costItems.find(costItem => costItem.id === item.id)?.costs.find(cost => cost.type === PaymentType.Screened);
    category!.amount = event;
    this.totalScreenedAmount = getTotalAmountByPaymentType(this._category.costItems, PaymentType.Screened);
  }
}
