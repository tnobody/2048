"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Values_1 = require("./Values");
const styled_components_1 = require("styled-components");
const react_redux_1 = require("react-redux");
const actions_1 = require("../state/actions");
exports.App = styled_components_1.default(react_redux_1.connect((s) => ({}), (dispatch) => ({
    handleMove(direction) { dispatch(actions_1.MoveByKeyboardCode(direction)); },
    startGame() { dispatch(actions_1.Spawn(2)); }
}))(p => (React.createElement("div", { tabIndex: 1, className: p.className, onKeyUp: e => p.handleMove(e.which) },
    React.createElement(Values_1.Values, null),
    React.createElement("button", { onClick: e => p.startGame() }, "Start"))))) `
    background: ${p => p.theme.background};   
    outline: none;
`;
