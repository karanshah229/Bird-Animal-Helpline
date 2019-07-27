import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompletion2Component } from './profile-completion2.component';

describe('ProfileCompletion2Component', () => {
  let component: ProfileCompletion2Component;
  let fixture: ComponentFixture<ProfileCompletion2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCompletion2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompletion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
