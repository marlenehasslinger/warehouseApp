import { TestBed } from '@angular/core/testing';

import { TutorialServiceService } from './tutorial-service.service';

describe('TutorialServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TutorialServiceService = TestBed.get(TutorialServiceService);
    expect(service).toBeTruthy();
  });
});
