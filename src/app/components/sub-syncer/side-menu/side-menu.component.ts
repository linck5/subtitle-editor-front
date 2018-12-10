import { Component, OnInit, Input } from '@angular/core';
import { MatInput } from '@angular/material';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input()
  active:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  postTestChanges() {
    console.log('nantoo');
    
  }

}
