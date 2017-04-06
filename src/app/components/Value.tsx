import * as React from 'react'
import styled from 'styled-components';
import {Attributes, leftPad} from './../utils'
import {Tile, TileState} from "../model/Tile";
import {connect} from "react-redux";
import {AppState} from "../state/store";
import {keyframes} from "styled-components";
import {css} from "styled-components";
import {Point, P} from "../state/Sequences";
import {Motion, spring} from "react-motion";

const popout = keyframes`
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

const move = (from: Point, to: Point) => keyframes`
    from {
        transform: translate(${from.x}px, ${from.y}px)
    }
    to {
        transform: translate(${to.x}px, ${to.y}px)
    }
`;

const StateStyles = {
    "_SPAWNED": (t: ValueProps) => css`
        animation: ${popout} .35s linear 1;
    `,
    "MOVED": (t: ValueProps) => css`
        animation: ${move(
        P((t.theme.width / 4) * t.tile.x, (t.theme.height / 4) * t.tile.y),
        P((t.theme.width / 4) * t.tile.x, (t.theme.height / 4) * t.tile.y)
    )} .5s linear 1;
    `
}

function getStyle(byState: TileState, p: ValueProps) {
    const fn = StateStyles[byState];
    if (fn) {
        return fn(p);
    }
    return '';
}

type ValueProps = Attributes<{tile: Tile, size?: number}>
export const Value = styled((p: ValueProps) => {
    const v = leftPad(p.tile.value.toString(2), 16);
    const vparts = [];
    for (let i = 0; i < v.length; i += 4) {
        vparts.push(v.substring(i, i + 4));
    }
    //const valueOut = vparts.map((v,i) => <div key={i}>{v}</div>)
    const valueOut = p.tile.value;
    const springOpts=  {stiffness:300, damping:40};
    const defP = P((400 / 4) * (p.tile.oldX || p.tile.x),(400 / 4) * (p.tile.oldY || p.tile.y));
    const destP = {x: spring((400 / 4) * (p.tile.x)), y: spring((400 / 4) * (p.tile.y))};
    return (
        <Motion defaultStyle={defP}  style={destP}>
            {({x,y}) => (
                <div className={p.className} style={{transform:`translate(${x}px, ${y}px`}}>{valueOut}</div>
            )}
        </Motion>);
})`
    display:flex;
    flex-direction: column;
    width: calc(${p => p.theme.width / 4}px - ${p => p.theme.margin * 2 + 2}px);
    height: calc(${p => p.theme.height / 4}px - ${p => p.theme.margin * 2 + 2}px);
    text-align: center;
    margin: ${p => p.theme.margin}px;
    ${p => p.theme.basicFont}
    justify-content: center;    
    color: ${(p: any) => p.theme.backgrounds[p.tile.value] }
    border: 1px dashed ${p => p.theme.highlightColor};
    top:0;
    left: 0;
    position:absolute;    
    
`;