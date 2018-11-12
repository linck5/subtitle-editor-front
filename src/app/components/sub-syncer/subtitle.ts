export class Subtitle {
    _id:number
    
    constructor(
        public lines:Array<SubtitleLine>,
        public language:string
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