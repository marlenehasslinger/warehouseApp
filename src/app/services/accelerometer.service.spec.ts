import { TestBed } from '@angular/core/testing';

import { AccelerometerService } from './accelerometer.service';

describe('AccelerometerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccelerometerService = TestBed.get(AccelerometerService);
    expect(service).toBeTruthy();
  });
});
