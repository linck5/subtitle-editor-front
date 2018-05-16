import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCpComponent } from './admin-cp.component';

describe('AdminCpComponent', () => {
  let component: AdminCpComponent;
  let fixture: ComponentFixture<AdminCpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
