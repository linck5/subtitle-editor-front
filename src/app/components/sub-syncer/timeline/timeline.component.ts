import { Component, ElementRef, ViewEncapsulation, OnInit, ViewChild, HostListener, Input, SimpleChanges } from '@angular/core';
import * as Vis from "vis";
import { TimelineTimeAxisScaleType, TimelineItem, DataSet } from "vis";
import { time } from "./../../../shared/time";
import { Player } from 'video.js';
import { SubtitleService } from "./../../../shared/subtitle.service";
import { Subtitle } from '../subtitle';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineComponent implements OnInit {

  @Input()
  subEn:Subtitle
  @Input()
  subJp:Subtitle

  title = 'app';
  timeline;

  @ViewChild("timeline")
  timelineCont;

  items:DataSet<any>;

  manipulatedItemProps;

  noSnapKey = 'Control'
  noSnapKeyPressed:boolean = false;

  constructor(private renderer:ElementRef, private subService:SubtitleService) {
    
  }

  ngOnInit() {  
    

    let groups = [
      {
        id: 1,
        // content: 'JP Subs',
        className: 'jp-group'
      },
      {
        id: 2,
        // content: 'EN Subs',
        className: 'en-group'
      }
    ]

    // Create a DataSet (allows two way data-binding)
    this.items = new DataSet([
      // {id: 1, content: 'item 1 jp', start: time.sec(10), end:time.sec(12), group: 1},
      // {id: 2, content: 'item 1 jp', start: time.sec(5), end:time.sec(7), group: 1},
      // {id: 3, content: 'item en', start: time.sec(10), end:time.sec(12), group: 2},
      // {id: 4, content: 'item 2 en', start: time.sec(60), end:time.sec(120), group: 2},
      // {id: 5, content: 'item 32 jp', start: time.sec(0), end: time.sec(2), group: 2},
      // {id: 6, content: 'item 32 jp', start: time.sec(5), end: time.sec(7), group: 2},
      // {id: 7, content: 'dec', start: time.sec(8), end: time.sec(9.5), group: 1},
      // {id: 3, content: 'item 3', start: '2013-04-18'},
      // {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
      // {id: 5, content: 'item 5', start: '2013-04-25'},
      // {id: 6, content: 'item 6', start: '2013-04-27'}
    ]);

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
      onMove: this.onMove.bind(this),
      onMoving: this.onMoving.bind(this),
      // horizontalScroll: true,
      // zoomable: false,
      format: {
        minorLabels: function(date:Date, scale: string, step: number) {
          
          let tim = date.toISOString()
          // l(`scale: ${scale} step: ${step} isostring: ${tim}`)

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
      if (changes['subEn'] && this.subEn) {
        console.log('timeline: got subtitle as input, first line en sub: ',this.subEn.lines[0].text)
        let itemArr = []
        // {id: 1, content: 'item 1 jp', start: time.sec(10), end:time.sec(12), group: 1},
        this.subEn.lines.forEach(line => {
          itemArr.push({content: line.text, start: line.startTime, end: line.endTime, group:2})          
        });
        this.items.add(itemArr)
        // this.timeline.setItems(new DataSet([{id: 1, content: 'item 1 jp', start: time.sec(10), end:time.sec(12), group: 1}]))
      }
      if (changes['subJp'] && this.subJp) {
        console.log('timeline: got subtitle as input, first line jp sub: ',this.subJp.lines[0].text)
        let itemArr = []
        // {id: 1, content: 'item 1 jp', start: time.sec(10), end:time.sec(12), group: 1},
        this.subEn.lines.forEach(line => {
          itemArr.push({content: line.text, start: line.startTime, end: line.endTime, group:1})          
        });
        this.items.add(itemArr)
      }
  }

  onSelect(properties) {
    let item = this.items.get(properties.items)[0]
    if(!item) return;

    this.manipulatedItemProps = {start: new Date(item.start), end: new Date(item.end)}

    l(`select. item: ${item.content}`)
  }

  onMove(item:TimelineItem, callback) {
    this.manipulatedItemProps = {start: item.start, end: item.end}

    this.items.update(item)
  }

  onMoving(item:TimelineItem, callback){

    l(`snap key pressed: ${this.noSnapKeyPressed}`)

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
      console.log("duration: "+player.duration()+" lol wtf did i do")

      //Temporarily disabling this so that I can see more items
      // this.timeline.setOptions({max: time.sec(player.duration()),})
    })
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