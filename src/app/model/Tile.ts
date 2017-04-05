import {Point, IdSequence} from "../state/Sequences";
export type TileState = "SPAWNED"|"MERGED"|"MOVED"|"CALM"

const TileId = IdSequence('tile-');

export class Tile implements Point{
    x:number;
    y:number;
    id:string;
    constructor(
        point:Point,
        public value: number) {
        this.x = point.x;
        this.y = point.y;
        this.id = TileId.next().value;
    }
    state:TileState = "SPAWNED"
    oldX:number;
    oldY:number;
}