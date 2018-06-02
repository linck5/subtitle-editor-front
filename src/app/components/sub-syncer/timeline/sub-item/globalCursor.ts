export namespace GlobalCursor {

    let div;

    export function setCursor(cursorType:string) {
        if(!div)
            initDiv();
        div.style.cursor = cursorType;
    }

    export function disable() {
        if(div.parentElement)
            div.parentElement.removeChild(div);
        div = null;
    }

    function initDiv(){
        div = document.createElement('div');
        document.body.appendChild(div);
        div.setAttribute('style', 'position:absolute;width:100vw;height:100vh;z-index:99;left:0;top:0');
    }
}