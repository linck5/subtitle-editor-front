import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SubtitleLine } from '../subtitle';
import { SubtitleWrapper, ChangeType } from 'src/app/shared/subtitle.service';
import { handleTimeInput, formattedStringToMl } from 'src/app/shared/input';

@Component({
  selector: 'app-shift-times',
  templateUrl: './shift-times.component.html',
  styleUrls: ['./shift-times.component.scss']
})
export class ShiftTimesComponent implements OnInit {

  shiftTime:Date = new Date(0);

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

  getLines(lang:string):SubtitleLine[] {
    return this.lineInfo.find((data) => data.wrapper.getLanguage() == lang).lines;
  }

  applyShift(formattedShift:string) {
    let ms = formattedStringToMl(formattedShift);
    for (let i = 0; i < this.lineInfo.length; i++) {
      const data = this.lineInfo[i];
      for (let i = 0; i < data.lines.length; i++) {
        const e = data.lines[i];
        e.startTime += ms;
        e.endTime += ms;
      }
      data.wrapper.update(data.lines, ChangeType.Update);      
    }
  }

  shiftChange(event, value:string) {
    handleTimeInput(event, value)
  }
}

export type ShiftTimesData = [
  {
    wrapper:SubtitleWrapper,
    lines:SubtitleLine[]
  }
]