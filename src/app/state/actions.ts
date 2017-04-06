import {store} from "./store";
import {Tile} from "../model/Tile";
import {P} from "./Sequences";
const random = (min: number, max: number) => Math.floor((Math.random() * (max - min) + min));
const randomValue = () => {
    const distribution = [...Array.from({length:7}, _ => 2), ...Array.from({length:3}, _ => 4)];
    return distribution[random(0,9)];
}
const RandowmTile = () => new Tile(P(random(0, 4), random(0, 4)), randomValue());

export function MoveUp() {
    return {type: 'MOVE_UP', spawnPoints: [RandowmTile()]}
}

export function MoveLeft() {
    return {type: 'MOVE_LEFT', spawnPoints: [RandowmTile()]}
}

export function MoveRight() {
    return {type: 'MOVE_RIGHT', spawnPoints: [RandowmTile()]}
}

export function MoveDown() {
    return {type: 'MOVE_DOWN', spawnPoints: [RandowmTile()]}
}

export function MoveByKeyboardCode(which: number) {
    const keyMap = {
        37: MoveLeft,
        38: MoveUp,
        39: MoveRight,
        40: MoveDown
    }
    if(keyMap[which]) {
        return keyMap[which]();
    } else {
        console.warn(`${which} is not a move`);
        return {type:'NOTHING'}
    }

}

export function Spawn(count: number = 2) {
    const spawnPoints = Array.from({length: count}, RandowmTile);
    console.log(spawnPoints)
    return ({type: 'SPAWN', spawnPoints});
}

export function Reset() {
    return {type:'RESET'}
}

export function Undo() {
    return {type:'Undo'}
}

store.subscribe(() => {
    const {spawnsLeft} = store.getState().game;
    console.log('spawns', spawnsLeft);
    if (spawnsLeft > 0) {
        store.dispatch(Spawn(spawnsLeft));
    }
})


