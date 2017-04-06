import * as React from 'react';
import styled from "styled-components";
import {ThemedHtmlStyledFunction} from "styled-components";
import HTMLAttributes = React.HTMLAttributes;
import HTMLProps = React.HTMLProps;

export interface FlexProps {
    direction?:'row'|'column',
    wrap?: "nowrap" | "wrap" | "wrap-reverse",
    justifyContent?:  "flex-start" | "flex-end" | "center" | "space-between" | "space-around"

}

export const Flex = styled((p:HTMLProps<any>&FlexProps) => <div className={p.className}>{p.children}</div>)`
    display:flex;
    flex-direction: ${p => p.direction || 'row'}
    flex-wrap: ${p => p.wrap || 'nowrap'}
    justify-content: ${p => p.justifyContent || 'flex-start'}
`;

export const Highlight = styled.span`
    color: ${p => p.theme.highlightColor};
`
