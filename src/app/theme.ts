import {css, ThemedCssFunction, InterpolationValue} from 'styled-components';
import * as Color from 'color';

export interface ITheme {
    background: string;
    basicFont: any;
    emptyValue: string;
    margin: number;
    width: number;
    height: number;
    highlightColor: string;
    highlightColor2: string;
    backgrounds: {[value: number]: string}
}

export type ThemeProps = {
    theme?: ITheme
}

export const Theme: ITheme = {
    background: 'white', // #151515
    highlightColor: '#fecc00',
    highlightColor2: '#159700',
    basicFont: css`
        color: #828282;
        font-family: courier, monospace;
        font-size: 20px;
    `,
    emptyValue: '#151515',
    backgrounds: {
        2: Color('#eee4da').hex(),
        4: Color('#ede0c8').hex(),
        8: Color('#f2b179').hex(),
        16: Color('#f59563').hex(),
        32: Color('#f67c57').hex(),
        64: Color('#f65e3b').lighten(6 / 12).hex(),
        128: Color('#edcf72').lighten(7 / 12).hex(),
        256: Color('#edcc61').lighten(8 / 12).hex(),
        512: Color('#edc850').lighten(9 / 12).hex(),
        1024: Color('#edc53f').lighten(10 / 12).hex(),
        2048: Color('#fefefe').lighten(11 / 12).hex(),
    },
    margin: 5,
    width: 300,
    height: 300,
};

const mediaSizeMap = {
    sm: 576,
    md: 769,
    lg: 992,
    xl: 1200
};


export interface MediaQuerie {
    xs?: (...args: any[]) => any
    sm?: (...args: any[]) => any
    md?: (...args: any[]) => any
    lg?: (...args: any[]) => any
    xl?: (...args: any[]) => any
}

export const media:MediaQuerie = Object
    .keys(mediaSizeMap)
    .reduce((acc, label) => ({
        ...acc, [label]: (...args: any[]) => css`
        @media (min-width: ${mediaSizeMap[label] / 16}em) {
            ${(css as any)(...args)}
        }`
    }), ({
        xs: (...args: any[]) => css`
        @media (max-width: ${mediaSizeMap.sm / 16}em) {
            ${(css as any)(...args)}
        }`
    }));