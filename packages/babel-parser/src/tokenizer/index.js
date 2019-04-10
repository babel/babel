// @flow

import type { Position } from "../util/location";
import * as charCodes from "charcodes";
import { isIdentifierStart, isIdentifierChar } from "../util/identifier";
import {
  types as tt,
  keywords as keywordTypes,
  type TokenType,
} from "../util/token-types";
import {
  type TokContext,
  types as ct,
  updateContext as contextUpdater,
} from "./context";
import type State from "../util/state";
import { SourceLocation } from "../util/location";
import {
  lineBreak,
  lineBreakG,
  isNewLine,
  isWhitespace,
} from "../util/whitespace";

import {
  state,
  resetState,
  options,
  inModule,
  input,
  length,
  addComment,
  getPluginOption,
  hasPlugin,
  raise,
} from "::build-tool::bindings/parser";

let isLookahead = false;

const VALID_REGEX_FLAGS = new Set(["g", "m", "s", "i", "y", "u"]);

// The following character codes are forbidden from being
// an immediate sibling of NumericLiteralSeparator _

const forbiddenNumericSeparatorSiblings = {
  decBinOct: [
    charCodes.dot,
    charCodes.uppercaseB,
    charCodes.uppercaseE,
    charCodes.uppercaseO,
    charCodes.underscore, // multiple separators are not allowed
    charCodes.lowercaseB,
    charCodes.lowercaseE,
    charCodes.lowercaseO,
  ],
  hex: [
    charCodes.dot,
    charCodes.uppercaseX,
    charCodes.underscore, // multiple separators are not allowed
    charCodes.lowercaseX,
  ],
};

const allowedNumericSeparatorSiblings = {};
allowedNumericSeparatorSiblings.bin = [
  // 0 - 1
  charCodes.digit0,
  charCodes.digit1,
];
allowedNumericSeparatorSiblings.oct = [
  // 0 - 7
  ...allowedNumericSeparatorSiblings.bin,

  charCodes.digit2,
  charCodes.digit3,
  charCodes.digit4,
  charCodes.digit5,
  charCodes.digit6,
  charCodes.digit7,
];
allowedNumericSeparatorSiblings.dec = [
  // 0 - 9
  ...allowedNumericSeparatorSiblings.oct,

  charCodes.digit8,
  charCodes.digit9,
];

allowedNumericSeparatorSiblings.hex = [
  // 0 - 9, A - F, a - f,
  ...allowedNumericSeparatorSiblings.dec,

  charCodes.uppercaseA,
  charCodes.uppercaseB,
  charCodes.uppercaseC,
  charCodes.uppercaseD,
  charCodes.uppercaseE,
  charCodes.uppercaseF,

  charCodes.lowercaseA,
  charCodes.lowercaseB,
  charCodes.lowercaseC,
  charCodes.lowercaseD,
  charCodes.lowercaseE,
  charCodes.lowercaseF,
];

// Object type used to represent tokens. Note that normally, tokens
// simply exist as properties on the parser object. This is only
// used for the onToken callback and the external tokenizer.

export class Token {
  constructor(state: State) {
    this.type = state.type;
    this.value = state.value;
    this.start = state.start;
    this.end = state.end;
    this.loc = new SourceLocation(state.startLoc, state.endLoc);
  }

  type: TokenType;
  value: any;
  start: number;
  end: number;
  loc: SourceLocation;
}

// Move to the next token

export function next(): void {
  if (options.tokens && !isLookahead) {
    state.tokens.push(new Token(state));
  }

  state.lastTokEnd = state.end;
  state.lastTokStart = state.start;
  state.lastTokEndLoc = state.endLoc;
  state.lastTokStartLoc = state.startLoc;
  nextToken();
}

// TODO

export function eat(type: TokenType): boolean {
  if (match(type)) {
    next();
    return true;
  } else {
    return false;
  }
}

// TODO

export function match(type: TokenType): boolean {
  return state.type === type;
}

// TODO

export function lookahead(): State {
  const old = state;
  resetState(old.clone(true));

  isLookahead = true;
  next();
  isLookahead = false;

  const curr = state;
  resetState(old);
  return curr;
}

// Toggle strict mode. Re-reads the next number or string to please
// pedantic tests (`"use strict"; 010;` should fail).

export function setStrict(strict: boolean): void {
  state.strict = strict;
  if (!match(tt.num) && !match(tt.string)) return;
  state.pos = state.start;
  while (state.pos < state.lineStart) {
    state.lineStart = input.lastIndexOf("\n", state.lineStart - 2) + 1;
    --state.curLine;
  }
  nextToken();
}

