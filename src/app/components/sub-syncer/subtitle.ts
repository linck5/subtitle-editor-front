export class Subtitle {
    constructor(
        public id:number,
        public startTime:number,
        public endTime:number,
        public position:Position,
        public text:string
    ){ }
}

export enum Position {
    Top, Bottom
}