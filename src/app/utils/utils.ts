import { ICostItem, PaymentType } from "../models";

export const getTotalAmountByPaymentType = (items: ICostItem[], paymentType: PaymentType) => {
  return items
    .map(costItem => costItem.costs)
    .reduce((acc, curVal) => [...acc, ...curVal], [])
    .filter(cost => cost.type === paymentType)
    .reduce((acc, curVal) => acc + curVal.amount, 0);
}