export function curContext(): TokContext {
  return state.context[state.context.length - 1];
}

// Read a single token, updating the parser object's token-related
// properties.

export function nextToken(): void {
  const ctx = curContext();
  if (!ctx || !ctx.preserveSpace) skipSpace();

  state.containsOctal = false;
  state.octalPosition = null;
  state.start = state.pos;
  state.startLoc = state.curPosition();
  if (state.pos >= length) {
    finishToken(tt.eof);
    return;
  }

  if (ctx.override) {
    ctx.override();
  } else {
    getTokenFromCode(input.codePointAt(state.pos));
  }
}

function pushComment(
  block: boolean,
  text: string,
  start: number,
  end: number,
  startLoc: Position,
  endLoc: Position,
): void {
  const comment = {
    type: block ? "CommentBlock" : "CommentLine",
    value: text,
    start: start,
    end: end,
    loc: new SourceLocation(startLoc, endLoc),
  };

  if (!isLookahead) {
    if (options.tokens) state.tokens.push(comment);
    state.comments.push(comment);
    addComment(comment);
  }
}

export function skipBlockComment(): void {
  const startLoc = state.curPosition();
  const start = state.pos;
  const end = input.indexOf("*/", (state.pos += 2));
  if (end === -1) raise(state.pos - 2, "Unterminated comment");

  state.pos = end + 2;
  lineBreakG.lastIndex = start;
  let match;
  while ((match = lineBreakG.exec(input)) && match.index < state.pos) {
    ++state.curLine;
    state.lineStart = match.index + match[0].length;
  }

  pushComment(
    true,
    input.slice(start + 2, end),
    start,
    state.pos,
    startLoc,
    state.curPosition(),
  );
}

function skipLineComment(startSkip: number): void {
  const start = state.pos;
  const startLoc = state.curPosition();
  let ch = input.charCodeAt((state.pos += startSkip));
  if (state.pos < length) {
    while (
      ch !== charCodes.lineFeed &&
      ch !== charCodes.carriageReturn &&
      ch !== charCodes.lineSeparator &&
      ch !== charCodes.paragraphSeparator &&
      ++state.pos < length
    ) {
      ch = input.charCodeAt(state.pos);
    }
  }

  pushComment(
    false,
    input.slice(start + startSkip, state.pos),
    start,
    state.pos,
    startLoc,
    state.curPosition(),
  );
}

// Called at the start of the parse and after every token. Skips
// whitespace and comments, and.

function skipSpace(): void {
  loop: while (state.pos < length) {
    const ch = input.charCodeAt(state.pos);
    switch (ch) {
      case charCodes.space:
      case charCodes.nonBreakingSpace:
      case charCodes.tab:
        ++state.pos;
        break;
      case charCodes.carriageReturn:
        if (input.charCodeAt(state.pos + 1) === charCodes.lineFeed) {
          ++state.pos;
        }

      case charCodes.lineFeed:
      case charCodes.lineSeparator:
      case charCodes.paragraphSeparator:
        ++state.pos;
        ++state.curLine;
        state.lineStart = state.pos;
        break;

      case charCodes.slash:
        switch (input.charCodeAt(state.pos + 1)) {
          case charCodes.asterisk:
            skipBlockComment();
            break;

          case charCodes.slash:
            skipLineComment(2);
            break;

          default:
            break loop;
        }
        break;

      default:
        if (isWhitespace(ch)) {
          ++state.pos;
        } else {
          break loop;
        }
    }
  }
}

// Called at the end of every token. Sets `end`, `val`, and
// maintains `context` and `exprAllowed`, and skips the space after
// the token, so that the next one's `start` will point at the
// right position.

export function finishToken(type: TokenType, val: any): void {
  state.end = state.pos;
  state.endLoc = state.curPosition();
  const prevType = state.type;
  state.type = type;
  state.value = val;

  updateContext(prevType);
}

// ### Token reading

// This is the function that is called to fetch the next token. It
// is somewhat obscure, because it works in character codes rather
// than characters, and because operator parsing has been inlined
// into it.
//
// All in the name of speed.

