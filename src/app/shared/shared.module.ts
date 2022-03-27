import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CostCommentComponent } from "./cost-comments/cost-comment.component";
import { CurrencyAmountComponent } from './currency-amount/currency-amount.component';
import { ExpenseCategoryItemComponent } from "./expense-category/expense-category-item/expense-category-item.component";
import { ExpenseCategoryComponent } from "./expense-category/expense-category.component";
import { SelectCurrencyComponent } from "./select-currency/select-currency.component";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    CostCommentComponent,
    ExpenseCategoryItemComponent,
    ExpenseCategoryComponent,
    SelectCurrencyComponent,
    CurrencyAmountComponent
  ],
  exports: [
    ExpenseCategoryComponent,
    SelectCurrencyComponent
  ]
})
export class SharedModule { }