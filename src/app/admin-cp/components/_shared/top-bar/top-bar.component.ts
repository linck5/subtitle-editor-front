import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  public navLinks:Object[] = [
    {path: "users", label: "Users"},
    {path: "branches", label: "Branches"},
    {path: "subtitles", label: "Subtitles"},
    {path: "videos", label: "Videos"}
  ];

  constructor() { }

  ngOnInit() {
  }

}
