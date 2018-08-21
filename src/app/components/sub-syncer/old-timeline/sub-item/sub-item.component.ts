import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { GlobalCursor } from './globalCursor';

enum ResizeDirection {Left, Right}

@Component({
  selector: 'app-sub-item',
  templateUrl: './sub-item.component.html',
  styleUrls: ['./sub-item.component.scss']
})
export class SubItemComponent implements OnInit {

  ResizeDirection: typeof ResizeDirection = ResizeDirection
  
  isDragging:boolean = false;

  constructor(private elRef:ElementRef, private render:Renderer2) { }

  ngOnInit() {
  }

  @HostListener('mousedown', ['$event'])
  drag(event:MouseEvent){

    event.preventDefault();

    if(this.isDragging)
      return;

    GlobalCursor.setCursor('grabbing');

    console.log('on mouse click (moving)')

    this.render.addClass(this.elRef.nativeElement,'dragging');

    let subElem = this.elRef.nativeElement
    let parentElem = subElem.parentElement

    var subRef = this;

    let shiftX = event.clientX - subElem.getBoundingClientRect().left;
    // shiftY not needed, the thumb moves only horizontally

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      console.log('on mouse move (moving)')
      let newLeft = event.clientX - shiftX - parentElem.getBoundingClientRect().left;

      // the pointer is out of slider => lock the thumb within the bounaries
      if (newLeft < 0) {
        newLeft = 0;
      }
      let rightEdge = parentElem.offsetWidth - subElem;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      subElem.style.left = newLeft + 'px';
    }

    function onMouseUp() {
      console.log('on mouse up (moving)')
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      GlobalCursor.disable();
      subRef.render.removeClass(subRef.elRef.nativeElement,'dragging');
    }
  }


  @HostListener('dragstart', ['$event'])  
  cancelDefaultDrag(event:Event){
    console.log("canceling lol")
    return false;
  }

  
  
  resizing(event:MouseEvent, direction:ResizeDirection){

    this.isDragging = true;    

    if(direction === ResizeDirection.Left)
      console.log('resizing left side lol!')
    else if(direction === ResizeDirection.Right)
      console.log('resizing right side lol!')

    GlobalCursor.setCursor('w-resize');

    let subElem = this.elRef.nativeElement
    let parentElem = subElem.parentElement
    let subComp = this;

    let elemLeft = subElem.getBoundingClientRect().left;
    console.log('old left: '+ elemLeft)

    let elemWidth = subElem.clientWidth;
    console.log('elem width: '+ elemWidth)

    let shiftX = event.clientX - elemLeft;

    //test
    subElem.style.width = - ( elemLeft + (parentElem.offsetLeft - elemLeft ) ) + elemWidth + 'px';

    document.addEventListener('mousemove', onDragMouseMove);
    document.addEventListener('mouseup', onDragMouseUp);

    function onDragMouseMove(e) {      

      console.log('on dragmouse (dragging)')

      let newLeft = e.clientX - shiftX - parentElem.getBoundingClientRect().left;
      console.log('new left: '+ newLeft)

      // let newWidth = e.clientX - shiftX - parentElem.getBoundingClientRect().left;

      // let newLeft = event.clientX - shiftX - parentElem.getBoundingClientRect().left;

      // the pointer is out of slider => lock the thumb within the bounaries
      // if (newLeft < 0) {
      //   newLeft = 0;
      // }
      // let rightEdge = parentElem.offsetWidth - subElem;
      // if (newLeft > rightEdge) {
      //   newLeft = rightEdge;
      // }

      if(direction === ResizeDirection.Left){
        subElem.style.left = newLeft + 'px';
        subElem.style.width = - ( subElem.getBoundingClientRect().left + (parentElem.offsetLeft - elemLeft ) ) + elemWidth + 'px';
      }
      else
        subElem.style.width = (e.pageX - parentElem.offsetLeft - elemLeft)  + 'px';

      // console.log("new left:" + newLeft)
      // subElem.style.left = newLeft + 'px';

      // subComp.render.setStyle(subElem, 'left', offsetRight);
      // subElem.css('right', offsetRight);
      // subElem.css('width', offsetRight);
    }

    function onDragMouseUp() {
      console.log('on dragmouseup (dragging)')
      document.removeEventListener('mouseup', onDragMouseUp);
      document.removeEventListener('mousemove', onDragMouseMove);
      GlobalCursor.disable();
      subComp.isDragging = false;
    }
  }


}
