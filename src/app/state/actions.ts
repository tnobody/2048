import {store} from "./store";
const random = (min: number, max: number) => Math.floor((Math.random() * (max - min) + min));
const spawnPoint = () => ({x: random(0, 4), y: random(0, 4)});

export function MoveUp() {
    return {type: 'MOVE_UP', spawnPoints: [spawnPoint()]}
}

export function MoveLeft() {
    return {type: 'MOVE_LEFT', spawnPoints: [spawnPoint()]}
}

export function MoveRight() {
    return {type: 'MOVE_RIGHT', spawnPoints: [spawnPoint()]}
}

export function MoveDown() {
    return {type: 'MOVE_DOWN', spawnPoints: [spawnPoint()]}
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
    const spawnPoints = Array.from({length: count}, spawnPoint);
    console.log(spawnPoints)
    return ({type: 'SPAWN', spawnPoints});
}

store.subscribe(() => {
    const {spawnsLeft} = store.getState().game;
    console.log('spawns', spawnsLeft);
    if (spawnsLeft > 0) {
        store.dispatch(Spawn(spawnsLeft));
    }
})
