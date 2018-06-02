import { Component, OnInit, OnDestroy, AfterViewChecked, AfterViewInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Player } from "video.js";
import * as videoJS from "video.js";

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoPreviewComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() vPlayerLoad:EventEmitter<Player> = new EventEmitter()

  constructor() { }

  vPlayer:Player

  videoPlayerId: string = 'video-sub-preview'
  sampleMP4 = 'https://www.kj.com/sites/default/files/video/530262769.mp4'
  

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.vPlayer = videoJS(this.videoPlayerId, { width:700, controls:true })
    this.vPlayerLoad.emit(this.vPlayer)
  }

  ngOnDestroy() {
    this.vPlayer.dispose();
  }

}
