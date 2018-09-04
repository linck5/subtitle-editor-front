import { Component, OnInit, OnDestroy, AfterViewChecked, AfterViewInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Player } from "video.js";
import * as videoJS from "video.js";

declare var VTTCue: any;

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

    function addCue(track:TextTrack) {
      track.mode = 'showing'
      console.log(track.cues)
      track.addCue(new VTTCue(0, 4, "[Test]"));
      track.addCue(new VTTCue(2, 4, "dude it works"));
    }

    this.vPlayer.one('loadeddata', (e:Event) => {

      let track = this.vPlayer.addRemoteTextTrack({src: '/assets/example-captions.vtt'}, false).track

      if (!track.cues) {
        window.setTimeout(function() { addCue(track); }, 0);
      } else {
        addCue(track);
      }
    })
    

    
    
  }

  ngOnDestroy() {
    this.vPlayer.dispose();
  }

}
