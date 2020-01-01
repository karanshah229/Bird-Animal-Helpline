import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecptDashboardComponent } from './recpt-dashboard.component';

describe('RecptDashboardComponent', () => {
  let component: RecptDashboardComponent;
  let fixture: ComponentFixture<RecptDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecptDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecptDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