// number sign is "#"
function readToken_numberSign(): void {
  if (state.pos === 0 && readToken_interpreter()) {
    return;
  }

  const nextPos = state.pos + 1;
  const next = input.charCodeAt(nextPos);
  if (next >= charCodes.digit0 && next <= charCodes.digit9) {
    raise(state.pos, "Unexpected digit after hash token");
  }

  if (
    (hasPlugin("classPrivateProperties") || hasPlugin("classPrivateMethods")) &&
    state.classLevel > 0
  ) {
    ++state.pos;
    finishToken(tt.hash);
    return;
  } else if (getPluginOption("pipelineOperator", "proposal") === "smart") {
    finishOp(tt.hash, 1);
  } else {
    raise(state.pos, "Unexpected character '#'");
  }
}

function readToken_dot(): void {
  const next = input.charCodeAt(state.pos + 1);
  if (next >= charCodes.digit0 && next <= charCodes.digit9) {
    readNumber(true);
    return;
  }

  const next2 = input.charCodeAt(state.pos + 2);
  if (next === charCodes.dot && next2 === charCodes.dot) {
    state.pos += 3;
    finishToken(tt.ellipsis);
  } else {
    ++state.pos;
    finishToken(tt.dot);
  }
}

function readToken_slash(): void {
  // '/'
  if (state.exprAllowed && !state.inType) {
    ++state.pos;
    readRegexp();
    return;
  }

  const next = input.charCodeAt(state.pos + 1);
  if (next === charCodes.equalsTo) {
    finishOp(tt.assign, 2);
  } else {
    finishOp(tt.slash, 1);
  }
}

function readToken_interpreter(): boolean {
  if (state.pos !== 0 || length < 2) return false;

  const start = state.pos;
  state.pos += 1;

  let ch = input.charCodeAt(state.pos);
  if (ch !== charCodes.exclamationMark) return false;

  while (
    ch !== charCodes.lineFeed &&
    ch !== charCodes.carriageReturn &&
    ch !== charCodes.lineSeparator &&
    ch !== charCodes.paragraphSeparator &&
    ++state.pos < length
  ) {
    ch = input.charCodeAt(state.pos);
  }

  const value = input.slice(start + 2, state.pos);

  finishToken(tt.interpreterDirective, value);

  return true;
}

export function readToken_mult_modulo(code: number): void {
  // '%*'
  let type = code === charCodes.asterisk ? tt.star : tt.modulo;
  let width = 1;
  let next = input.charCodeAt(state.pos + 1);
  const exprAllowed = state.exprAllowed;

  // Exponentiation operator **
  if (code === charCodes.asterisk && next === charCodes.asterisk) {
    width++;
    next = input.charCodeAt(state.pos + 2);
    type = tt.exponent;
  }

  if (next === charCodes.equalsTo && !exprAllowed) {
    width++;
    type = tt.assign;
  }

  finishOp(type, width);
}

export function readToken_pipe_amp(code: number): void {
  // '||' '&&' '||=' '&&='
  const next = input.charCodeAt(state.pos + 1);

  if (next === code) {
    if (input.charCodeAt(state.pos + 2) === charCodes.equalsTo) {
      finishOp(tt.assign, 3);
    } else {
      finishOp(
        code === charCodes.verticalBar ? tt.logicalOR : tt.logicalAND,
        2,
      );
    }
    return;
  }

  if (code === charCodes.verticalBar) {
    // '|>'
    if (next === charCodes.greaterThan) {
      finishOp(tt.pipeline, 2);
      return;
    }
  }

  if (next === charCodes.equalsTo) {
    finishOp(tt.assign, 2);
    return;
  }

  finishOp(code === charCodes.verticalBar ? tt.bitwiseOR : tt.bitwiseAND, 1);
}

function readToken_caret(): void {
  // '^'
  const next = input.charCodeAt(state.pos + 1);
  if (next === charCodes.equalsTo) {
    finishOp(tt.assign, 2);
  } else {
    finishOp(tt.bitwiseXOR, 1);
  }
}

function readToken_plus_min(code: number): void {
  // '+-'
  const next = input.charCodeAt(state.pos + 1);

  if (next === code) {
    if (
      next === charCodes.dash &&
      !inModule &&
      input.charCodeAt(state.pos + 2) === charCodes.greaterThan &&
      (state.lastTokEnd === 0 ||
        lineBreak.test(input.slice(state.lastTokEnd, state.pos)))
    ) {
      // A `-->` line comment
      skipLineComment(3);
      skipSpace();
      nextToken();
      return;
    }
    finishOp(tt.incDec, 2);
    return;
  }

  if (next === charCodes.equalsTo) {
    finishOp(tt.assign, 2);
  } else {
    finishOp(tt.plusMin, 1);
  }
}

