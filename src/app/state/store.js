"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const gamereducer_1 = require("./gamereducer");
const size = 4;
exports.AppStateInit = {
    game: {
        size,
        spawnsLeft: 0,
        tiles: [],
        gameover: false,
        score: 0
    },
    lastGameState: null
};
exports.store = redux_1.createStore(gamereducer_1.gamereducer, exports.AppStateInit, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
