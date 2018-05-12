import { Component, OnInit, OnDestroy, AfterViewChecked, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Player } from "video.js";
import * as videoJS from "video.js";

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss']
})
export class VideoPreviewComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor() { }

  videoPlayerId: string = 'video-sub-preview'
  videoJSPlayer: Player
  sampleMP4 = 'https://www6.mp4upload.com:282/d/sgxv6ac6z3b4quuomwuu2oqqk77waxqvht3sjiapj3pjsapcoh2hut67/video.mp4'

  ngOnInit() {

  }

  ngAfterViewInit() {
    // this.videoJSPlayer = videoJS(this.videoPlayerId, { width:700, controls:true })
  }

  ngOnDestroy() {
    this.videoJSPlayer.dispose();
  }

}
