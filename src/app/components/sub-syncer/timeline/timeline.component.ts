import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @ViewChild("timelineCont", { read:ElementRef })
  timelineContElem: ElementRef;

  scrollSpeed = 100;
  subPlaceholders = new Array<number>();

  constructor(private elRef:ElementRef) { }

  ngOnInit() {
    for (let i = 0; i < 30; i++) {
      this.subPlaceholders.push(2);
    }
  }

  
  // @HostListener('mousewheel', ['$event'])
  // @HostListener('DOMMouseScroll', ['$event'])
  scrollHorizontally(event:MouseWheelEvent){
    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    this.timelineContElem.nativeElement.scrollLeft -= (delta*this.scrollSpeed); // Multiplied by 40
    console.log("lol")
    event.preventDefault();
  }

}
