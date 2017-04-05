import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './components/App';
import {store} from './state/store';
import {ThemeProvider} from 'styled-components';
import {Theme} from './theme';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={Theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('main')
)