function readToken_lt_gt(code: number): void {
  // '<>'
  const next = input.charCodeAt(state.pos + 1);
  let size = 1;

  if (next === code) {
    size =
      code === charCodes.greaterThan &&
      input.charCodeAt(state.pos + 2) === charCodes.greaterThan
        ? 3
        : 2;
    if (input.charCodeAt(state.pos + size) === charCodes.equalsTo) {
      finishOp(tt.assign, size + 1);
      return;
    }
    finishOp(tt.bitShift, size);
    return;
  }

  if (
    next === charCodes.exclamationMark &&
    code === charCodes.lessThan &&
    !inModule &&
    input.charCodeAt(state.pos + 2) === charCodes.dash &&
    input.charCodeAt(state.pos + 3) === charCodes.dash
  ) {
    // `<!--`, an XML-style comment that should be interpreted as a line comment
    skipLineComment(4);
    skipSpace();
    nextToken();
    return;
  }

  if (next === charCodes.equalsTo) {
    // <= | >=
    size = 2;
  }

  finishOp(tt.relational, size);
}

function readToken_eq_excl(code: number): void {
  // '=!'
  const next = input.charCodeAt(state.pos + 1);
  if (next === charCodes.equalsTo) {
    finishOp(
      tt.equality,
      input.charCodeAt(state.pos + 2) === charCodes.equalsTo ? 3 : 2,
    );
    return;
  }
  if (code === charCodes.equalsTo && next === charCodes.greaterThan) {
    // '=>'
    state.pos += 2;
    finishToken(tt.arrow);
    return;
  }
  finishOp(code === charCodes.equalsTo ? tt.eq : tt.bang, 1);
}

function readToken_question(): void {
  // '?'
  const next = input.charCodeAt(state.pos + 1);
  const next2 = input.charCodeAt(state.pos + 2);
  if (next === charCodes.questionMark && !state.inType) {
    if (next2 === charCodes.equalsTo) {
      // '??='
      finishOp(tt.assign, 3);
    } else {
      // '??'
      finishOp(tt.nullishCoalescing, 2);
    }
  } else if (
    next === charCodes.dot &&
    !(next2 >= charCodes.digit0 && next2 <= charCodes.digit9)
  ) {
    // '.' not followed by a number
    state.pos += 2;
    finishToken(tt.questionDot);
  } else {
    ++state.pos;
    finishToken(tt.question);
  }
}

export function getTokenFromCode(code: number): void {
  switch (code) {
    // The interpretation of a dot depends on whether it is followed
    // by a digit or another two dots.

    case charCodes.dot:
      readToken_dot();
      return;

    // Punctuation tokens.
    case charCodes.leftParenthesis:
      ++state.pos;
      finishToken(tt.parenL);
      return;
    case charCodes.rightParenthesis:
      ++state.pos;
      finishToken(tt.parenR);
      return;
    case charCodes.semicolon:
      ++state.pos;
      finishToken(tt.semi);
      return;
    case charCodes.comma:
      ++state.pos;
      finishToken(tt.comma);
      return;
    case charCodes.leftSquareBracket:
      ++state.pos;
      finishToken(tt.bracketL);
      return;
    case charCodes.rightSquareBracket:
      ++state.pos;
      finishToken(tt.bracketR);
      return;
    case charCodes.leftCurlyBrace:
      ++state.pos;
      finishToken(tt.braceL);
      return;
    case charCodes.rightCurlyBrace:
      ++state.pos;
      finishToken(tt.braceR);
      return;

    case charCodes.colon:
      if (
        hasPlugin("functionBind") &&
        input.charCodeAt(state.pos + 1) === charCodes.colon
      ) {
        finishOp(tt.doubleColon, 2);
      } else {
        ++state.pos;
        finishToken(tt.colon);
      }
      return;

    case charCodes.questionMark:
      readToken_question();
      return;

    case charCodes.graveAccent:
      ++state.pos;
      finishToken(tt.backQuote);
      return;

    case charCodes.digit0: {
      const next = input.charCodeAt(state.pos + 1);
      // '0x', '0X' - hex number
      if (next === charCodes.lowercaseX || next === charCodes.uppercaseX) {
        readRadixNumber(16);
        return;
      }
      // '0o', '0O' - octal number
      if (next === charCodes.lowercaseO || next === charCodes.uppercaseO) {
        readRadixNumber(8);
        return;
      }
      // '0b', '0B' - binary number
      if (next === charCodes.lowercaseB || next === charCodes.uppercaseB) {
        readRadixNumber(2);
        return;
      }
    }
    // Anything else beginning with a digit is an integer, octal
    // number, or float.
    case charCodes.digit1:
    case charCodes.digit2:
    case charCodes.digit3:
    case charCodes.digit4:
    case charCodes.digit5:
    case charCodes.digit6:
    case charCodes.digit7:
    case charCodes.digit8:
    case charCodes.digit9:
      readNumber(false);
      return;

    // Quotes produce strings.
    case charCodes.quotationMark:
    case charCodes.apostrophe:
      readString(code);
      return;

    // Operators are parsed inline in tiny state machines. '=' (charCodes.equalsTo) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.

    case charCodes.slash:
      readToken_slash();
      return;

    case charCodes.percentSign:
    case charCodes.asterisk:
      readToken_mult_modulo(code);
      return;

    case charCodes.verticalBar:
    case charCodes.ampersand:
      readToken_pipe_amp(code);
      return;

    case charCodes.caret:
      readToken_caret();
      return;

    case charCodes.plusSign:
    case charCodes.dash:
      readToken_plus_min(code);
      return;

    case charCodes.lessThan:
    case charCodes.greaterThan:
      readToken_lt_gt(code);
      return;

    case charCodes.equalsTo:
    case charCodes.exclamationMark:
      readToken_eq_excl(code);
      return;

    case charCodes.tilde:
      finishOp(tt.tilde, 1);
      return;

    case charCodes.atSign:
      ++state.pos;
      finishToken(tt.at);
      return;

    case charCodes.numberSign:
      readToken_numberSign();
      return;

    case charCodes.backslash:
      readWord();
      return;

    default:
      if (isIdentifierStart(code)) {
        readWord();
        return;
      }
  }

  raise(state.pos, `Unexpected character '${String.fromCodePoint(code)}'`);
}

