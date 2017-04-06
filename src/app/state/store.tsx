import {createStore} from 'redux'
import {gamereducer} from './gamereducer';
import * as  actions from "./actions";

export interface GameState {
    size: number,
    spawnsLeft: number,
    tiles: any[],
    gameover: boolean,
    score: number
}

export interface AppState {
    game: GameState,
    lastGameState:GameState

}

const size = 4;

export const AppStateInit: AppState = {
    game: {
        size,
        spawnsLeft: 0,
        tiles: [],
        gameover: false,
        score: 0
    },
    lastGameState: null
}

declare const window:any;
export const store = createStore<AppState>(
    gamereducer,
    AppStateInit,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);