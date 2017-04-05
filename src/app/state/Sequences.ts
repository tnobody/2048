export interface Point {x:number, y:number};
export const P = (x,y) => ({x,y});
export function isPoint(p:any):p is Point {
    return p && p.hasOwnProperty('x') && p.hasOwnProperty('y');
}

const IdMap = {};
export function* IdSequence(name = "common-") {
    while(true) {
        if(!IdMap[name]) {
            IdMap[name] = 0;
        }
        yield `${name}${IdMap[name]++}`
    }
}

export enum Direction {
    Top, Left, Right, Bottom
}

export const DirectionToString = (d:Direction) => {
    switch(d) {
        case Direction.Right: return 'right';
        case Direction.Left: return 'left';
        case Direction.Top: return 'top';
        case Direction.Bottom: return 'Bottom';
    }
}

export function* MatrixSequence(size:number, from:Direction = Direction.Top) {
    const {Top, Left, Right, Bottom} = Direction;
    switch (from) {
        case Bottom: {
            for(let o = 0; o < size; o++) {
                for(let i = size-1; i >= 0; i--) {
                    yield P(o,i);
                }
            } break;
        }
        case Top: {
            for(let o = 0; o < size; o++) {
                for(let i = 0; i < size; i++) {
                    yield P(o,i);
                }
            } break;
        }
        case Left: {
            for(let o = 0; o < size; o++) {
                for(let i = 0; i < size; i++) {
                    yield P(i,o);
                }
            } break;
        }
        case Right: {
            for(let o = 0; o < size; o++) {
                for(let i = size-1; i >= 0; i--) {
                    yield P(i,o);
                }
            } break;
        }
    }
}