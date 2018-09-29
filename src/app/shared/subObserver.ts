import { Change, ChangeType, SubtitleWrapper } from "./subtitle.service";
import { SubtitleLine } from "../components/sub-syncer/subtitle";

export interface SubObserver {
    updateOnNext:boolean;

    updateSub(subWrapper:SubtitleWrapper, lines:Array<SubtitleLine>, changeType:ChangeType);
}

export var updateSubImpl = (comp:SubObserver, subWrapper:SubtitleWrapper, lines:Array<SubtitleLine>, changeType:ChangeType) => {
    comp.updateOnNext = false;
    subWrapper.update(lines, changeType)
}

export var updateChecker = (comp:SubObserver, callback: (changes:Array<Change>) => any) => {
    return (changes:Array<Change>) =>{
        if(!comp.updateOnNext){
            comp.updateOnNext = true;
            return;
        }
        return callback.bind(comp)(changes);
    }
}