export function finishOp(type: TokenType, size: number): void {
  const str = input.slice(state.pos, state.pos + size);
  state.pos += size;
  finishToken(type, str);
}

export function readRegexp(): void {
  const start = state.pos;
  let escaped, inClass;
  for (;;) {
    if (state.pos >= length) {
      raise(start, "Unterminated regular expression");
    }
    const ch = input.charAt(state.pos);
    if (lineBreak.test(ch)) {
      raise(start, "Unterminated regular expression");
    }
    if (escaped) {
      escaped = false;
    } else {
      if (ch === "[") {
        inClass = true;
      } else if (ch === "]" && inClass) {
        inClass = false;
      } else if (ch === "/" && !inClass) {
        break;
      }
      escaped = ch === "\\";
    }
    ++state.pos;
  }
  const content = input.slice(start, state.pos);
  ++state.pos;

  let mods = "";

  while (state.pos < length) {
    const char = input[state.pos];
    const charCode = input.codePointAt(state.pos);

    if (VALID_REGEX_FLAGS.has(char)) {
      if (mods.indexOf(char) > -1) {
        raise(state.pos + 1, "Duplicate regular expression flag");
      }

      ++state.pos;
      mods += char;
    } else if (isIdentifierChar(charCode) || charCode === charCodes.backslash) {
      raise(state.pos + 1, "Invalid regular expression flag");
    } else {
      break;
    }
  }

  finishToken(tt.regexp, {
    pattern: content,
    flags: mods,
  });
}

// Read an integer in the given radix. Return null if zero digits
// were read, the integer value otherwise. When `len` is given, this
// will return `null` unless the integer has exactly `len` digits.

function readInt(radix: number, len?: number): number | null {
  const start = state.pos;
  const forbiddenSiblings =
    radix === 16
      ? forbiddenNumericSeparatorSiblings.hex
      : forbiddenNumericSeparatorSiblings.decBinOct;
  const allowedSiblings =
    radix === 16
      ? allowedNumericSeparatorSiblings.hex
      : radix === 10
      ? allowedNumericSeparatorSiblings.dec
      : radix === 8
      ? allowedNumericSeparatorSiblings.oct
      : allowedNumericSeparatorSiblings.bin;

  let total = 0;

  for (let i = 0, e = len == null ? Infinity : len; i < e; ++i) {
    const code = input.charCodeAt(state.pos);
    let val;

    if (hasPlugin("numericSeparator")) {
      const prev = input.charCodeAt(state.pos - 1);
      const next = input.charCodeAt(state.pos + 1);
      if (code === charCodes.underscore) {
        if (allowedSiblings.indexOf(next) === -1) {
          raise(state.pos, "Invalid or unexpected token");
        }

        if (
          forbiddenSiblings.indexOf(prev) > -1 ||
          forbiddenSiblings.indexOf(next) > -1 ||
          Number.isNaN(next)
        ) {
          raise(state.pos, "Invalid or unexpected token");
        }

        // Ignore _ character
        ++state.pos;
        continue;
      }
    }

    if (code >= charCodes.lowercaseA) {
      val = code - charCodes.lowercaseA + charCodes.lineFeed;
    } else if (code >= charCodes.uppercaseA) {
      val = code - charCodes.uppercaseA + charCodes.lineFeed;
    } else if (charCodes.isDigit(code)) {
      val = code - charCodes.digit0; // 0-9
    } else {
      val = Infinity;
    }
    if (val >= radix) break;
    ++state.pos;
    total = total * radix + val;
  }
  if (state.pos === start || (len != null && state.pos - start !== len)) {
    return null;
  }

  return total;
}

