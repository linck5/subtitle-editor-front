import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subtitle, SubtitleLine, Position } from '../subtitle';
import { MatTableDataSource } from '@angular/material';
import { SubtitleService, SubtitleWrapper, Change, ChangeType } from '../../../shared/subtitle.service';
import { first } from 'rxjs/operators';
import { SubObserver, updateSubImpl, updateChecker } from '../../../shared/subObserver';

const positions = Object.keys(Position);

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubListComponent implements OnInit, SubObserver {

  updateOnNext:boolean;

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
        this.subList = sub.lines;
        this.cd.detectChanges();
      })
      this.subtitle.changes.subscribe(updateChecker(this,this.onSubChanges).bind(this))
    }
  }

  onSubChanges(changes:Array<Change>) {
    for (let i = 0; i < changes.length; i++) {      
      switch(changes[i].type){
        case ChangeType.New:
          this.subList = [...this.subList, changes[i].line]        
          break;
        case ChangeType.Update:
          this.subList = this.subList.map(line => line.id === changes[i].line.id ? line = changes[i].line : line)
          break;
        case ChangeType.Delete:
          this.subList = this.subList.filter(line => line.id !== changes[i].line.id)
          break;
      }
    }
    this.cd.detectChanges();
  }

  updateSub(subWrapper:SubtitleWrapper, lines:Array<SubtitleLine>, changeType:ChangeType) {
    updateSubImpl(this, subWrapper, lines, changeType)
  }

  textAreaChanged(event:Event, subID:number, value){
    console.log('text area changed, id:', subID)
    let line = this.subList.find(line => line.id === subID)
    console.log('line changed:', line.text)
    this.updateSub(this.subtitle,[line], ChangeType.Update)

    console.log(event)
  }

  //for template. no delete pls
  private getPositions() {
    return positions
  }
}
