import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostsRoutingModule } from './costs-routing.module';
import { CostsComponent } from './costs.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CostsComponent
  ],
  imports: [
    CommonModule,
    CostsRoutingModule,
    SharedModule
  ]
})
export class CostsModule { }
