import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subtitle, SubtitleLine } from '../components/sub-syncer/subtitle';
import { publishReplay, refCount, mergeMap, map, filter } from 'rxjs/operators';
import { ConnectableObservable, Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { copyObj } from '@angular/animations/browser/src/util';

class Tree {
  _id:number
  creation:Date
  language:string
  description:string
  video_id:string
  subtitle_id:string
}

export enum ChangeType {
  New, Update, Delete
}

export class Change {
  constructor(
    public type:ChangeType,
    public line:SubtitleLine
  ) {}
}

export enum SubLang{
  English, Japanese
}

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {

  private subtitleExample = 'subtitle/5b4e393ffa63a06878e26a9d';  // URL to web api

  treeExampleEn = '5b9057dfd4c0f3f97ca13d78'
  treeExampleJp = '5b905811d4c0f3f97ca13d7b'

  private subtitles: Array<SubtitleWrapper> = []

  constructor(private api:ApiService) {  }

  //Get subtitle from tree id. Adds subtitle wrapper obj to this.subtitles if it's not there already
  getSubtitle(tree:string){
    return this.api.get<Tree>(`tree/${tree}`).pipe(
      publishReplay(),
      refCount(),
      map(tree => this.getSubFromId(tree.subtitle_id))
    )
  }

  //Get subtitle from sub id. Adds sub wrapper to this.subtitles if it's not there already
  private getSubFromId(subId:string) {
    let sub = this.subtitles.find(sub => sub.id === subId)
    if(!sub) {
      sub = new SubtitleWrapper(subId, this.api)
      this.subtitles.push(sub)
    }
    return sub;
  }
}

export class SubtitleWrapper {

  private subtitleSource = new BehaviorSubject(null)
  subtitle = this.subtitleSource.asObservable().pipe(filter(sub=> sub!=null))
  changes = new Subject<Array<Change>>()

  constructor(public id:string, private api:ApiService) {

    this.api.get<Subtitle>(`subtitle/${this.id}`).pipe(
      publishReplay(),
      refCount(),
    ).subscribe(sub => this.subtitleSource.next(cloneObject(sub)))
  }

  //Updates the source, and notifies observers of changes
  update(lines:Array<SubtitleLine>, type:ChangeType) {

    //If subtitleObs's last value is null, return error
    if(!this.subtitleSource.getValue())
      throw new Error()

    //Updating source

    //Copying source object
    let newObj = cloneObject(this.subtitleSource.getValue())

    lines.forEach(line => {
      switch(type){
        case ChangeType.New:
          newObj.lines.push(line)
        break;
        case ChangeType.Update:
          newObj.lines.forEach(function(part, i, arr) {
            if(arr[i].id === line.id)
              arr[i] = line
          });
        break;
        case ChangeType.Delete:
          let newArr = newObj.lines.filter((oldLine) => oldLine.id !== line.id)
          newObj.lines = newArr
        break;
      }        
    });

    //Updating source
    this.subtitleSource.next(newObj)
    //Pushing changes
    this.changes.next(lines.map(line => new Change(type, line)))
  }
}

function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}