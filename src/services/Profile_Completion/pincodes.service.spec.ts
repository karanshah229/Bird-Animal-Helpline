import { TestBed } from '@angular/core/testing';

import { PincodesService } from './pincodes.service';

describe('PincodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PincodesService = TestBed.get(PincodesService);
    expect(service).toBeTruthy();
  });
});
