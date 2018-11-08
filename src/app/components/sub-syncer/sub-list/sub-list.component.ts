import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit, OnChanges, HostListener } from '@angular/core';
import { Subtitle, SubtitleLine, Position } from '../subtitle';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SubtitleService, SubtitleWrapper, Change, ChangeType } from '../../../shared/subtitle.service';
import { first } from 'rxjs/operators';
import { SubObserver, updateSubImpl, updateChecker } from '../../../shared/subObserver';
import { cloneObject, arrDiff } from '../../../shared/miscUtils';
import { KeyboardService } from 'src/app/shared/keyboard.service';

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

  private selected:SubtitleLine[] = []

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
      line.startTime = this.formattedStringToMl(value)
    else
      line.endTime = this.formattedStringToMl(value)

    this.makeNotEditable(parentElem);

    this.cd.detectChanges();
  }

  makeNotEditable(elem:HTMLElement){
    elem.removeAttribute(this.editableAttr)
  }

  timesChanged(event, subID:number, isStartTime:boolean, value:string){

    event.preventDefault();

    let numbers = ['0','1','2','3','4','5','6','7','8','9']
    if(!numbers.includes(event.key))
      return;

    let cursorToNumber = [0,2,2,3,5,5,6,8,8,9]

    let indexToReplace = (cursorPos:number) => cursorToNumber[cursorPos]

    let indexWhereItChanges = indexToReplace(event.target.selectionStart)

    let newDisplayedValue = event.target.value.split("")
    newDisplayedValue[indexWhereItChanges] = event.key
    newDisplayedValue = newDisplayedValue.join('')
    let result = this.formattedStringToMl(newDisplayedValue)
    event.target.value = newDisplayedValue

    let line = cloneObject(this.subListSource.data.find(line => line.id === subID))
    if(isStartTime)
      line.startTime = result
    else
      line.endTime = result
    this.updateSub(this.subtitle,[line], ChangeType.Update)
    event.target.setSelectionRange(indexWhereItChanges+1,indexWhereItChanges+1, 'none')
  }

  private formattedStringToMl(str:string) {
    let noColons = str.replace(/\D+/g, "")
    let hours = parseInt(noColons.slice(0,1))
    let minutes = parseInt(noColons.slice(1,3))
    let seconds = parseInt(noColons.slice(3,5))
    let centiSeconds = parseInt(noColons.slice(5))
    return hours * 3600000 + minutes * 60000 + seconds * 1000 + centiSeconds * 10
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
  private firstSelected:number;
  private currentlySelected:number;
  private previousSelectedLines:SubtitleLine[] = [];
  private currentSelectedLines:SubtitleLine[] = [];

  mouseDown(e:MouseEvent, line:SubtitleLine) {
    if(!e.ctrlKey)
      this.previousSelectedLines = []

    console.log('clicked. ctrl pressed: ',e.ctrlKey);
    

    this.isMouseDown = true;
    this.firstSelected = this.currentlySelected = this.getCurrentlySortedArray().indexOf(line)
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
    let smaller = Math.min(this.firstSelected, this.currentlySelected)
    let bigger = Math.max(this.firstSelected, this.currentlySelected)
    this.currentSelectedLines = this.getCurrentlySortedArray().filter((l, i) => i >= smaller && i <= bigger)

    // this.getCurrentlySortedArray().filter((l, i) => i >= smaller && i <= bigger)

    this.selected = arrDiff(this.previousSelectedLines,this.currentSelectedLines, (i1,i2)=>i1.id === i2.id)
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
