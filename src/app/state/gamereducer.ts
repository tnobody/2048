import {AppState} from './store';
import {Action} from 'redux';
import {Direction, P} from "./Sequences";
import {TileManager} from "../model/TileManager";
import {Tile} from "../model/Tile";

const DirMap = {
    'MOVE_UP': Direction.Top,
    'MOVE_RIGHT': Direction.Right,
    'MOVE_DOWN': Direction.Bottom,
    'MOVE_LEFT': Direction.Left
}

export const gamereducer = (state: AppState, action: Action&any): AppState => {
    const {type} = action;
    const tileManager = new TileManager(state.game.tiles, state.game.size);
    switch (type) {
        case 'MOVE_UP':
        case 'MOVE_DOWN':
        case 'MOVE_LEFT':
        case 'MOVE_RIGHT': {
            const score = tileManager.reduceRow(DirMap[type]);
            return gamereducer({
                ...state, game: {
                    ...state.game,
                    tiles: tileManager.tiles,
                    gameover: tileManager.gameOver(),
                    score: state.game.score + score
                }, lastGameState: {...state.game, spawnsLeft: 0}
            }, {
                type: 'SPAWN',
                spawnPoints: tileManager.didMove() ? action.spawnPoints || [] : []
            } as any);
        }
        case 'SPAWN': {
            const {size} = state.game;
            let spawnsLeft = action.spawnPoints.length;
            action.spawnPoints.forEach(tile => {
                if (!tileManager.hasTileAt(tile)) {
                    tileManager.add(tile)
                    spawnsLeft--;
                }
                if (tileManager.tiles.length === size * size) {
                    spawnsLeft = 0;
                }
            });
            return {...state, game: {...state.game, spawnsLeft, tiles: tileManager.tiles}}
        }
        case 'RESET': {
            return {...state, game: {...state.game, tiles: [], gameover: false, score: 0}, lastGameState: null}
        }

        case 'Undo': {
            if (state.lastGameState) {
                return {...state, game: {...state.lastGameState}, lastGameState: null}
            } else {
                return state;
            }
        }
    }
    return state;
}