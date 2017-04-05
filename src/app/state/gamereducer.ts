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
            tileManager.reduceRow(DirMap[type]);
            const inGame = true;
            if(inGame) {
                return gamereducer({...state, game: {...state.game, tiles:tileManager.tiles}}, {
                    type: 'SPAWN',
                    spawnPoints: action.spawnPoints || []
                } as any);
            } else {
                return {...state};
            }
        }
        case 'SPAWN': {
            const {size} = state.game;
            let spawnsLeft = action.spawnPoints.length;
            action.spawnPoints.forEach(({x,y}) => {
                if(!tileManager.hasTileAt(P(x,y))) {
                    tileManager.add(new Tile(P(x,y),2))
                    spawnsLeft--;
                }
                if(tileManager.tiles.length === size*size) {
                    spawnsLeft = 0;
                }
            });
            return {...state, game: {...state.game, spawnsLeft, tiles: tileManager.tiles}}
        }
    }
    return state;
}