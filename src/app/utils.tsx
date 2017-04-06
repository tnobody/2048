import * as React from 'react';
import {ThemeProps} from './theme'

export type Attributes<T> = T&React.HTMLAttributes<any>&ThemeProps;

export const leftPad = (v:any, n:number, c = '0') => String(v).length >= n ? '' + v : (String(c).repeat(n) + v).slice(-n);