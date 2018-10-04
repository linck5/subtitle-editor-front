import { Component, OnInit, OnDestroy, AfterViewChecked, AfterViewInit, ViewEncapsulation, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Player } from "video.js";
import * as videoJS from "video.js";
import { SubObserver, updateSubImpl, updateChecker } from '../../../shared/subObserver';
import { SubtitleService, SubtitleWrapper, Change, ChangeType } from '../../../shared/subtitle.service';
import { SubtitleLine, Subtitle } from '../subtitle';
import { first, publishReplay, refCount } from 'rxjs/operators';
import * as Vtt from 'vtt-creator';
import { Observable, Subject, merge, forkJoin, zip, interval } from 'rxjs';
import { text } from 'body-parser';

declare var VTTCue: any;

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoPreviewComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, SubObserver {
  
  updateOnNext:boolean = true;

  @Input()
  subEn:SubtitleWrapper
  @Input()
  subJp:SubtitleWrapper

  private subTrackReady:Subject<TextTrack> = new Subject()
  private subTrackObserver = this.subTrackReady.pipe(publishReplay(1), refCount())

  private textTrack:TextTrack

  @Output() vPlayerLoad:EventEmitter<Player> = new EventEmitter()

  constructor() {  }

  vPlayer:Player

  videoPlayerId: string = 'video-sub-preview'
  sampleMP4 = 'https://www.kj.com/sites/default/files/video/530262769.mp4'
  private idSeparator = 500000
  

  ngOnInit() {
    this.subTrackObserver.subscribe(track => this.textTrack = track)
  }

  ngOnChanges(changes: SimpleChanges) {
      var generateCaptions = (subtitle: Subtitle, track:TextTrack, group: number) => {
        track.mode = 'showing'
        for (let i = 0; i < subtitle.lines.length; i++) {
          this.addLine(subtitle.lines[i],track, group)
        }
      }

      if (changes['subEn'] && this.subEn) {
        //I use zip so that I get notified only when the track AND the subs are ready 
        let subsAndTrack = zip(this.subEn.subtitle.pipe(first()), this.subTrackObserver)
        subsAndTrack.subscribe(params =>generateCaptions(params[0], params[1], 2))
        this.subEn.changes.subscribe(this.onSubChanges(this.subEn, 2).bind(this))
      }
      if (changes['subJp'] && this.subJp) {
        let subsAndTrack = zip(this.subJp.subtitle.pipe(first()), this.subTrackObserver)
        subsAndTrack.subscribe(params =>generateCaptions(params[0], params[1], 1))
        this.subJp.changes.subscribe(this.onSubChanges(this.subJp, 1).bind(this))
      }
  }

  onSubChanges(sub:SubtitleWrapper, group:number){

    return updateChecker(this,(changes:Array<Change>) =>  {
      for (let i = 0; i < changes.length; i++) {
        const ch = changes[i];
        switch(ch.type){
          case ChangeType.New:
            this.addLine(ch.line,this.textTrack, group)
          case ChangeType.Update:
            let cue1 = this.getCue(this.getCueId(ch.line.id, group), this.textTrack)
            cue1.startTime = ch.line.startTime / 1000
            cue1.endTime = ch.line.endTime / 1000
            cue1.text = ch.line.text
            break;
          case ChangeType.Delete:
            let cue2 = this.getCue(this.getCueId(ch.line.id, group), this.textTrack)
            this.textTrack.removeCue(cue2)
            break;
        }        
      }
    })
  }

  ngAfterViewInit() {
    this.vPlayer = videoJS(this.videoPlayerId, { width:700, controls:true })
    this.vPlayerLoad.emit(this.vPlayer)

    this.vPlayer.one('loadeddata', (e:Event) => {
      let track = this.vPlayer.addRemoteTextTrack({}, false).track
      //We give the track a bit of time so it can be initialized
      this.subTrackReady.next(track)
      // setTimeout(() => this.subTrackReady.next(track), 0);
    })
  }

  updateSub(subWrapper:SubtitleWrapper, lines:Array<SubtitleLine>, changeType:ChangeType) {

  }

  ngOnDestroy() {
    this.vPlayer.dispose();
  }

  //adds sub line to textTrack
  addLine(line:SubtitleLine, textTrack:TextTrack, group:number){
    var cue = new VTTCue(line.startTime / 1000, line.endTime / 1000, line.text)
    cue.id = this.getCueId(line.id, group).toString()
    textTrack.addCue(cue);
  }

  //gets a cue from the texttrack 
  getCue(id:string, textTrack:TextTrack){
    return textTrack.cues.getCueById(id)
  }

  //Gets sub ID based on cue ID and group
  getSubId(cueId:string, group:number){
    return group === 1 ? parseInt(cueId) : parseInt(cueId) - this.idSeparator
  }

  //Gets cue ID based on group and sub id
  getCueId(subId:number, group:number) {
    return group === 1 ? subId.toString() : (subId + this.idSeparator).toString()
  }

}
