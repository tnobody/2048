import * as React from 'react';
import {Attributes, leftPad} from "../utils";
import {connect} from "react-redux";
import {AppState} from "../state/store";
import styled, {keyframes} from "styled-components";
import {Highlight} from "./utils";

type ScoreProps = Attributes<{score:number}>
export const ScorePlain = (p:ScoreProps) => (
    <div className={p.className}>Score: <Highlight>{leftPad(String(p.score),8,'0')}</Highlight></div>
)

export const ScoreConnected = connect((s:AppState) => ({
    score: s.game.score
}))(ScorePlain);

const popin = keyframes`
    0% {
        transform: scale(1,1)
    }
    90% {
        transform: scale(1.2,1)
    }
    100% {
        transform: scale(1,1)
    }
`

export const Score = styled(ScoreConnected)`
    animation: ${popin} .5s linear;
    ${p => p.theme.basicFont}
`;