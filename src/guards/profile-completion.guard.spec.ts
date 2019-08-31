import { TestBed, async, inject } from '@angular/core/testing';

import { ProfileCompletionGuard } from './profile-completion.guard';

describe('ProfileCompletionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileCompletionGuard]
    });
  });

  it('should ...', inject([ProfileCompletionGuard], (guard: ProfileCompletionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
