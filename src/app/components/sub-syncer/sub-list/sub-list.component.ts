import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subtitle, SubtitleLine, Position } from '../subtitle';
import { MatTableDataSource } from '@angular/material';
import { SubtitleService, SubtitleWrapper, Change, ChangeType } from '../../../shared/subtitle.service';
import { first } from 'rxjs/operators';

const positions = Object.keys(Position);

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubListComponent implements OnInit {

  @Input()
  subtitle:SubtitleWrapper

  columnsToDisplay = ["subId","subTime","subPosition","subText"]

  subList: Array<SubtitleLine> = []

  constructor(private subService: SubtitleService, private cd:ChangeDetectorRef) { }

  ngOnInit() {  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['subtitle'] && this.subtitle) {
      this.subtitle.subtitle.pipe(first()).subscribe(sub => {
        console.log('sublist: got subtitle as input, line count: ',sub.lines.length)
        this.subList = sub.lines;
        this.cd.detectChanges();
      })
      this.subtitle.changes.subscribe(this.onChanges.bind(this))
    }
  }

  onChanges(changes:Array<Change>){
    for (let i = 0; i < changes.length; i++) {
      console.log('found a change: ',changes[i].line.text)  
      
      switch(changes[i].type){
        case ChangeType.Delete:
          this.subList = this.subList.filter(line => line.id !== changes[i].line.id)
          break;
      }
    }
    this.cd.detectChanges();
  }

  //for template. no delete pls
  private getPositions() {
    return positions
  }
}
