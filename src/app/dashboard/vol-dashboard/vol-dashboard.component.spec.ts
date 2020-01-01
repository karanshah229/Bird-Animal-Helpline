import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolDashboardComponent } from './vol-dashboard.component';

describe('VolDashboardComponent', () => {
  let component: VolDashboardComponent;
  let fixture: ComponentFixture<VolDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
