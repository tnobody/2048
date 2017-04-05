import {createStore} from 'redux'
import {gamereducer} from './gamereducer';

export interface AppState {
    game: {
        size:number,
        values: number[][]
        state:string,
        spawnsLeft:number,
        tiles:any[]
    }
}

const size = 4;
const values = [];
for(let i = 0; i < size; i++) {
    values.push([])
    for(let j = 0; j < size; j++) {
        values[i].push(0);
    }
}

export const AppStateInit:AppState = {
    game: {
        size,
        values,
        spawnsLeft:0,
        state: "IDLE",
        tiles:[]
    }
}

export const store = createStore<AppState>(
    gamereducer,
    AppStateInit
)