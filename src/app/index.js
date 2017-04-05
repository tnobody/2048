"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const react_redux_1 = require("react-redux");
const App_1 = require("./components/App");
const store_1 = require("./state/store");
const styled_components_1 = require("styled-components");
const theme_1 = require("./theme");
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(styled_components_1.ThemeProvider, { theme: theme_1.Theme },
        React.createElement(App_1.App, null))), document.getElementById('main'));
