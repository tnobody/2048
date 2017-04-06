import * as React from 'react';
import {connect} from "react-redux";
import {Flex, Highlight} from "./utils";
import {AppState} from "../state/store";
import styled from "styled-components";
import {MonoButton} from "./MonoButton";

const Input = styled.input`
    border:0;
    border-bottom: 1px dashed ${p => p.theme.highlightColor};
    flex-grow: 1;
    color: ${p => p.theme.highlightColor2};
    background: transparent;
    ${p => p.theme.basicFont}
    &:focus {
        outline:none
    }
`

const Padded = styled(Flex)`
    margin: 15px 0 15px 0;
`

const ConnectedGameover = connect((s: AppState) => ({
    gameover: s.game.gameover
}))
((p) => (
    <Flex className={(p as any).className} justifyContent="center" direction="column">
        <Padded justifyContent="center"><Highlight>{p.gameover ? 'Gameover :(' : ''}</Highlight></Padded>
        <Flex >
            <strong>Name:</strong>
            <Input autoFocus={true} />
            <MonoButton>[<Highlight>&gt;</Highlight>]</MonoButton>
        </Flex>
    </Flex>
));

export const GameOver = styled(ConnectedGameover)`
    ${p => p.theme.basicFont}
    display: flex;
    flex-wrap: wrap;
    position:relative;
    height:${p => p.theme.height}px;
    width:${p => p.theme.width}px;
    padding: ${p => p.theme.margin}px
`;
