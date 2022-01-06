import { TestBed } from '@angular/core/testing';

import { UserRouteGardService } from './user-route-gard.service';

describe('UserRouteGardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRouteGardService = TestBed.get(UserRouteGardService);
    expect(service).toBeTruthy();
  });
});
