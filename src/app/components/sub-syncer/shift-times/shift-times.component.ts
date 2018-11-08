import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-shift-times',
  templateUrl: './shift-times.component.html',
  styleUrls: ['./shift-times.component.scss']
})
export class ShiftTimesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShiftTimesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShiftTimesData) {}

  ngOnInit() {
  }

}

export interface ShiftTimesData {
  selected:number[]
}