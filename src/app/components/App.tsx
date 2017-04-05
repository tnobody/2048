import * as React from 'react';
import {Values }from './Values'
import styled from 'styled-components'
import {Attributes} from 'utils';
import {AppState} from './../state/store'
import {connect} from 'react-redux'
import {MoveLeft, MoveUp, MoveRight, MoveDown, Spawn, MoveByKeyboardCode} from "../state/actions";

type AppProps = Attributes<{}>;

export const App = styled(
    connect((s:AppState) => ({

    }), (dispatch) => ({
        handleMove(direction) { dispatch(MoveByKeyboardCode(direction)) },
        startGame() { dispatch(Spawn(2)); }
    }))
    (p => (
        <div tabIndex={1} className={(p as AppProps).className} onKeyUp={e => p.handleMove(e.which)}>
            <Values />
            <button onClick={e => p.startGame()}>Start</button>            
        </div>
    ))
)`
    background: ${p => p.theme.background};   
    outline: none;
`;