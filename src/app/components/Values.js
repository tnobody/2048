"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const react_redux_1 = require("react-redux");
const Value_1 = require("./Value");
const ReactCSSTransitionGroup = require("react-addons-css-transition-group");
exports.Values = styled_components_1.default(react_redux_1.connect((s) => ({
    tiles: s.game.tiles,
    size: s.game.size
}))((p) => {
    let refEl = null;
    return (React.createElement("div", { className: p.className, ref: (r) => { refEl = r; } },
        React.createElement(ReactCSSTransitionGroup, { transitionName: "valueAnimation", transitionAppear: true, transitionAppearTimeout: 500, transitionEnterTimeout: 150, transitionLeaveTimeout: 100 }, p.tiles.map((v, i) => React.createElement("div", { key: v.id },
            React.createElement(Value_1.Value, { size: p.size, tile: v }))))));
})) `
    display: flex;
    flex-wrap: wrap;
    position:relative;
    height:${p => p.theme.height}px;
    width:${p => p.theme.width}px;
    padding: ${p => p.theme.margin}px
`;