function readRadixNumber(radix: number): void {
  const start = state.pos;
  let isBigInt = false;

  state.pos += 2; // 0x
  const val = readInt(radix);
  if (val == null) {
    raise(state.start + 2, "Expected number in radix " + radix);
  }

  if (hasPlugin("bigInt")) {
    if (input.charCodeAt(state.pos) === charCodes.lowercaseN) {
      ++state.pos;
      isBigInt = true;
    }
  }

  if (isIdentifierStart(input.codePointAt(state.pos))) {
    raise(state.pos, "Identifier directly after number");
  }

  if (isBigInt) {
    const str = input.slice(start, state.pos).replace(/[_n]/g, "");
    finishToken(tt.bigint, str);
    return;
  }

  finishToken(tt.num, val);
}

// Read an integer, octal integer, or floating-point number.

function readNumber(startsWithDot: boolean): void {
  const start = state.pos;
  let isFloat = false;
  let isBigInt = false;

  if (!startsWithDot && readInt(10) === null) {
    raise(start, "Invalid number");
  }
  let octal =
    state.pos - start >= 2 && input.charCodeAt(start) === charCodes.digit0;
  if (octal) {
    if (state.strict) {
      raise(start, "Legacy octal literals are not allowed in strict mode");
    }
    if (/[89]/.test(input.slice(start, state.pos))) {
      octal = false;
    }
  }

  let next = input.charCodeAt(state.pos);
  if (next === charCodes.dot && !octal) {
    ++state.pos;
    readInt(10);
    isFloat = true;
    next = input.charCodeAt(state.pos);
  }

  if (
    (next === charCodes.uppercaseE || next === charCodes.lowercaseE) &&
    !octal
  ) {
    next = input.charCodeAt(++state.pos);
    if (next === charCodes.plusSign || next === charCodes.dash) {
      ++state.pos;
    }
    if (readInt(10) === null) raise(start, "Invalid number");
    isFloat = true;
    next = input.charCodeAt(state.pos);
  }

  if (hasPlugin("bigInt")) {
    if (next === charCodes.lowercaseN) {
      // disallow floats and legacy octal syntax, new style octal ("0o") is handled in readRadixNumber
      if (isFloat || octal) raise(start, "Invalid BigIntLiteral");
      ++state.pos;
      isBigInt = true;
    }
  }

  if (isIdentifierStart(input.codePointAt(state.pos))) {
    raise(state.pos, "Identifier directly after number");
  }

  // remove "_" for numeric literal separator, and "n" for BigInts
  const str = input.slice(start, state.pos).replace(/[_n]/g, "");

  if (isBigInt) {
    finishToken(tt.bigint, str);
    return;
  }

  const val = octal ? parseInt(str, 8) : parseFloat(str);
  finishToken(tt.num, val);
}

// Read a string value, interpreting backslash-escapes.

function readCodePoint(throwOnInvalid: boolean): number | null {
  const ch = input.charCodeAt(state.pos);
  let code;

  if (ch === charCodes.leftCurlyBrace) {
    const codePos = ++state.pos;
    code = readHexChar(
      input.indexOf("}", state.pos) - state.pos,
      throwOnInvalid,
    );
    ++state.pos;
    if (code === null) {
      // $FlowIgnore - invalidTemplateEscapePosition is always a number in templates
      --state.invalidTemplateEscapePosition; // to point to the '\'' instead of the 'u'
    } else if (code > 0x10ffff) {
      if (throwOnInvalid) {
        raise(codePos, "Code point out of bounds");
      } else {
        state.invalidTemplateEscapePosition = codePos - 2;
        return null;
      }
    }
  } else {
    code = readHexChar(4, throwOnInvalid);
  }
  return code;
}

