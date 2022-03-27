import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IVoyageCosts } from '../models';
import { CostsService } from '../services/costs.service';

@Injectable({
  providedIn: 'root'
})
export class VoyageCostsResolver implements Resolve<IVoyageCosts> {
  constructor(private costsService: CostsService) { }
  resolve(): Observable<IVoyageCosts> {
    return this.costsService.getCosts();
  }
}
