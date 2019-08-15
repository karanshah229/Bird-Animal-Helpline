import { TestBed } from '@angular/core/testing';

import { RegFormService } from './reg-form.service';

describe('RegFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegFormService = TestBed.get(RegFormService);
    expect(service).toBeTruthy();
  });
});
