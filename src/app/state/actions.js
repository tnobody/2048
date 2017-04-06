"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const Tile_1 = require("../model/Tile");
const Sequences_1 = require("./Sequences");
const random = (min, max) => Math.floor((Math.random() * (max - min) + min));
const randomValue = () => {
    const distribution = [...Array.from({ length: 7 }, _ => 2), ...Array.from({ length: 3 }, _ => 4)];
    return distribution[random(0, 9)];
};
const RandowmTile = () => new Tile_1.Tile(Sequences_1.P(random(0, 4), random(0, 4)), randomValue());
function MoveUp() {
    return { type: 'MOVE_UP', spawnPoints: [RandowmTile()] };
}
exports.MoveUp = MoveUp;
function MoveLeft() {
    return { type: 'MOVE_LEFT', spawnPoints: [RandowmTile()] };
}
exports.MoveLeft = MoveLeft;
function MoveRight() {
    return { type: 'MOVE_RIGHT', spawnPoints: [RandowmTile()] };
}
exports.MoveRight = MoveRight;
function MoveDown() {
    return { type: 'MOVE_DOWN', spawnPoints: [RandowmTile()] };
}
exports.MoveDown = MoveDown;
function MoveByKeyboardCode(which) {
    const keyMap = {
        37: MoveLeft,
        38: MoveUp,
        39: MoveRight,
        40: MoveDown
    };
    if (keyMap[which]) {
        return keyMap[which]();
    }
    else {
        console.warn(`${which} is not a move`);
        return { type: 'NOTHING' };
    }
}
exports.MoveByKeyboardCode = MoveByKeyboardCode;
function Spawn(count = 2) {
    const spawnPoints = Array.from({ length: count }, RandowmTile);
    console.log(spawnPoints);
    return ({ type: 'SPAWN', spawnPoints });
}
exports.Spawn = Spawn;
function Reset() {
    return { type: 'RESET' };
}
exports.Reset = Reset;
function Undo() {
    return { type: 'Undo' };
}
exports.Undo = Undo;
store_1.store.subscribe(() => {
    const { spawnsLeft } = store_1.store.getState().game;
    console.log('spawns', spawnsLeft);
    if (spawnsLeft > 0) {
        store_1.store.dispatch(Spawn(spawnsLeft));
    }
});
