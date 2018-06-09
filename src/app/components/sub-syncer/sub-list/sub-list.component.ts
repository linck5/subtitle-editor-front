import { Component, OnInit, Input } from '@angular/core';
import { Subtitle, Position } from '../subtitle';
import { MatTableDataSource } from '@angular/material';

const positions = Object.keys(Position);

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.scss']
})
export class SubListComponent implements OnInit {

  @Input()
  sampleListId:number

  emptyDataSource = new MatTableDataSource<Element>(null);

  columnsToDisplay = ["subId","subTime","subPosition","subText"]

  subList: Array<Subtitle> = []

  constructor() { }

  ngOnInit() {
    this.genList(this.sampleListId);
  }

  private genList(listId:number){

    let shortSample:string;
    let longSample:string;

    switch(listId){
      case 1:
        shortSample = "でも　これを見たら";
        longSample = "とりへふまけ課派氏せすゆょ模二他他差毛派。御目やヒウノモ二氏保ケムヘエアれってけ阿阿っみり。えんえ都露ないし擢鵜とりえも保手手樹りつみふりり。阿手れとよヘノルツろよは手列巣模もしね。レケツのなつろにへちゅふ列ろ氏二鵜巣御日すうゅえ。尾課へへらょりへの区留ほくなく知日日差ャヨンうささた。他個絵ハヒコエ譜留舳夜屋巣列か。素阿譜区以けたエリニンむすりめ。擢模にふむのるたたれかく舳等瀬りるく。れはゃ樹知夜こえのとふ等擢。等毛ゃめよまっちふーヨセテスそなすろすこありの。なしむ雲まけリュケヒつ。氏譜野保模区列列巣個巣都絵派舳毛ろあてねへゅまゅ。列区なつゅの等津無ホョシユオオソう鵜名名保区かみま遊差譜。";
        break;
      case 2:
        shortSample = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        longSample = "Fusce sed urna in mauris ultricies sodales. Maecenas viverra ornare eros posuere ultricies. Ut efficitur eros et faucibus elementum. Vivamus non volutpat quam.";
      break;
    }

    for (let i = 0; i < 10; i++) {
      this.subList.push(new Subtitle(1,200,300, shortSample))

      if(Math.floor((Math.random() * 5) + 1) === 1)
        this.subList.push(new Subtitle(1,200,300, longSample))
    }
  }

  private getPositions() {
    return positions
  }

}
