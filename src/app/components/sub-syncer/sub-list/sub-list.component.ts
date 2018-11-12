import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit, OnChanges, HostListener } from '@angular/core';
import { Subtitle, SubtitleLine, Position } from '../subtitle';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SubtitleService, SubtitleWrapper, Change, ChangeType } from '../../../shared/subtitle.service';
import { first } from 'rxjs/operators';
import { SubObserver, updateSubImpl, updateChecker } from '../../../shared/subObserver';
import { cloneObject, arrDiff } from '../../../shared/miscUtils';
import { KeyboardService } from 'src/app/shared/keyboard.service';
import { formattedStringToMl, handleTimeInput } from 'src/app/shared/input';

const positions = Object.keys(Position);

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubListComponent implements OnInit, OnChanges, SubObserver {

  updateOnNext:boolean = true;

  @Input()
  subtitle:SubtitleWrapper

  columnsToDisplay = ["subId","subTime","subPosition","subText"]

  subListSource = new MatTableDataSource<SubtitleLine>([])

  selected:SubtitleLine[] = []

  editableAttr = "data-editable"

  @ViewChild(MatSort) matSort: MatSort;

  constructor(private subService: SubtitleService, private cd:ChangeDetectorRef) { }

  ngOnInit() {

    this.subListSource.sort = this.matSort
    this.subListSource.sortingDataAccessor = (line, headerId) => {

      switch (headerId) {
        case 'id':
          return line.id
        case 'pos':
          return line.startTime
      }

      return 2
    }
    // this.subListSource.sortData(adss, matSort)
  }

  onSortData(sort: MatSort) {
    // console.log('on sort')
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['subtitle'] && this.subtitle) {
      this.subtitle.subtitle.pipe(first()).subscribe(sub => {
        this.subListSource.data = sub.lines
        this.cd.detectChanges();
      })
      this.subtitle.changes.subscribe(updateChecker(this,this.onSubChanges).bind(this))
    }
  }

  onSubChanges(changes:Array<Change>) {
    let newList
    for (let i = 0; i < changes.length; i++) {      
      switch(changes[i].type){
        case ChangeType.New:
          newList = [...this.subListSource.data, changes[i].line]        
          break;
        case ChangeType.Update:
          newList = this.subListSource.data.map(line => line.id === changes[i].line.id ? line = changes[i].line : line)
          break;
        case ChangeType.Delete:
          newList = this.subListSource.data.filter(line => line.id !== changes[i].line.id)
          this.selected.splice(this.selected.indexOf(changes[i].line),1)
          break;
      }
    }
    this.subListSource.data = newList
    this.cd.detectChanges();
  }

  updateSub(subWrapper:SubtitleWrapper, lines:Array<SubtitleLine>, changeType:ChangeType) {
    updateSubImpl(this, subWrapper, lines, changeType)
  }

  textAreaChanged(event:Event, subID:number, value:string){
    let line = this.subListSource.data.find(line => line.id === subID)
    line.text = value
    this.updateSub(this.subtitle,[line], ChangeType.Update)
  }

  onFocusOut(event, subID:number, isStartTime:boolean, value:string, parentElem:HTMLElement){
    let line = this.subListSource.data.find(line => line.id === subID)
    if(isStartTime)
      line.startTime = formattedStringToMl(value)
    else
      line.endTime = formattedStringToMl(value)

    this.makeNotEditable(parentElem);

    this.cd.detectChanges();
  }

  makeNotEditable(elem:HTMLElement){
    elem.removeAttribute(this.editableAttr)
  }

  timesChanged(event, subID:number, isStartTime:boolean, value:string){
    handleTimeInput(event, value)
    let result = formattedStringToMl(event.target.value)

    let line = cloneObject(this.subListSource.data.find(line => line.id === subID))
    if(isStartTime)
      line.startTime = result
    else
      line.endTime = result
    this.updateSub(this.subtitle,[line], ChangeType.Update)
  }

  //for template. no delete pls
  private getPositions() {
    return positions
  }

  //--------------------------
  /**
   *  Row Selection Logic
  */

  //Mouse events
  private isMouseDown = false;
  private firstSelected:number; // Id of first line selected with mouse
  private currentlySelected:number; // Id of current line selected while dragging mouse
  private previousSelectedLines:SubtitleLine[] = [];
  private currentSelectedLines:SubtitleLine[] = [];

  mouseDown(e:MouseEvent, line:SubtitleLine) {
    if(!e.ctrlKey)
      this.previousSelectedLines = []

    this.firstSelected = this.getCurrentlySortedArray().indexOf(line)

    if(e.shiftKey){ //If shift key is pressed...      
      //Adding all lines between 'currentlyselected' and this line selected 
      let shiftLines = this.getLineRange(this.firstSelected, this.currentlySelected)
      shiftLines.splice(shiftLines.indexOf(line),1)
      this.previousSelectedLines = this.previousSelectedLines.concat(shiftLines)
      let set = new Set(this.previousSelectedLines) //I use a set to eliminate duplicates
      this.previousSelectedLines = Array.from(set)
    }

    this.isMouseDown = true;
    this.currentlySelected = this.firstSelected;
    this.refreshSelected()
  }
  mouseOver(event, line:SubtitleLine) {
    if(this.isMouseDown){
      this.currentlySelected = this.getCurrentlySortedArray().indexOf(line)
      this.refreshSelected() 
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event) {
    this.isMouseDown = false;
    this.previousSelectedLines = arrDiff(this.previousSelectedLines,this.currentSelectedLines, (i1,i2)=>i1.id === i2.id)
    this.currentSelectedLines = []
    //This is when you commit the operation to the resulting lines
  }

  refreshSelected() {
    this.currentSelectedLines = this.getLineRange(this.firstSelected, this.currentlySelected)
    this.selected = arrDiff(this.previousSelectedLines,this.currentSelectedLines, (i1,i2)=>i1.id === i2.id)
  }

  //Get an array that includes all lines between 2 lines ids
  getLineRange(l1:number, l2:number) {
    let smaller = Math.min(this.firstSelected, this.currentlySelected)
    let bigger = Math.max(this.firstSelected, this.currentlySelected)
    return this.getCurrentlySortedArray().filter((l, i) => i >= smaller && i <= bigger)
  }

  //Boolean for template. Checks if row is selected. Applies a class if it is.
  isSelected(line:SubtitleLine) {
    return this.selected.includes(line);
  }

  /**
   *  /Row Selection Logic
  */

  getCurrentlySortedArray():SubtitleLine[]{
    return this.subListSource.sortData(this.subListSource.data,this.matSort)
  }

  onDoubleClick($event, elem:HTMLElement, sub:SubtitleLine, inputElem) {
    if(!elem.hasAttribute(this.editableAttr)){
      elem.setAttribute(this.editableAttr, "");
      // (elem.firstChild as HTMLInputElement).focus();
    }
  }

  onTextAreaFocusOut(parentElem:HTMLElement){
    this.makeNotEditable(parentElem)
  }
}
