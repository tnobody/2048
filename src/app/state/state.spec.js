"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const Sequences_1 = require("./Sequences");
const TileManager_1 = require("../model/TileManager");
const Tile_1 = require("../model/Tile");
ava_1.default('P', t => {
    t.deepEqual(Sequences_1.P(2, 3), { x: 2, y: 3 });
});
ava_1.default('Sequence:Bottom', t => {
    const seq = Sequences_1.MatrixSequence(3, Sequences_1.Direction.Bottom);
    t.deepEqual(seq.next().value, Sequences_1.P(0, 2));
    t.deepEqual(seq.next().value, Sequences_1.P(0, 1));
    t.deepEqual(seq.next().value, Sequences_1.P(0, 0));
    t.deepEqual(seq.next().value, Sequences_1.P(1, 2));
    t.deepEqual(seq.next().value, Sequences_1.P(1, 1));
    t.deepEqual(seq.next().value, Sequences_1.P(1, 0));
    t.deepEqual(seq.next().value, Sequences_1.P(2, 2));
    t.deepEqual(seq.next().value, Sequences_1.P(2, 1));
    t.deepEqual(seq.next().value, Sequences_1.P(2, 0));
});
ava_1.default('Sequence:TOP', t => {
    const seq = Sequences_1.MatrixSequence(3, Sequences_1.Direction.Top);
    t.deepEqual(seq.next().value, Sequences_1.P(0, 0));
    t.deepEqual(seq.next().value, Sequences_1.P(0, 1));
    t.deepEqual(seq.next().value, Sequences_1.P(0, 2));
    t.deepEqual(seq.next().value, Sequences_1.P(1, 0));
    t.deepEqual(seq.next().value, Sequences_1.P(1, 1));
    t.deepEqual(seq.next().value, Sequences_1.P(1, 2));
    t.deepEqual(seq.next().value, Sequences_1.P(2, 0));
    t.deepEqual(seq.next().value, Sequences_1.P(2, 1));
    t.deepEqual(seq.next().value, Sequences_1.P(2, 2));
});
ava_1.default('Sequence:LEFT', t => {
    const seq = Sequences_1.MatrixSequence(3, Sequences_1.Direction.Left);
    t.deepEqual(seq.next().value, Sequences_1.P(0, 0));
    t.deepEqual(seq.next().value, Sequences_1.P(1, 0));
    t.deepEqual(seq.next().value, Sequences_1.P(2, 0));
    t.deepEqual(seq.next().value, Sequences_1.P(0, 1));
    t.deepEqual(seq.next().value, Sequences_1.P(1, 1));
    t.deepEqual(seq.next().value, Sequences_1.P(2, 1));
    t.deepEqual(seq.next().value, Sequences_1.P(0, 2));
    t.deepEqual(seq.next().value, Sequences_1.P(1, 2));
    t.deepEqual(seq.next().value, Sequences_1.P(2, 2));
});
ava_1.default('Sequence:RIGHT', t => {
    const seq = Sequences_1.MatrixSequence(3, Sequences_1.Direction.Right);
    t.deepEqual(seq.next().value, Sequences_1.P(2, 0));
    t.deepEqual(seq.next().value, Sequences_1.P(1, 0));
    t.deepEqual(seq.next().value, Sequences_1.P(0, 0));
    t.deepEqual(seq.next().value, Sequences_1.P(2, 1));
    t.deepEqual(seq.next().value, Sequences_1.P(1, 1));
    t.deepEqual(seq.next().value, Sequences_1.P(0, 1));
    t.deepEqual(seq.next().value, Sequences_1.P(2, 2));
    t.deepEqual(seq.next().value, Sequences_1.P(1, 2));
    t.deepEqual(seq.next().value, Sequences_1.P(0, 2));
});
ava_1.default('TileManager:getTileAt', t => {
    const tm = new TileManager_1.TileManager([
        new Tile_1.Tile(Sequences_1.P(1, 1), 2),
        new Tile_1.Tile(Sequences_1.P(2, 1), 2),
        new Tile_1.Tile(Sequences_1.P(1, 2), 2),
    ], 4);
    t.truthy(tm.getTileAt(Sequences_1.P(1, 1)));
    t.truthy(tm.getTileAt(Sequences_1.P(2, 1)));
    t.truthy(tm.getTileAt(Sequences_1.P(1, 2)));
    t.falsy(tm.getTileAt(Sequences_1.P(0, 2)));
    t.falsy(tm.getTileAt(Sequences_1.P(2, 0)));
    t.falsy(tm.getTileAt(Sequences_1.P(2, 2)));
    t.deepEqual(tm.getNextNeigbour(Sequences_1.P(3, 2), Sequences_1.Direction.Left), new Tile_1.Tile(Sequences_1.P(1, 2), 2));
});
ava_1.default('TileManager:getNextNeighbour', t => {
    const tm = TileManager_1.TileManager.fromMatrix([
        [0, 4, 0, 0],
        [0, 2, 2, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0]
    ]);
    t.deepEqual(tm.getNextNeigbour(Sequences_1.P(3, 0), Sequences_1.Direction.Left), new Tile_1.Tile(Sequences_1.P(1, 0), 4));
    t.deepEqual(tm.getNextNeigbour(Sequences_1.P(3, 2), Sequences_1.Direction.Left), new Tile_1.Tile(Sequences_1.P(1, 2), 2));
    t.deepEqual(tm.getNextNeigbour(Sequences_1.P(2, 3), Sequences_1.Direction.Top), new Tile_1.Tile(Sequences_1.P(2, 1), 2));
    t.falsy(tm.getNeighbour(Sequences_1.P(1, 3), Sequences_1.Direction.Left));
});
/*
test('TileManager:reduceRow 1', t => {
    const tm = new TileManager([
        new Tile(P(1,0), 4),
        new Tile(P(1,3), 4),
        new Tile(P(1,1), 2),
        new Tile(P(2,1), 2),
        new Tile(P(1,2), 2),
    ], 4);
    console.log('Before', tm.toString());
    tm.reduceRow(Direction.Right);
    console.log('After', tm.toString());
    console.log(tm.tiles);
});
*/
function ReducerMacro(t, dir, input, expected) {
    const tm = TileManager_1.TileManager.fromMatrix(input);
    console.log(`Input`, tm.toString());
    console.log(`Move: ${Sequences_1.DirectionToString(dir)}`);
    tm.reduceRow(dir);
    t.deepEqual(tm.toMatrix(), expected);
}
ava_1.default('Reduce', ReducerMacro, Sequences_1.Direction.Bottom, [
    [0, 0, 0, 0],
    [0, 0, 0, 4],
    [0, 0, 0, 2],
    [0, 2, 0, 0],
], [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 4],
    [0, 2, 0, 2],
]);
ava_1.default('Reduce', ReducerMacro, Sequences_1.Direction.Bottom, [
    [0, 0, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 2, 4],
], [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 0, 2, 4],
]);
