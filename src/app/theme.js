"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const Color = require("color");
exports.Theme = {
    background: '#151515',
    color: '#fecc00',
    basicFont: styled_components_1.css `
        color: #828282;
        font-family: courier, monospace
    `,
    emptyValue: '#151515',
    backgrounds: {
        0: Color('#151515').hex(),
        2: Color('#828282').hex(),
        4: Color('#8AEA92').hex(),
        8: Color('#80ADA0').hex(),
        16: Color('#5F5566').hex(),
        32: Color('#FECC00').hex(),
        64: Color('#151515').lighten(6 / 12).hex(),
        128: Color('#151515').lighten(7 / 12).hex(),
        256: Color('#151515').lighten(8 / 12).hex(),
        512: Color('#151515').lighten(9 / 12).hex(),
        1024: Color('#151515').lighten(10 / 12).hex(),
        2048: Color('#151515').lighten(11 / 12).hex(),
    },
    margin: 5,
    width: 400,
    height: 400,
};
