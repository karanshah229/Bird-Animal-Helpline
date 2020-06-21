import { TestBed } from '@angular/core/testing';

import { RecptDashboardService } from './recpt-dashboard.service';

describe('RecptDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecptDashboardService = TestBed.get(RecptDashboardService);
    expect(service).toBeTruthy();
  });
});
