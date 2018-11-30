import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftTimesComponent } from './shift-times.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShiftTimesComponent', () => {
  let component: ShiftTimesComponent;
  let fixture: ComponentFixture<ShiftTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, BrowserAnimationsModule, MaterialModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: []}
      ],
      declarations: [ ShiftTimesComponent ],
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
