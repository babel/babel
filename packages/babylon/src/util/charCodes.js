// @flow

type Char = number;

export const space = 32;
export const backSpace = 8;
export const shiftOut = 14;
export const nonBreakingSpace = 160;
export const carriageReturn = 13; // '\r'
export const lineFeed = 10; // '\n'
export const lineSeparator = 8232;
export const paragraphSeparator = 8233;

export const asterisk = 42; // '*'
export const dot = 46; // '.'
export const slash = 47; // '/'

export const letterN = 110; // 'n'

export const digit0 = 48; // '0'
export const digit9 = 57; // '9'

export const lessThan = 60; // '<'
export const equalsTo = 61; // '='
export const greaterThan = 62; // '>'
export const questionMark = 63; // '?'
export const at = 64; // '@'

export const exclamationMark = 33; // '!'
export const dash = 45; // '-'

export function isDigit(code: Char): boolean {
  return code >= digit0 && code <= digit9;
}
