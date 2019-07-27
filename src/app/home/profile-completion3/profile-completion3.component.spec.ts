import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompletion3Component } from './profile-completion3.component';

describe('ProfileCompletion3Component', () => {
  let component: ProfileCompletion3Component;
  let fixture: ComponentFixture<ProfileCompletion3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCompletion3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompletion3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
