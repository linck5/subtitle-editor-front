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

  shiftMode:string = 'forward'; //currently selected shift mode
  selectionMode:string = 'selected'; //currently selected selection mode
  

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

  applyShift(formattedShift:string) {
    
    console.log('shiftMode',this.shiftMode);
    console.log('selectMode',this.selectionMode);
    
    
    let ms = formattedStringToMl(formattedShift) * (this.shiftMode == 'forward' ? 1 : -1);
    for (let i = 0; i < this.lineInfo.length; i++) { //This will always loop 2 times
      //selection mode: selected, onward, all
      let changedLines = []
      switch (this.selectionMode) {
        case 'selected':
          changedLines = this.lineInfo[i].lines;
          break;
        case 'onward':
          if(this.lineInfo[i].lines.length == 0)
            break;
          //getting startTime of last line of selection
          let latestTime = this.lineInfo[i].lines.sort((a, b) => (a.startTime - b.startTime) * -1)[0].startTime
          //concatting selection and all lines that appear after
          changedLines = this.lineInfo[i].lines.concat(this.lineInfo[i].wrapper.getSubtitle().lines.filter(a => a.startTime > latestTime))
          break;
        case 'all':
          changedLines = this.lineInfo[i].wrapper.getSubtitle().lines
          break;
      }   
      for (let i = 0; i < changedLines.length; i++) {
        const e = changedLines[i];
        e.startTime = Math.max(0, e.startTime + ms);
        e.endTime = Math.max(0, e.endTime + ms);
      }

      this.lineInfo[i].wrapper.update(changedLines, ChangeType.Update);      
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