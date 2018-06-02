import { Component, OnInit, ViewEncapsulation, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { SubListComponent } from '../sub-list/sub-list.component';
import { Player } from 'video.js';
import { TimelineComponent } from '../timeline/timeline.component';

@Component({
  selector: 'app-sub-syncer',
  templateUrl: './sub-syncer.component.html',
  styleUrls: ['./sub-syncer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubSyncerComponent implements OnInit {

  @ViewChildren(SubListComponent, { read:ElementRef })
  sublistComponents: QueryList<ElementRef>;

  @ViewChild(TimelineComponent)
  timelineComp: TimelineComponent

  ignoreScroll:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  scrollOtherList(event:Event){
    if(this.ignoreScroll){
      this.ignoreScroll = false;
      return;
    }

    for(let subList of this.sublistComponents.toArray()){
      if(subList.nativeElement != event.target){
        subList.nativeElement.scrollTop = event.target["scrollTop"];
        this.ignoreScroll = true;
      }
    }
  }

  onPlayerLoad(player:Player){
    this.timelineComp.onPlayerLoad(player);
  }

}
