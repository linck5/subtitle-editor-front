// Handles H:MM:SS.MM Input.
// It shifts the cursor properly when inputting time 
//  ..displayed in H:MM:SS.MM format.
export function handleTimeInput(event, value:string):void {

  event.preventDefault();

  let numbers = ['0','1','2','3','4','5','6','7','8','9']
  if(!numbers.includes(event.key))
    return;

  let cursorToNumber = [0,2,2,3,5,5,6,8,8,9]

  let indexToReplace = (cursorPos:number) => cursorToNumber[cursorPos]

  let indexWhereItChanges = indexToReplace(event.target.selectionStart)

  let newDisplayedValue = event.target.value.split("")
  newDisplayedValue[indexWhereItChanges] = event.key
  newDisplayedValue = newDisplayedValue.join('')
  event.target.value = newDisplayedValue
  event.target.setSelectionRange(indexWhereItChanges+1,indexWhereItChanges+1, 'none')
}

export function formattedStringToMl(str:string):number {
  let noColons = str.replace(/\D+/g, "")
  let hours = parseInt(noColons.slice(0,1))
  let minutes = parseInt(noColons.slice(1,3))
  let seconds = parseInt(noColons.slice(3,5))
  let centiSeconds = parseInt(noColons.slice(5))
  return hours * 3600000 + minutes * 60000 + seconds * 1000 + centiSeconds * 10
}