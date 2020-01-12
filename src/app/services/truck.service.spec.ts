import { TestBed } from '@angular/core/testing';

import { TruckService } from './truck.service';

describe('TruckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TruckService = TestBed.get(TruckService);
    expect(service).toBeTruthy();
  });
});
