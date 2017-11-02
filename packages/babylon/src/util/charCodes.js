// @flow

type Char = number;

const charCodes = {
  space: 32,
  backSpace: 8,
  shiftOut: 14,
  nonBreakingSpace: 160,
  carriageReturn: 13, // '\r'
  lineFeed: 10, // '\n'
  lineSeparator: 8232,
  paragraphSeparator: 8233,

  asterisk: 42, // '*'
  dot: 46, // '.'
  slash: 47, // '/'

  letterN: 110, // 'n'

  digit0: 48, // '0'
  digit9: 57, // '9'

  lessThan: 60, // '<'
  equalsTo: 61, // '='
  greaterThan: 62, // '>'
  questionMark: 63, // '?'
  at: 64, // '@'

  exclamationMark: 33, // '!'
  dash: 45, // '-'
};

export function isDigit(code: Char): boolean {
  return code >= charCodes.digit0 && code <= charCodes.digit9;
}

export default charCodes;
