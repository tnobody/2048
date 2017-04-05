"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const styled_components_2 = require("styled-components");
const styled_components_3 = require("styled-components");
const Sequences_1 = require("../state/Sequences");
const react_motion_1 = require("react-motion");
const leftPad = (s, padding, padder = '0') => {
    const l = s.length;
    for (let i = 0; i < padding - l; i++) {
        s = `${padder}${s}`;
    }
    return s;
};
const popout = styled_components_2.keyframes `
    0% {
        transform: scale(0,0);
    }
    
    90% {
        transform: scale(1.1,1.1);
    }
    
    100% {
        transform: scale(1,1);
    }
`;
const move = (from, to) => styled_components_2.keyframes `
    from {
        transform: translate(${from.x}px, ${from.y}px)
    }
    to {
        transform: translate(${to.x}px, ${to.y}px)
    }
`;
const StateStyles = {
    "_SPAWNED": (t) => styled_components_3.css `
        animation: ${popout} .35s linear 1;
    `,
    "MOVED": (t) => styled_components_3.css `
        animation: ${move(Sequences_1.P((t.theme.width / 4) * t.tile.x, (t.theme.height / 4) * t.tile.y), Sequences_1.P((t.theme.width / 4) * t.tile.x, (t.theme.height / 4) * t.tile.y))} .5s linear 1;
    `
};
function getStyle(byState, p) {
    const fn = StateStyles[byState];
    if (fn) {
        return fn(p);
    }
    return '';
}
exports.Value = styled_components_1.default((p) => {
    const v = leftPad(p.tile.value.toString(2), 16);
    const vparts = [];
    for (let i = 0; i < v.length; i += 4) {
        vparts.push(v.substring(i, i + 4));
    }
    //const valueOut = vparts.map((v,i) => <div key={i}>{v}</div>)
    const valueOut = p.tile.value;
    const springOPts = { stiffness: 300, damping: 40 };
    return (React.createElement(react_motion_1.Motion, { style: { x: react_motion_1.spring((400 / 4) * p.tile.x), y: react_motion_1.spring((400 / 4) * p.tile.y) } }, ({ x, y }) => (React.createElement("div", { className: p.className, style: { transform: `translate(${x}px, ${y}px` } }, valueOut))));
}) `
    display:flex;
    flex-direction: column;
    width: calc(${p => p.theme.width / 4}px - ${p => p.theme.margin * 2 + 2}px);
    height: calc(${p => p.theme.height / 4}px - ${p => p.theme.margin * 2 + 2}px);
    text-align: center;
    margin: ${p => p.theme.margin}px;
    ${p => p.theme.basicFont}
    justify-content: center;    
    color: ${(p) => p.theme.backgrounds[p.tile.value]}
    border: 1px dashed ${p => p.theme.color};
    top:0;
    left: 0;
    position:absolute;    
    
`;
