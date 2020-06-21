import { TestBed } from '@angular/core/testing';

import { IsMobileService } from './is-mobile.service';

describe('IsMobileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsMobileService = TestBed.get(IsMobileService);
    expect(service).toBeTruthy();
  });
});
