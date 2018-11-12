// Handles H:MM:SS.MM Input.
// It shifts the cursor properly when inputting time 
//  ..displayed in H:MM:SS.MM format.
export function handleTimeInput(event, value:string):void {

  console.log(event.keyCode);
  if((event.keyCode >= 37 && event.keyCode <= 40) ||
      event.keyCode == 13 ||
      event.keyCode == 9){
    return;
  }

  event.preventDefault();

  if(event.keyCode == 8) { // if return key
    let stepsBack = 0;
    switch (value.charAt(event.target.selectionStart - 1)) {
      case ':':
      case '.':
        stepsBack = 2;
        break;
      case '':
        break;
      default:
        stepsBack = 1;
    }
    let cursorPos = event.target.selectionStart - stepsBack
    event.target.value = changeCharAt(event.target.value, cursorPos, '0');
    event.target.setSelectionRange(cursorPos,cursorPos, 'none')
    return;
  }

  let numbers = ['0','1','2','3','4','5','6','7','8','9']
  if(!numbers.includes(event.key))
    return;

  let cursorToNumber = [0,2,2,3,5,5,6,8,8,9,9]
  let indexWhereItChanges = cursorToNumber[event.target.selectionStart]
  event.target.value = changeCharAt(event.target.value, indexWhereItChanges, event.key)
  event.target.setSelectionRange(indexWhereItChanges + 1,indexWhereItChanges + 1, 'none')
}

export function formattedStringToMl(str:string):number {
  let noColons = str.replace(/\D+/g, "")
  let hours = parseInt(noColons.slice(0,1))
  let minutes = parseInt(noColons.slice(1,3))
  let seconds = parseInt(noColons.slice(3,5))
  let centiSeconds = parseInt(noColons.slice(5))
  return hours * 3600000 + minutes * 60000 + seconds * 1000 + centiSeconds * 10
}

function changeCharAt(str:string, pos:number, val:string):string {
  let arr = str.split('')
  arr[pos] = val;
  return arr.join('')
}