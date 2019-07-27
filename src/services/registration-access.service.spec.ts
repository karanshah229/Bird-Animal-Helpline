import { TestBed } from '@angular/core/testing';

import { RegistrationAccessService } from './registration-access.service';

describe('RegistrationAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrationAccessService = TestBed.get(RegistrationAccessService);
    expect(service).toBeTruthy();
  });
});
