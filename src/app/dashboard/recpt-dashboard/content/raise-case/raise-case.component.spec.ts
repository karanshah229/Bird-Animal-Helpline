import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseCaseComponent } from './raise-case.component';

describe('RaiseCaseComponent', () => {
  let component: RaiseCaseComponent;
  let fixture: ComponentFixture<RaiseCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
