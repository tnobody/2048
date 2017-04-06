"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Values_1 = require("./Values");
const styled_components_1 = require("styled-components");
const utils_1 = require("./utils");
const store_1 = require("./../state/store");
const react_redux_1 = require("react-redux");
const actions_1 = require("../state/actions");
const Score_1 = require("./Score");
const MonoButton_1 = require("./MonoButton");
const GameOver_1 = require("./GameOver");
store_1.store.dispatch(actions_1.Spawn(2));
exports.App = styled_components_1.default(react_redux_1.connect((s) => ({
    gameover: s.game.gameover
}), (dispatch) => ({
    handleMove(direction) {
        switch (direction) {
            case 37:
            case 38:
            case 39:
            case 40:
                dispatch(actions_1.MoveByKeyboardCode(direction));
                break;
            case 82:
                this.restart();
                break;
            case 85:
                this.undo();
                break;
        }
    },
    restart() {
        dispatch(actions_1.Reset());
        dispatch(actions_1.Spawn(2));
    },
    undo() {
        dispatch(actions_1.Undo());
    }
}))(p => {
    const content = p.gameover ? React.createElement(GameOver_1.GameOver, null) : React.createElement(Values_1.Values, null);
    return (React.createElement("div", { autoFocus: true, className: p.className, onKeyUp: e => !p.gameover ? p.handleMove(e.which) : '' },
        React.createElement(utils_1.Flex, { justifyContent: "space-around" },
            React.createElement(MonoButton_1.MonoButton, { onClick: e => p.restart() },
                "[",
                React.createElement(utils_1.Highlight, null, "R"),
                "] Restart"),
            React.createElement(MonoButton_1.MonoButton, { disabled: p.gameover, onClick: e => !p.gameover ? p.undo() : '' },
                "[",
                React.createElement(utils_1.Highlight, null, "U"),
                "] Undo"),
            React.createElement(Score_1.Score, null)),
        React.createElement(utils_1.Flex, { justifyContent: "center" }, content)));
})) `
    background: ${p => p.theme.background};   
    outline: none;
    flex-grow: 1
`;
