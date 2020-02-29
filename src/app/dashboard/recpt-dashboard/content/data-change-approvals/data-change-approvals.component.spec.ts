import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataChangeApprovalsComponent } from './data-change-approvals.component';

describe('DataChangeApprovalsComponent', () => {
  let component: DataChangeApprovalsComponent;
  let fixture: ComponentFixture<DataChangeApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataChangeApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataChangeApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
