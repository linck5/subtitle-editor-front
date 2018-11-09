import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SubtitleLine } from '../subtitle';
import { SubtitleWrapper } from 'src/app/shared/subtitle.service';

@Component({
  selector: 'app-shift-times',
  templateUrl: './shift-times.component.html',
  styleUrls: ['./shift-times.component.scss']
})
export class ShiftTimesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShiftTimesComponent>,
    @Inject(MAT_DIALOG_DATA) public lineInfo: ShiftTimesData) {}

  ngOnInit() {
    for (let i = 0; i < this.lineInfo.length; i++) {
      const e = this.lineInfo[i];
      console.log('sub file id:',e.wrapper.id);
      console.log('sub lines:',e.lines);
    }
  }

}

export type ShiftTimesData = [
  {
    wrapper:SubtitleWrapper,
    lines:SubtitleLine[]
  }
]