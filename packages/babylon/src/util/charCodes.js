// @flow

type Char = number;

const charCodes = {
  space: 32,
  nonBreakingSpace: 160,
  carriageReturn: 13, // '\r'
  lineFeed: 10, // '\n'
  lineSeparator: 8232,
  paragraphSeparator: 8233,

  slash: 47, // '/'
  asterisk: 42, // '*'

  letterN: 110, // 'n'

  digit0: 48, // '0'
  digit9: 57, // '9'
};

export function isIn09(code: Char): boolean {
  return code >= charCodes.digit0 && code <= charCodes.digit9;
}

export default charCodes;