function readString(quote: number): void {
  let out = "",
    chunkStart = ++state.pos;
  for (;;) {
    if (state.pos >= length) {
      raise(state.start, "Unterminated string constant");
    }
    const ch = input.charCodeAt(state.pos);
    if (ch === quote) break;
    if (ch === charCodes.backslash) {
      out += input.slice(chunkStart, state.pos);
      // $FlowFixMe
      out += readEscapedChar(false);
      chunkStart = state.pos;
    } else if (
      ch === charCodes.lineSeparator ||
      ch === charCodes.paragraphSeparator
    ) {
      ++state.pos;
      ++state.curLine;
    } else if (isNewLine(ch)) {
      raise(state.start, "Unterminated string constant");
    } else {
      ++state.pos;
    }
  }
  out += input.slice(chunkStart, state.pos++);
  finishToken(tt.string, out);
}

// Reads template string tokens.

export function readTmplToken(): void {
  let out = "",
    chunkStart = state.pos,
    containsInvalid = false;
  for (;;) {
    if (state.pos >= length) {
      raise(state.start, "Unterminated template");
    }
    const ch = input.charCodeAt(state.pos);
    if (
      ch === charCodes.graveAccent ||
      (ch === charCodes.dollarSign &&
        input.charCodeAt(state.pos + 1) === charCodes.leftCurlyBrace)
    ) {
      if (state.pos === state.start && match(tt.template)) {
        if (ch === charCodes.dollarSign) {
          state.pos += 2;
          finishToken(tt.dollarBraceL);
          return;
        } else {
          ++state.pos;
          finishToken(tt.backQuote);
          return;
        }
      }
      out += input.slice(chunkStart, state.pos);
      finishToken(tt.template, containsInvalid ? null : out);
      return;
    }
    if (ch === charCodes.backslash) {
      out += input.slice(chunkStart, state.pos);
      const escaped = readEscapedChar(true);
      if (escaped === null) {
        containsInvalid = true;
      } else {
        out += escaped;
      }
      chunkStart = state.pos;
    } else if (isNewLine(ch)) {
      out += input.slice(chunkStart, state.pos);
      ++state.pos;
      switch (ch) {
        case charCodes.carriageReturn:
          if (input.charCodeAt(state.pos) === charCodes.lineFeed) {
            ++state.pos;
          }
        case charCodes.lineFeed:
          out += "\n";
          break;
        default:
          out += String.fromCharCode(ch);
          break;
      }
      ++state.curLine;
      state.lineStart = state.pos;
      chunkStart = state.pos;
    } else {
      ++state.pos;
    }
  }
}

// Used to read escaped characters

function readEscapedChar(inTemplate: boolean): string | null {
  const throwOnInvalid = !inTemplate;
  const ch = input.charCodeAt(++state.pos);
  ++state.pos;
  switch (ch) {
    case charCodes.lowercaseN:
      return "\n";
    case charCodes.lowercaseR:
      return "\r";
    case charCodes.lowercaseX: {
      const code = readHexChar(2, throwOnInvalid);
      return code === null ? null : String.fromCharCode(code);
    }
    case charCodes.lowercaseU: {
      const code = readCodePoint(throwOnInvalid);
      return code === null ? null : String.fromCodePoint(code);
    }
    case charCodes.lowercaseT:
      return "\t";
    case charCodes.lowercaseB:
      return "\b";
    case charCodes.lowercaseV:
      return "\u000b";
    case charCodes.lowercaseF:
      return "\f";
    case charCodes.carriageReturn:
      if (input.charCodeAt(state.pos) === charCodes.lineFeed) {
        ++state.pos;
      }
    case charCodes.lineFeed:
      state.lineStart = state.pos;
      ++state.curLine;
    case charCodes.lineSeparator:
    case charCodes.paragraphSeparator:
      return "";
    default:
      if (ch >= charCodes.digit0 && ch <= charCodes.digit7) {
        const codePos = state.pos - 1;
        // $FlowIgnore - match doesn't return null because we check that ch is a digit.
        let octalStr = input.substr(state.pos - 1, 3).match(/^[0-7]+/)[0];
        let octal = parseInt(octalStr, 8);
        if (octal > 255) {
          octalStr = octalStr.slice(0, -1);
          octal = parseInt(octalStr, 8);
        }
        state.pos += octalStr.length - 1;
        const next = input.charCodeAt(state.pos);
        if (
          octalStr !== "0" ||
          next === charCodes.digit8 ||
          next === charCodes.digit9
        ) {
          if (inTemplate) {
            state.invalidTemplateEscapePosition = codePos;
            return null;
          } else if (state.strict) {
            raise(codePos, "Octal literal in strict mode");
          } else if (!state.containsOctal) {
            // These properties are only used to throw an error for an octal which occurs
            // in a directive which occurs prior to a "use strict" directive.
            state.containsOctal = true;
            state.octalPosition = codePos;
          }
        }

        return String.fromCharCode(octal);
      }

      return String.fromCharCode(ch);
  }
}

