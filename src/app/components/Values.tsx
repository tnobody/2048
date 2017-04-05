import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import {Value} from './Value';
import {AppState} from './../state/store';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Tile} from "../model/Tile";

type ValuesProps = {tiles: Tile[]}&React.HTMLAttributes<any>
export const Values = styled(
    connect(
        (s: AppState) => ({
            tiles: s.game.tiles,
            size: s.game.size
        })
    )(
        (p: ValuesProps) => {
            let refEl:Element = null;
            return (
                <div 
                    className={p.className}
                    ref={(r:any) => {refEl = r}}
                >
                <ReactCSSTransitionGroup
                    transitionName="valueAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={350}
                    transitionLeaveTimeout={250}
                >
                    {p.tiles.map((v, i) => <div key={v.id} ><Value size={p.size} tile={v}/></div>)}
                </ReactCSSTransitionGroup>
                </div>
            )
        }))`
    display: flex;
    flex-wrap: wrap;
    position:relative;
    height:${p => p.theme.height}px;
    width:${p => p.theme.width}px;
    padding: ${p => p.theme.margin}px
`;
