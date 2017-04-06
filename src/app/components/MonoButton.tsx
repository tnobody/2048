import * as React from 'react';
import styled from "styled-components";

export const MonoButton = styled.button`
    background: none;
    border:none;
    cursor:pointer;
    &:focus {
        outline:none;
    };
    ${p => p.theme.basicFont}
`;

