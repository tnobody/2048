import * as React from 'react';
import {Values}from './Values'
import styled from 'styled-components'
import {Flex, Highlight} from './utils';
import {Attributes} from 'utils';
import {AppState, store} from './../state/store'
import {connect} from 'react-redux'
import {MoveLeft, MoveUp, MoveRight, MoveDown, Spawn, MoveByKeyboardCode, Undo, Reset} from "../state/actions";
import {Score} from "./Score";
import {MonoButton} from "./MonoButton";
import {GameOver} from "./GameOver";
import * as Swipeable from 'react-swipeable';

type AppProps = Attributes<{}>;


store.dispatch(Spawn(2))

export const App = styled(
    connect((s: AppState) => ({
        gameover: s.game.gameover
    }), (dispatch) => ({
        handleMove(direction) {
            switch (direction) {
                case 37:
                case 38:
                case 39:
                case 40:
                    dispatch(MoveByKeyboardCode(direction));
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
            dispatch(Reset());
            dispatch(Spawn(2));
        },
        undo() {
            dispatch(Undo());
        }
    }))
    (p => {
            document.addEventListener("keypress", (e) => {
                console.log('Pressed global', e.which);
            })
            const content = p.gameover ? <GameOver /> : <Values />;
            return (
                <div
                    tabIndex={1}
                    autoFocus={true}
                    className={(p as AppProps).className}
                    onKeyDown={e => !p.gameover ? p.handleMove(e.which) : ''}
                >
                    <Swipeable
                        onSwipedUp={e => !p.gameover ? p.handleMove(38) : ''}
                        onSwipedRight={e => !p.gameover ? p.handleMove(39) : ''}
                        onSwipedDown={e => !p.gameover ? p.handleMove(40) : ''}
                        onSwipedLeft={e => !p.gameover ? p.handleMove(37) : ''}>
                        <Flex justifyContent="space-around">
                            <MonoButton onClick={e => p.restart()}>[<Highlight>R</Highlight>] Restart</MonoButton>
                            <MonoButton disabled={p.gameover}
                                        onClick={e => !p.gameover ? p.undo() : ''}>[<Highlight>U</Highlight>] Undo</MonoButton>
                            <Score></Score>
                        </Flex>
                        <Flex justifyContent="center">{content}</Flex>
                    </Swipeable>
                </div>
            )
        }
    )
)`
    background: ${p => p.theme.background};   
    outline: none;
    flex-grow: 1
`;