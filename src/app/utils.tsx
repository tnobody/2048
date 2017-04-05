import * as React from 'react';
import {ThemeProps} from './theme'

export type Attributes<T> = T&React.HTMLAttributes<any>&ThemeProps;