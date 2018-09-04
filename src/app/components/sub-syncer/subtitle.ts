export class Subtitle {
    _id:number

    constructor(
        public lang:string,
        public lines:Array<SubtitleLine>
    ) { }
}

export class SubtitleLine {
    constructor(
        public id: number,
        public startTime:number, //Miliseconds from start of video?
        public endTime:number, //Miliseconds from start of video?
        public text:string,
        public position:Position = Position.Bottom
    ) { }
    
}

export enum Position {
    Top="Top", Bottom="Bottom"
}