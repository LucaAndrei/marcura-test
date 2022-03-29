import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentType, IComment, ICostItem, IVoyageCostBaseCurrency, PaymentType } from 'src/app/models';

@Component({
  selector: 'app-expense-category-item',
  templateUrl: './expense-category-item.component.html',
  styleUrls: ['./expense-category-item.component.scss']
})
export class ExpenseCategoryItemComponent {
  @Input() selectedCurrency: IVoyageCostBaseCurrency;
  @Input() set expenseItem(_expenseItem: ICostItem) {
    this._expenseItem = _expenseItem;
    this.screenedAmount = this._expenseItem.costs.find(cost => cost.type === PaymentType.Screened)!.amount;
    this.quotedAmount = this._expenseItem.costs.find(cost => cost.type === PaymentType.Quoted)!.amount;
  }

  get expenseItem() {
    return this._expenseItem;
  }

  @Input() baseCurrency: IVoyageCostBaseCurrency;
  @Output() screenedAmountChanged = new EventEmitter<number>();

  private _expenseItem: ICostItem;
  screenedAmount: number;
  quotedAmount: number;
  areCommentsVisible = false;
  commentTypes = [CommentType.Internal, CommentType.External];
  addCommentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addCommentForm = this.formBuilder.group({
      type: [null, Validators.required],
      comment: [null, Validators.required]
    });
  }


  toggleComments() {
    this.areCommentsVisible = !this.areCommentsVisible;
  }

  onDelete(comment: IComment) {
    // trigger HTTP call, remove comment from array, get new comments array and the UI will update automatically (*ngFor will detect the new array)
  }

  onSave(event: IComment) {
    console.log('ExpenseCategoryItemComponent ~ onSave ~ event', event);
  }

  addComment() {
    if (this._expenseItem.comments) {
      this._expenseItem.comments = [
        ...this._expenseItem.comments,
        this.addCommentForm.getRawValue()
      ];
    } else {
      this._expenseItem = {
        ...this._expenseItem,
        comments: [this.addCommentForm.getRawValue()]
      }
    }

    this.addCommentForm.setValue({
      type: null,
      comment: null
    });
  }

  onScreenedAmountChanged(event: number) {
    this.screenedAmount = event;
    this.screenedAmountChanged.emit(event);
  }
}
