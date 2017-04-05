"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const random = (min, max) => Math.floor((Math.random() * (max - min) + min));
const spawnPoint = () => ({ x: random(0, 4), y: random(0, 4) });
function MoveUp() {
    return { type: 'MOVE_UP', spawnPoints: [spawnPoint()] };
}
exports.MoveUp = MoveUp;
function MoveLeft() {
    return { type: 'MOVE_LEFT', spawnPoints: [spawnPoint()] };
}
exports.MoveLeft = MoveLeft;
function MoveRight() {
    return { type: 'MOVE_RIGHT', spawnPoints: [spawnPoint()] };
}
exports.MoveRight = MoveRight;
function MoveDown() {
    return { type: 'MOVE_DOWN', spawnPoints: [spawnPoint()] };
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
    const spawnPoints = Array.from({ length: count }, spawnPoint);
    console.log(spawnPoints);
    return ({ type: 'SPAWN', spawnPoints });
}
exports.Spawn = Spawn;
store_1.store.subscribe(() => {
    const { spawnsLeft } = store_1.store.getState().game;
    console.log('spawns', spawnsLeft);
    if (spawnsLeft > 0) {
        store_1.store.dispatch(Spawn(spawnsLeft));
    }
});
