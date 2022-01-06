import { TestBed } from '@angular/core/testing';

import { TaxiServiceService } from './taxi-service.service';

describe('TaxiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxiServiceService = TestBed.get(TaxiServiceService);
    expect(service).toBeTruthy();
  });
});
