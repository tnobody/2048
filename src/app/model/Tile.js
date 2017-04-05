"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequences_1 = require("../state/Sequences");
const TileId = Sequences_1.IdSequence('tile-');
class Tile {
    constructor(point, value) {
        this.value = value;
        this.state = "SPAWNED";
        this.x = point.x;
        this.y = point.y;
        this.id = TileId.next().value;
    }
}
exports.Tile = Tile;
