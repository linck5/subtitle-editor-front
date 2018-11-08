import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftTimesComponent } from './shift-times.component';

describe('ShiftTimesComponent', () => {
  let component: ShiftTimesComponent;
  let fixture: ComponentFixture<ShiftTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
