"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leftPad = (v, n, c = '0') => String(v).length >= n ? '' + v : (String(c).repeat(n) + v).slice(-n);
