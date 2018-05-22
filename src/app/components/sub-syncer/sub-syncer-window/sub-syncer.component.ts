import { Component, OnInit, ViewEncapsulation, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { SubListComponent } from '../sub-list/sub-list.component';

@Component({
  selector: 'app-sub-syncer',
  templateUrl: './sub-syncer.component.html',
  styleUrls: ['./sub-syncer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubSyncerComponent implements OnInit {

  @ViewChildren(SubListComponent, { read:ElementRef })
  sublistComponents: QueryList<ElementRef>;
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

}
