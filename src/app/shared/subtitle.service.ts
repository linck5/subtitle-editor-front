import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subtitle } from '../components/sub-syncer/subtitle';
import { publishReplay, refCount } from 'rxjs/operators';
import { ConnectableObservable, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {

  subtitleExample = 'subtitle/5b4e393ffa63a06878e26a9d';  // URL to web api
  

  constructor(private api:ApiService, private http:HttpClient) { }


  private sampleSubtitleObs:Observable<Subtitle>

  /*Get a subtitle from the server*/
  getSampleSubtitle() {

    if(!this.sampleSubtitleObs){
      this.sampleSubtitleObs = this.api.get<Subtitle>(this.subtitleExample).pipe(
        // tap(subtitle => {console.log('fetched subtitle file'); console.log(subtitle)}),
        publishReplay(),
        refCount()
      )
    }
    
    return this.sampleSubtitleObs
  }
}
