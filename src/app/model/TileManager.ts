import {Tile} from "./Tile";
import {MatrixSequence, Point, P, isPoint, Direction, DirectionToString} from "../state/Sequences";


export class TileManager {

    static fromMatrix(m: number[][]) {
        const s = m.length;
        const tiles: Tile[] = [];
        m.forEach((row, y) => row.forEach((v, x) => {
            if (v > 0) tiles.push(new Tile(P(x, y), v))
        }));
        return new TileManager(tiles, s);
    }

    constructor(private _tiles: Tile[], private size: number) {

    }

    hasTileAt(p: Point) {
        return this.getTileAt(p) != null;
    }

    getTileAt(p: Point) {
        return this._tiles.filter(t => t.x === p.x && t.y === p.y)[0];
    }

    add(tile: Tile) {
        this._tiles.push(tile);
    }

    getNextPosition(p: Point, direction: Direction = Direction.Right) {
        const x = p.x + ((direction == Direction.Left) ? -1 : (direction === Direction.Right ? 1 : 0));
        const y = p.y + ((direction == Direction.Top) ? -1 : (direction === Direction.Bottom ? 1 : 0));
        return this.inBound(P(x, y)) ? P(x, y) : null;
    }

    private inBound(p: Point);
    private inBound(n: number);
    private inBound(n: any) {
        if (isPoint(n)) {
            return this.inBound(n.x) && this.inBound(n.y);
        }
        if (!isNaN(n)) {
            return n >= 0 && n < this.size;
        }
        throw Error("Invalid parameter")
    }

    getNeighbour(p: Point, direction: Direction = Direction.Right) {
        const npos = this.getNextPosition(p, direction);
        return npos ? this.getTileAt(npos) : null;
    }

    getNextNeigbour(p: Point, direction: Direction = Direction.Right) {
        let npos = this.getNextPosition(p, direction);
        while (npos && !this.hasTileAt(npos)) {
            npos = this.getNextPosition(npos, direction);
        }
        return npos ? this.getTileAt(npos) : null;
    }

    reduceRow(direction: Direction = Direction.Right) {
        const dirMap = {
            [Direction.Bottom]: Direction.Top,
            [Direction.Left]: Direction.Right,
            [Direction.Right]: Direction.Left,
            [Direction.Top]: Direction.Bottom,
        }
        const oDirection = dirMap[direction];
        console.log(`${DirectionToString(direction)} -> ${DirectionToString(oDirection)}`);
        for (let p of MatrixSequence(this.size, direction)) {
            let c = this.getTileAt(p);
            let nn = this.getNextNeigbour(p, oDirection);
            if(c) {
                c.state = "CALM";
                c.oldX = null;
                c.oldY = null;
            }
            if (!c && nn) {
                nn.oldX = nn.x;
                nn.oldY = nn.y;
                nn.x = p.x;
                nn.y = p.y;
                nn.state = "MOVED";
                c = this.getTileAt(p);
                nn = this.getNextNeigbour(p, oDirection);
            }
            if (nn && c && nn.value === c.value) {
                this.merge(c, nn)
            }
        }
    }

    merge(tileA: Tile, tileB: Tile) {
        tileA.value += tileB.value;
        tileA.state = "MERGED";
        this._tiles = this._tiles.filter(t => t !== tileB);
    }

    get tiles() {
        return [...this._tiles.map(t => ({...t}))]
    }

    toMatrix() {
        return Array.from({length: this.size}, (_, y) => Array.from({length: this.size}, (_, x) => (this.getTileAt(P(x, y)) || new Tile(P(x, y), 0)).value));
    }

    toString() {
        const matrix = this.toMatrix();
        return `Matrix: ${this.size} x ${this.size}\n${matrix.map(r => r.join(' | ')).join('\n')}
        `;
    }
}