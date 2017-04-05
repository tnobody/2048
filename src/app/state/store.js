"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const gamereducer_1 = require("./gamereducer");
const size = 4;
const values = [];
for (let i = 0; i < size; i++) {
    values.push([]);
    for (let j = 0; j < size; j++) {
        values[i].push(0);
    }
}
exports.AppStateInit = {
    game: {
        size,
        values,
        spawnsLeft: 0,
        state: "IDLE",
        tiles: []
    }
};
exports.store = redux_1.createStore(gamereducer_1.gamereducer, exports.AppStateInit);
