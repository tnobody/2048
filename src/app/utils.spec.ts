import {test} from 'ava';
import {leftPad} from "./utils";

test('leftPad', t => {
    t.is(leftPad(5, 8,' '), '       5')
})