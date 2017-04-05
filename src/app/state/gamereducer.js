"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequences_1 = require("./Sequences");
const TileManager_1 = require("../model/TileManager");
const Tile_1 = require("../model/Tile");
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
            tileManager.reduceRow(DirMap[type]);
            const inGame = true;
            if (inGame) {
                return exports.gamereducer(Object.assign({}, state, { game: Object.assign({}, state.game, { tiles: tileManager.tiles }) }), {
                    type: 'SPAWN',
                    spawnPoints: action.spawnPoints || []
                });
            }
            else {
                return Object.assign({}, state);
            }
        }
        case 'SPAWN': {
            const { size } = state.game;
            let spawnsLeft = action.spawnPoints.length;
            action.spawnPoints.forEach(({ x, y }) => {
                if (!tileManager.hasTileAt(Sequences_1.P(x, y))) {
                    tileManager.add(new Tile_1.Tile(Sequences_1.P(x, y), 2));
                    spawnsLeft--;
                }
                if (tileManager.tiles.length === size * size) {
                    spawnsLeft = 0;
                }
            });
            return Object.assign({}, state, { game: Object.assign({}, state.game, { spawnsLeft, tiles: tileManager.tiles }) });
        }
    }
    return state;
};
