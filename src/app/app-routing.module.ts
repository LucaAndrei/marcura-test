import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRatesResolver } from './resolvers/exchange-rates.resolver';
import { VoyageCostsResolver } from './resolvers/voyage-costs.resolver';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'voyage-costs',
    resolve: {
      voyageCosts: VoyageCostsResolver,
      exchangeRates: ExchangeRatesResolver
    },
    loadChildren: () => import('./modules/costs/costs.module').then(m => m.CostsModule)
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
