import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {

  keyDown : Subject<number> = new Subject();
  keyUp : Subject<number> = new Subject();

  private downKeys: Array<number> = []

  constructor() {
    window.addEventListener('keydown', (e:KeyboardEvent) => {
      //If the key is already on the array, it means
      // the event is repeating, so nothing will happen
      if(this.downKeys.includes(e.keyCode))
        return;
      this.downKeys.push(e.keyCode);
      this.keyDown.next(e.keyCode);
    })

    window.addEventListener('keyup', (e:KeyboardEvent) => {
      this.downKeys.splice(this.downKeys.indexOf(e.keyCode),1)
      this.keyUp.next(e.keyCode);
    })

    //if the window loses focus,
    // act as if all keys were unpressed
    window.addEventListener('blur', () => {
      //Clears downKey
      console.log('clearing keys');

      let l = this.downKeys.length
      for (let i = 0; i < l; i++) {
        let e = this.downKeys.splice(0,1)
        this.keyUp.next(e[0])
      }
    })
  }

  //May be buggy
  isDown(key:number):boolean {
    return this.downKeys.includes(key)
  }
}
