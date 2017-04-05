import test from 'ava';
import {MatrixSequence, P, Direction, DirectionToString} from "./Sequences";
import {gamereducer} from "./gamereducer";
import {AppStateInit} from "./store";
import {TileManager} from "../model/TileManager";
import {Tile} from "../model/Tile";
import {Test} from "ava";
import {ContextualTest} from "ava";
import {ContextualTestContext} from "ava";

test('P', t => {
    t.deepEqual(P(2,3),{x:2, y:3});
})

test('Sequence:Bottom', t => {
    const seq = MatrixSequence(3, Direction.Bottom);
    t.deepEqual(seq.next().value, P(0,2));
    t.deepEqual(seq.next().value, P(0,1))
    t.deepEqual(seq.next().value, P(0,0))
    t.deepEqual(seq.next().value, P(1,2))
    t.deepEqual(seq.next().value, P(1,1))
    t.deepEqual(seq.next().value, P(1,0))
    t.deepEqual(seq.next().value, P(2,2))
    t.deepEqual(seq.next().value, P(2,1))
    t.deepEqual(seq.next().value, P(2,0))
});

test('Sequence:TOP', t => {
    const seq = MatrixSequence(3, Direction.Top);
    t.deepEqual(seq.next().value, P(0,0));
    t.deepEqual(seq.next().value, P(0,1));
    t.deepEqual(seq.next().value, P(0,2));
    t.deepEqual(seq.next().value, P(1,0));
    t.deepEqual(seq.next().value, P(1,1));
    t.deepEqual(seq.next().value, P(1,2))
    t.deepEqual(seq.next().value, P(2,0))
    t.deepEqual(seq.next().value, P(2,1))
    t.deepEqual(seq.next().value, P(2,2))
});

test('Sequence:LEFT', t => {
    const seq = MatrixSequence(3, Direction.Left);
    t.deepEqual(seq.next().value, P(0,0));
    t.deepEqual(seq.next().value, P(1,0));
    t.deepEqual(seq.next().value, P(2,0));
    t.deepEqual(seq.next().value, P(0,1));
    t.deepEqual(seq.next().value, P(1,1));
    t.deepEqual(seq.next().value, P(2,1));
    t.deepEqual(seq.next().value, P(0,2));
    t.deepEqual(seq.next().value, P(1,2));
    t.deepEqual(seq.next().value, P(2,2));
});

test('Sequence:RIGHT', t => {
    const seq = MatrixSequence(3, Direction.Right);
    t.deepEqual(seq.next().value, P(2,0));
    t.deepEqual(seq.next().value, P(1,0));
    t.deepEqual(seq.next().value, P(0,0));
    t.deepEqual(seq.next().value, P(2,1));
    t.deepEqual(seq.next().value, P(1,1));
    t.deepEqual(seq.next().value, P(0,1));
    t.deepEqual(seq.next().value, P(2,2));
    t.deepEqual(seq.next().value, P(1,2));
    t.deepEqual(seq.next().value, P(0,2));
});

test('TileManager:getTileAt', t => {
    const tm = new TileManager([
        new Tile(P(1,1), 2),
        new Tile(P(2,1), 2),
        new Tile(P(1,2), 2),
    ], 4);
    t.truthy(tm.getTileAt(P(1,1)));
    t.truthy(tm.getTileAt(P(2,1)))
    t.truthy(tm.getTileAt(P(1,2)))
    t.falsy(tm.getTileAt(P(0,2)))
    t.falsy(tm.getTileAt(P(2,0)))
    t.falsy(tm.getTileAt(P(2,2)))

    t.deepEqual(tm.getNextNeigbour(P(3,2), Direction.Left), new Tile(P(1,2),2));
});


test('TileManager:getNextNeighbour', t => {
     const tm = TileManager.fromMatrix([
        [0,4,0,0],
        [0,2,2,0],
        [0,2,0,0],
        [0,0,0,0]
    ])

    t.deepEqual(tm.getNextNeigbour(P(3,0), Direction.Left), new Tile(P(1,0), 4))
    t.deepEqual(tm.getNextNeigbour(P(3,2), Direction.Left), new Tile(P(1,2),2));
    t.deepEqual(tm.getNextNeigbour(P(2,3), Direction.Top), new Tile(P(2,1),2));
    t.falsy(tm.getNeighbour(P(1,3), Direction.Left));
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

function ReducerMacro(t:ContextualTestContext, dir:Direction, input:number[][], expected:number[][]) {
    const tm = TileManager.fromMatrix(input);
    console.log(`Input`, tm.toString());
    console.log(`Move: ${DirectionToString(dir)}`);
    tm.reduceRow(dir);
    t.deepEqual(tm.toMatrix(),expected);

}

test('Reduce', ReducerMacro, Direction.Bottom,
    [
        [0,0,0,0],
        [0,0,0,4],
        [0,0,0,2],
        [0,2,0,0],
    ],[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,4],
        [0,2,0,2],
    ],

)

test('Reduce', ReducerMacro, Direction.Bottom,
    [
        [0,0,0,2],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,2,4],
    ],[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,2],
        [0,0,2,4],
    ],

)