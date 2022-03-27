import { TestBed } from '@angular/core/testing';

import { VoyageCostsResolver } from './voyage-costs.resolver';

describe('VoyageCostsResolver', () => {
  let resolver: VoyageCostsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VoyageCostsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
