import { Component, OnInit, ViewEncapsulation, ViewChildren, QueryList, ElementRef, ViewChild, Query } from '@angular/core';
import { SubListComponent } from '../sub-list/sub-list.component';
import { Player } from 'video.js';
import { TimelineComponent } from '../timeline/timeline.component';
import { SubtitleService, SubtitleWrapper } from '../../../shared/subtitle.service';
import { MatDialog } from '@angular/material';
import { ShiftTimesComponent } from '../shift-times/shift-times.component';
import { SubtitleLine } from '../subtitle';

@Component({
  selector: 'app-sub-syncer',
  templateUrl: './sub-syncer.component.html',
  styleUrls: ['./sub-syncer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubSyncerComponent implements OnInit {

  subtitleEn:SubtitleWrapper
  subtitleJp:SubtitleWrapper

  @ViewChildren(SubListComponent, { read:ElementRef })
  sublistComponentsElRef: QueryList<ElementRef>;

  @ViewChildren(SubListComponent)
  sublistComps:QueryList<SubListComponent>;

  @ViewChild(TimelineComponent)
  timelineComp: TimelineComponent

  ignoreScroll:boolean = false;

  constructor(private subService:SubtitleService, private dialog: MatDialog) { }

  ngOnInit() {
    this.subService.getSubtitle(this.subService.treeExampleEn)
      .subscribe(sub => this.subtitleEn = sub)
    this.subService.getSubtitle(this.subService.treeExampleJp)
      .subscribe(sub => this.subtitleJp = sub)
  }

  scrollOtherList(event:Event){
    if(this.ignoreScroll){
      this.ignoreScroll = false;
      return;
    }

    for(let subList of this.sublistComponentsElRef.toArray()){
      if(subList.nativeElement != event.target){
        subList.nativeElement.scrollTop = event.target["scrollTop"];
        this.ignoreScroll = true;
      }
    }
  }

  onPlayerLoad(player:Player){
    this.timelineComp.onPlayerLoad(player);
  }

  shiftTimes(){
    let sublistComps = this.sublistComps.toArray()
    this.dialog.open(ShiftTimesComponent, {
      data: [
        {
          wrapper: sublistComps[0].subtitle,
          lines: sublistComps[0].selected
        },
        {
          wrapper: sublistComps[1].subtitle,
          lines: sublistComps[1].selected
        },
      ]
    });
  }
}
