import { Component, OnInit } from '@angular/core';
import { Subtitle, Position } from '../subtitle';

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.scss']
})
export class SubListComponent implements OnInit {

  columnsToDisplay = ["subId","subTime","subPosition","subText"]

  subList: Array<Subtitle> = []

  private subSample = new Subtitle(1,200,300, "でも　これを見たら")
  private longSubSample = new Subtitle(1,200,300, "とりへふまけ課派氏せすゆょ模二他他差毛派。御目やヒウノモ二氏保ケムヘエアれってけ阿阿っみり。えんえ都露ないし擢鵜とりえも保手手樹りつみふりり。阿手れとよヘノルツろよは手列巣模もしね。レケツのなつろにへちゅふ列ろ氏二鵜巣御日すうゅえ。尾課へへらょりへの区留ほくなく知日日差ャヨンうささた。他個絵ハヒコエ譜留舳夜屋巣列か。素阿譜区以けたエリニンむすりめ。擢模にふむのるたたれかく舳等瀬りるく。れはゃ樹知夜こえのとふ等擢。等毛ゃめよまっちふーヨセテスそなすろすこありの。なしむ雲まけリュケヒつ。氏譜野保模区列列巣個巣都絵派舳毛ろあてねへゅまゅ。列区なつゅの等津無ホョシユオオソう鵜名名保区かみま遊差譜。")

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 40; i++) {
      this.subList.push(this.subSample)

      if(i % 5 === 0)
        this.subList.push(this.longSubSample)
    }
  }

}
