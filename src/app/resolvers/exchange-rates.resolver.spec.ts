import { TestBed } from '@angular/core/testing';

import { ExchangeRatesResolver } from './exchange-rates.resolver';

describe('ExchangeRatesResolver', () => {
  let resolver: ExchangeRatesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ExchangeRatesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
