import { Component, ElementRef, ViewEncapsulation, OnInit, ViewChild, HostListener, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import * as Vis from "vis";
import { TimelineTimeAxisScaleType, TimelineItem, DataSet } from "vis";
import { time } from "./../../../shared/time";
import { Player } from 'video.js';
import { SubtitleService, SubtitleWrapper, ChangeType, Change } from "./../../../shared/subtitle.service";
import { Subtitle, SubtitleLine } from '../subtitle';
import { first } from 'rxjs/operators';
import { SubObserver, updateSubImpl, updateChecker } from '../../../shared/subObserver';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit, SubObserver {

  @Input()
  subEn:SubtitleWrapper
  @Input()
  subJp:SubtitleWrapper

  title = 'app';
  timeline;

  updateOnNext:boolean = true;

  @ViewChild("timeline")
  timelineCont;

  items:DataSet<any>;

  manipulatedItemProps;

  noSnapKey = 'Control'
  noSnapKeyPressed:boolean = false;

  //I add this number to every item on one of the groups so that all the id's are unique
  idSeparator = 50000 

  constructor(private renderer:ElementRef, private subService:SubtitleService) {}

  ngOnInit() {  
    

    let groups = [
      {id: 1,className: 'jp-group'},
      {id: 2,className: 'en-group'}
    ]

    // Create a DataSet (allows two way data-binding)
    this.items = new DataSet([]);

    let timeAxisScale:TimelineTimeAxisScaleType = 'second'

    // Configuration for the Timeline
    let options = {
      snap: null,
      editable: true,
      start:0,
      end:20000,
      type: "range",
      height: "100%",
      min: 0,
      max: time.min(300), //This will be the length of the anime episode
      zoomMax: 300000,
      zoomMin: 2246,
      stack: false,
      showMajorLabels: false,
      // multiselect: true, //NOT YET
      onAdd: this.onAdd.bind(this),
      onMove: this.onMove.bind(this),
      onMoving: this.onMoving.bind(this),
      onRemove: this.onRemove.bind(this),
      onUpdate: this.onUpdate.bind(this),
      // horizontalScroll: true,
      // zoomable: false,
      format: {
        minorLabels: function(date:Date, scale: string, step: number) {
          
          let tim = date.toISOString()

          let minutes = pad(parseInt(tim.substr(11,2)) * 60 + parseInt(tim.substr(14,2)),2);
          let seconds = pad(parseInt(tim.substr(17,2)),2);

          switch(scale){
            case 'second':
            case 'minute':
            case 'hour':
              return `${minutes}:${seconds}`
            case 'millisecond':
              return `${minutes}:${seconds}.${tim.substr(20,2)}`
          }
          

        }
      },
      // timeAxis: { scale: timeAxisScale, step: 5}
    };

    this.timeline = new Vis.Timeline(this.timelineCont.nativeElement, this.items, groups, options);

    // this is what you so when you get the anime ep length
    // timeline.setOptions({max: time.min(5)})

    this.timeline.on('select', this.onSelect.bind(this))
    
    
  }

  ngOnChanges(changes: SimpleChanges) {
      // only run when property "data" changed
      var addLinesToTimeline = (subtitle: Subtitle, group: number) => {
        let itemArr = []
        subtitle.lines.forEach(line => {
          itemArr.push({id:this.getVisId(line.id, group) , content: line.text, start: new Date(line.startTime), end: new Date(line.endTime), group:group})          
        });
        this.items.add(itemArr)
      }

      if (changes['subEn'] && this.subEn) {
        this.subEn.subtitle.pipe(first()).subscribe(sub =>addLinesToTimeline(sub, 2))
        this.subEn.changes.subscribe(this.onSubChanges(this.subEn, 2).bind(this))
      }
      if (changes['subJp'] && this.subJp) {
        this.subJp.subtitle.pipe(first()).subscribe(sub =>addLinesToTimeline(sub, 1))
        this.subJp.changes.subscribe(this.onSubChanges(this.subJp, 1).bind(this))
      }
  }

  onSubChanges(sub:SubtitleWrapper, group:number){

    return updateChecker(this,(changes:Array<Change>) =>  {
      for (let i = 0; i < changes.length; i++) {
        const ch = changes[i];
        switch(ch.type){
          case ChangeType.New:
          case ChangeType.Update:
              this.items.update({
                id:this.getVisId(ch.line.id, group),
                content:ch.line.text,
                start: new Date(ch.line.startTime),
                end: new Date(ch.line.endTime),
                group: group
              })
            break;
          case ChangeType.Delete:
              this.items.remove(this.getVisId(ch.line.id, group))
            break;
        }        
      }
    })
  }

  onSelect(properties) {
    let item = this.items.get(properties.items)[0]
    if(!item) return;

    this.manipulatedItemProps = {start: new Date(item.start), end: new Date(item.end)}
  }

  onAdd(item:TimelineItem, callback) {

    l('on add triggered')

    //Setting an ID to the new line
    let sub:SubtitleWrapper;

    if(item.group === 1){
      sub = this.subJp
    }
    else {
      sub = this.subEn
    }

    let newLineId = sub.getNewId()

    item.id = this.getVisId(newLineId, item.group as number)

    //Setting default values
    item.content = 'New line';
    item.end = time.sec(time.getSec(item.start as Date) + 1)
    // (item.end as Date).setSeconds((item.start as Date).getSeconds() + 1)

    callback(item)

    //Updating subtitle
    this.updateSub(sub, [new SubtitleLine(newLineId, time.getMl(item.start as Date), time.getMl(item.end as Date), item.content)], ChangeType.New)
  }

  onMove(item:TimelineItem, callback) {

    this.manipulatedItemProps = {start: item.start, end: item.end}

    let sub:SubtitleWrapper;

    if(item.group === 1){
      sub = this.subJp
    }
    else {
      sub = this.subEn
    }

    let line = this.getLine(item, sub.getSubtitle())[0]

    line.startTime = time.getMl(item.start as Date)
    line.endTime =  time.getMl(item.end as Date)

    this.items.update(item)

    //Updating subtitle
    this.updateSub(sub, [line], ChangeType.Update)
  }

  onUpdate(item:TimelineItem, callback) {

    l('onupdate triggered')

    callback(item)
  }

  onRemove(item:TimelineItem, callback) {

    callback(item)

    //Updating subtitle
    if(item.group === 1){
      this.updateSub(this.subJp, this.getLine(item, this.subJp.getSubtitle()),ChangeType.Delete)
    }
    else{
      this.updateSub(this.subEn, this.getLine(item, this.subEn.getSubtitle()),ChangeType.Delete)
    }
  }

  getLine(item:TimelineItem, sub:Subtitle):Array<SubtitleLine> {
    return sub.lines.filter(line => line.id === this.getSubId(item.id, item.group as number))
  }

  onMoving(item:TimelineItem, callback){

    let side:DragMode;
    if(this.noSnapKeyPressed){
      callback(item)
      return;
    }


    if(!time.isDateEq(this.manipulatedItemProps.start,item.start as Date) &&
       !time.isDateEq(this.manipulatedItemProps.end,item.end as Date)){
      //moving
      side = new CenterDrag(item)
    }
    else if(!time.isDateEq(this.manipulatedItemProps.start,item.start as Date) &&
    time.isDateEq(this.manipulatedItemProps.end,item.end as Date)){
      //dragging left side
      side = new LeftDrag(item)
    }
    else if(time.isDateEq(this.manipulatedItemProps.start,item.start as Date) &&
    !time.isDateEq(this.manipulatedItemProps.end,item.end as Date)){
      //dragging right side
      side = new RightDrag(item)
    }

    if(!side)
      return

    let visibleItems = this.timeline.getVisibleItems()

    //snap parameters
    let snapDistance = 300;

    visibleItems.forEach(itemID => {
      let otherItem = this.items.get(itemID) as any
      if(otherItem.id === item.id)
        return
      
      if(time.getDist(side.getValue(),otherItem.start) <= snapDistance){
        side.setValue(otherItem.start)
      }
      if(time.getDist(side.getValue(),otherItem.end) <= snapDistance){
        side.setValue(otherItem.end)
      }
    });
    
    callback(item)
  }

  //Gets sub ID based on vis item ID and group
  getSubId(visId:Vis.IdType, group:number){
    return group === 1 ? visId : (visId as number) - this.idSeparator
  }

  //Gets vis item ID based on group and sub id
  getVisId(subId:number, group:number) {
    return group === 1 ? subId : subId + this.idSeparator
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if(event.key === this.noSnapKey){
      this.noSnapKeyPressed = true;
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if(event.key === this.noSnapKey){
      this.noSnapKeyPressed = false;
    }
  }

  onPlayerLoad(player:Player){
    //This locks the timeline to the length of the video
    player.on('loadedmetadata', () =>{
      //Temporarily disabling this so that I can see more items
      // this.timeline.setOptions({max: time.sec(player.duration()),})
    })
  }

  updateSub(subWrapper:SubtitleWrapper, lines:Array<SubtitleLine>, changeType:ChangeType){
    updateSubImpl(this, subWrapper, lines, changeType)
  }

  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.target !== document.body || event.keyCode !== 46)
      return;

    let selections = this.timeline.getSelection()
    if(selections.length > 0)
      this.items.remove(selections)
  }

}

function l(str:string){
  console.log(str)
}

//Pads number with zeroes
function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

class DragMode {
  constructor(protected item:TimelineItem) { }

  getValue() {
    return new Date();
  }

  setValue(value) {

  }
}

class LeftDrag extends DragMode{
  setValue(value){
    this.item.start = value;
  }

  getValue() {
    return this.item.start as Date;
  }
}

class RightDrag extends DragMode{
  setValue(value){
    this.item.end = value;
  }

  getValue() {
    return this.item.end as Date;
  }
}

class CenterDrag extends DragMode{
  setValue(value){
    this.item.end = value;
  }
}