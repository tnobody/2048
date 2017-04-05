"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
exports.P = (x, y) => ({ x, y });
function isPoint(p) {
    return p && p.hasOwnProperty('x') && p.hasOwnProperty('y');
}
exports.isPoint = isPoint;
const IdMap = {};
function* IdSequence(name = "common-") {
    while (true) {
        if (!IdMap[name]) {
            IdMap[name] = 0;
        }
        yield `${name}${IdMap[name]++}`;
    }
}
exports.IdSequence = IdSequence;
var Direction;
(function (Direction) {
    Direction[Direction["Top"] = 0] = "Top";
    Direction[Direction["Left"] = 1] = "Left";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["Bottom"] = 3] = "Bottom";
})(Direction = exports.Direction || (exports.Direction = {}));
exports.DirectionToString = (d) => {
    switch (d) {
        case Direction.Right: return 'right';
        case Direction.Left: return 'left';
        case Direction.Top: return 'top';
        case Direction.Bottom: return 'Bottom';
    }
};
function* MatrixSequence(size, from = Direction.Top) {
    const { Top, Left, Right, Bottom } = Direction;
    switch (from) {
        case Bottom: {
            for (let o = 0; o < size; o++) {
                for (let i = size - 1; i >= 0; i--) {
                    yield exports.P(o, i);
                }
            }
            break;
        }
        case Top: {
            for (let o = 0; o < size; o++) {
                for (let i = 0; i < size; i++) {
                    yield exports.P(o, i);
                }
            }
            break;
        }
        case Left: {
            for (let o = 0; o < size; o++) {
                for (let i = 0; i < size; i++) {
                    yield exports.P(i, o);
                }
            }
            break;
        }
        case Right: {
            for (let o = 0; o < size; o++) {
                for (let i = size - 1; i >= 0; i--) {
                    yield exports.P(i, o);
                }
            }
            break;
        }
    }
}
exports.MatrixSequence = MatrixSequence;
