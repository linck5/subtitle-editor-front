export let time = {
    sec: (sec:number) => {
        return new Date(sec * 1000);
    },
    min: (min:number) => {
        return new Date(min * 60 * 1000);
    },
    ml: (ml:number) => {
        return new Date(ml);
    },
    getSec: (date:Date) => {
        return date.getTime() / 1000;
    },
    getMl: (date:Date) =>{
        return date.getTime();
    },
    isDateEq(date1:Date, date2:Date){
        return time.getMl(date1) === time.getMl(date2)
    },
    getDist(d1:Date, d2:Date) {
        return Math.abs(time.getMl(d1)-time.getMl(d2))
    }
}