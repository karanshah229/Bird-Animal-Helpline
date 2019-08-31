import { TestBed } from '@angular/core/testing';

import { ProfileCompletionDataService } from './profile-completion-data.service';

describe('ProfileCompletionDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileCompletionDataService = TestBed.get(ProfileCompletionDataService);
    expect(service).toBeTruthy();
  });
});
