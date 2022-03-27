import { IComment } from "./comment";

export enum PaymentType {
  Quoted = 'Quoted',
  Screened = 'Screened'
};

export interface ICostAmount {
  daStage: string;
  persona: string;
  type: PaymentType;
  amount: number;
}

export interface IAnnotation {
  id: number;
  name: string;
}

export interface ICostItemAlias {
  accountingCode: string;
}

export interface ICostItem {
  id: number;
  name: string;
  costItemAlias: ICostItemAlias;
  annotation: IAnnotation;
  costs: ICostAmount[];
  comments: IComment[];
}

export interface IExpenseCategory {
  id: number;
  name: string;
  displayOrder: number;
  costItems: ICostItem[];
}

export interface IVoyageCostCurrency {
  currency: string;
}

export interface IVoyageCostBaseCurrency extends IVoyageCostCurrency {
  exchangeRate: number;
}

export interface IVoyageCosts {
  daCurrency: IVoyageCostCurrency;
  baseCurrency: IVoyageCostBaseCurrency;
  costs: IExpenseCategory[];
}
