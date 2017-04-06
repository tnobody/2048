"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tile_1 = require("./Tile");
const Sequences_1 = require("../state/Sequences");
class TileManager {
    constructor(_tiles, size) {
        this._tiles = _tiles;
        this.size = size;
    }
    static fromMatrix(m) {
        const s = m.length;
        const tiles = [];
        m.forEach((row, y) => row.forEach((v, x) => {
            if (v > 0)
                tiles.push(new Tile_1.Tile(Sequences_1.P(x, y), v));
        }));
        return new TileManager(tiles, s);
    }
    hasTileAt(p) {
        return this.getTileAt(p) != null;
    }
    getTileAt(p) {
        return this._tiles.filter(t => t.x === p.x && t.y === p.y)[0];
    }
    add(tile) {
        this._tiles.push(tile);
    }
    getNextPosition(p, direction = Sequences_1.Direction.Right) {
        const x = p.x + ((direction == Sequences_1.Direction.Left) ? -1 : (direction === Sequences_1.Direction.Right ? 1 : 0));
        const y = p.y + ((direction == Sequences_1.Direction.Top) ? -1 : (direction === Sequences_1.Direction.Bottom ? 1 : 0));
        return this.inBound(Sequences_1.P(x, y)) ? Sequences_1.P(x, y) : null;
    }
    inBound(n) {
        if (Sequences_1.isPoint(n)) {
            return this.inBound(n.x) && this.inBound(n.y);
        }
        if (!isNaN(n)) {
            return n >= 0 && n < this.size;
        }
        throw Error("Invalid parameter");
    }
    getNeighbour(p, direction = Sequences_1.Direction.Right) {
        const npos = this.getNextPosition(p, direction);
        return npos ? this.getTileAt(npos) : null;
    }
    getNextNeigbour(p, direction = Sequences_1.Direction.Right) {
        let npos = this.getNextPosition(p, direction);
        while (npos && !this.hasTileAt(npos)) {
            npos = this.getNextPosition(npos, direction);
        }
        return npos ? this.getTileAt(npos) : null;
    }
    reduceRow(direction = Sequences_1.Direction.Right) {
        const dirMap = {
            [Sequences_1.Direction.Bottom]: Sequences_1.Direction.Top,
            [Sequences_1.Direction.Left]: Sequences_1.Direction.Right,
            [Sequences_1.Direction.Right]: Sequences_1.Direction.Left,
            [Sequences_1.Direction.Top]: Sequences_1.Direction.Bottom,
        };
        const oDirection = dirMap[direction];
        let score = 0;
        for (let p of Sequences_1.MatrixSequence(this.size, direction)) {
            let c = this.getTileAt(p);
            let nn = this.getNextNeigbour(p, oDirection);
            if (c) {
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
                score += this.merge(nn, c);
            }
        }
        return score;
    }
    didMove() {
        return this._tiles.find(t => t.state === 'MOVED' || t.state === 'MERGED') != null;
    }
    gameOver() {
        if (this._tiles.length !== this.size * this.size) {
            return false;
        }
        else {
            for (let p of Sequences_1.MatrixSequence(this.size)) {
                const c = this.getTileAt(p);
                for (let dir of [Sequences_1.Direction.Top, Sequences_1.Direction.Bottom, Sequences_1.Direction.Left, Sequences_1.Direction.Right]) {
                    const n = this.getNeighbour(p, dir);
                    if (n && n.value === c.value) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    merge(from, into) {
        from.value += into.value;
        from.state = "MERGED";
        from.x = into.x;
        from.y = into.y;
        this._tiles = this._tiles.filter(t => t !== into);
        return from.value;
    }
    get tiles() {
        return [...this._tiles.map(t => (Object.assign({}, t)))];
    }
    toMatrix() {
        return Array.from({ length: this.size }, (_, y) => Array.from({ length: this.size }, (_, x) => (this.getTileAt(Sequences_1.P(x, y)) || new Tile_1.Tile(Sequences_1.P(x, y), 0)).value));
    }
    toString() {
        const matrix = this.toMatrix();
        return `Matrix: ${this.size} x ${this.size}\n${matrix.map(r => r.join(' | ')).join('\n')}
        `;
    }
}
exports.TileManager = TileManager;
