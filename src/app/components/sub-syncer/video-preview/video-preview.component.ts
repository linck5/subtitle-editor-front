import { Component, OnInit, OnDestroy, AfterViewChecked, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Player } from "video.js";
import * as videoJS from "video.js";

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoPreviewComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor() { }

  videoPlayerId: string = 'video-sub-preview'
  videoJSPlayer: Player
  sampleMP4 = 'https://www.kj.com/sites/default/files/video/530262769.mp4'
  

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.videoJSPlayer = videoJS(this.videoPlayerId, { width:700, controls:true })
  }

  ngOnDestroy() {
    this.videoJSPlayer.dispose();
  }

}
