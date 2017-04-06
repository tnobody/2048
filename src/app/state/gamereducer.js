"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequences_1 = require("./Sequences");
const TileManager_1 = require("../model/TileManager");
const DirMap = {
    'MOVE_UP': Sequences_1.Direction.Top,
    'MOVE_RIGHT': Sequences_1.Direction.Right,
    'MOVE_DOWN': Sequences_1.Direction.Bottom,
    'MOVE_LEFT': Sequences_1.Direction.Left
};
exports.gamereducer = (state, action) => {
    const { type } = action;
    const tileManager = new TileManager_1.TileManager(state.game.tiles, state.game.size);
    switch (type) {
        case 'MOVE_UP':
        case 'MOVE_DOWN':
        case 'MOVE_LEFT':
        case 'MOVE_RIGHT': {
            const score = tileManager.reduceRow(DirMap[type]);
            return exports.gamereducer(Object.assign({}, state, { game: Object.assign({}, state.game, { tiles: tileManager.tiles, gameover: tileManager.gameOver(), score: state.game.score + score }), lastGameState: Object.assign({}, state.game, { spawnsLeft: 0 }) }), {
                type: 'SPAWN',
                spawnPoints: tileManager.didMove() ? action.spawnPoints || [] : []
            });
        }
        case 'SPAWN': {
            const { size } = state.game;
            let spawnsLeft = action.spawnPoints.length;
            action.spawnPoints.forEach(tile => {
                if (!tileManager.hasTileAt(tile)) {
                    tileManager.add(tile);
                    spawnsLeft--;
                }
                if (tileManager.tiles.length === size * size) {
                    spawnsLeft = 0;
                }
            });
            return Object.assign({}, state, { game: Object.assign({}, state.game, { spawnsLeft, tiles: tileManager.tiles }) });
        }
        case 'RESET': {
            return Object.assign({}, state, { game: Object.assign({}, state.game, { tiles: [], gameover: false, score: 0 }), lastGameState: null });
        }
        case 'Undo': {
            if (state.lastGameState) {
                return Object.assign({}, state, { game: Object.assign({}, state.lastGameState), lastGameState: null });
            }
            else {
                return state;
            }
        }
    }
    return state;
};
