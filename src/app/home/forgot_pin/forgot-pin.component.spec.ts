import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPINComponent } from './forgot-pin.component';

describe('ForgotPINComponent', () => {
  let component: ForgotPINComponent;
  let fixture: ComponentFixture<ForgotPINComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPINComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