// Used to read character escape sequences ('\x', '\u').

function readHexChar(len: number, throwOnInvalid: boolean): number | null {
  const codePos = state.pos;
  const n = readInt(16, len);
  if (n === null) {
    if (throwOnInvalid) {
      raise(codePos, "Bad character escape sequence");
    } else {
      state.pos = codePos - 1;
      state.invalidTemplateEscapePosition = codePos - 1;
    }
  }
  return n;
}

// Read an identifier, and return it as a string. Sets `state.containsEsc`
// to whether the word contained a '\u' escape.
//
// Incrementally adds only escaped chars, adding other chunks as-is
// as a micro-optimization.

function readWord1(): string {
  let word = "";
  state.containsEsc = false;
  const start = state.pos;
  let chunkStart = state.pos;

  while (state.pos < length) {
    const ch = input.codePointAt(state.pos);
    if (isIdentifierChar(ch)) {
      state.pos += ch <= 0xffff ? 1 : 2;
    } else if (state.isIterator && ch === charCodes.atSign) {
      ++state.pos;
    } else if (ch === charCodes.backslash) {
      state.containsEsc = true;

      word += input.slice(chunkStart, state.pos);
      const escStart = state.pos;
      const identifierCheck =
        state.pos === start ? isIdentifierStart : isIdentifierChar;

      if (input.charCodeAt(++state.pos) !== charCodes.lowercaseU) {
        raise(state.pos, "Expecting Unicode escape sequence \\uXXXX");
      }

      ++state.pos;
      const esc = readCodePoint(true);

      if (
        // $FlowFixMe (thinks esc may be null, but throwOnInvalid is true)
        !identifierCheck(esc, true)
      ) {
        raise(escStart, "Invalid Unicode escape");
      }

      // $FlowFixMe
      word += String.fromCodePoint(esc);
      chunkStart = state.pos;
    } else {
      break;
    }
  }
  return word + input.slice(chunkStart, state.pos);
}

function isIterator(word: string): boolean {
  return word === "@@iterator" || word === "@@asyncIterator";
}

// Read an identifier or keyword token. Will check for reserved
// words when necessary.

export function readWord(): void {
  const word = readWord1();
  const type = keywordTypes.get(word) || tt.name;

  if (type.keyword && state.containsEsc) {
    raise(state.pos, `Escape sequence in keyword ${word}`);
  }

  // Allow @@iterator and @@asyncIterator as a identifier only inside type
  if (state.isIterator && (!isIterator(word) || !state.inType)) {
    raise(state.pos, `Invalid identifier ${word}`);
  }

  finishToken(type, word);
}

export function braceIsBlock(prevType: TokenType): boolean {
  const parent = curContext();
  if (parent === ct.functionExpression || parent === ct.functionStatement) {
    return true;
  }
  if (
    prevType === tt.colon &&
    (parent === ct.braceStatement || parent === ct.braceExpression)
  ) {
    return !parent.isExpr;
  }

  // The check for `tt.name && exprAllowed` detects whether we are
  // after a `yield` or `of` construct. See the `updateContext` for
  // `tt.name`.
  if (prevType === tt._return || (prevType === tt.name && state.exprAllowed)) {
    return lineBreak.test(input.slice(state.lastTokEnd, state.start));
  }

  if (
    prevType === tt._else ||
    prevType === tt.semi ||
    prevType === tt.eof ||
    prevType === tt.parenR ||
    prevType === tt.arrow
  ) {
    return true;
  }

  if (prevType === tt.braceL) {
    return parent === ct.braceStatement;
  }

  if (prevType === tt._var || prevType === tt._const || prevType === tt.name) {
    return false;
  }

  if (prevType === tt.relational) {
    // `class C<T> { ... }`
    return true;
  }

  return !state.exprAllowed;
}

export function updateContext(prevType: TokenType): void {
  const type = state.type;
  if (type.keyword && (prevType === tt.dot || prevType === tt.questionDot)) {
    state.exprAllowed = false;
  } else if (!contextUpdater(type, prevType)) {
    state.exprAllowed = type.beforeExpr;
  }
}
