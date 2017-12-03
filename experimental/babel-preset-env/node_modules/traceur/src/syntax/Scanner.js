// Copyright 2012 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {IdentifierToken} from './IdentifierToken.js';
import {JsxIdentifierToken} from './JsxIdentifierToken.js';
import {KeywordToken} from './KeywordToken.js';
import {LiteralToken} from './LiteralToken.js';
import {SourceRange} from '../util/SourceRange.js';
import {Token} from './Token.js';
import {getKeywordType} from './Keywords.js';
import {
  idContinueTable,
  idStartTable
} from './unicode-tables.js';

import {
  AMPERSAND,
  AMPERSAND_EQUAL,
  AND,
  ARROW,
  AT,
  BANG,
  BAR,
  BAR_EQUAL,
  CARET,
  CARET_EQUAL,
  CLOSE_ANGLE,
  CLOSE_CURLY,
  CLOSE_PAREN,
  CLOSE_SQUARE,
  COLON,
  COMMA,
  DOT_DOT_DOT,
  END_OF_FILE,
  EQUAL,
  EQUAL_EQUAL,
  EQUAL_EQUAL_EQUAL,
  ERROR,
  GREATER_EQUAL,
  LEFT_SHIFT,
  LEFT_SHIFT_EQUAL,
  LESS_EQUAL,
  MINUS,
  MINUS_EQUAL,
  MINUS_MINUS,
  NO_SUBSTITUTION_TEMPLATE,
  NOT_EQUAL,
  NOT_EQUAL_EQUAL,
  NUMBER,
  OPEN_ANGLE,
  OPEN_CURLY,
  OPEN_PAREN,
  OPEN_SQUARE,
  OR,
  PERCENT,
  PERCENT_EQUAL,
  PERIOD,
  PLUS,
  PLUS_EQUAL,
  PLUS_PLUS,
  QUESTION,
  REGULAR_EXPRESSION,
  RIGHT_SHIFT,
  RIGHT_SHIFT_EQUAL,
  SEMI_COLON,
  SLASH,
  SLASH_EQUAL,
  STAR,
  STAR_EQUAL,
  STAR_STAR,
  STAR_STAR_EQUAL,
  STRING,
  TEMPLATE_HEAD,
  TEMPLATE_MIDDLE,
  TEMPLATE_TAIL,
  TILDE,
  UNSIGNED_RIGHT_SHIFT,
  UNSIGNED_RIGHT_SHIFT_EQUAL
} from './TokenType.js';

// Some of these is* functions use an array as a lookup table for the lower 7
// bit code points.

let isWhitespaceArray = [];
for (let i = 0; i < 128; i++) {
  isWhitespaceArray[i] = i >= 9 && i <= 13 ||  // Tab - Carriage Return
      i === 0x20;  // Space
}

export function isWhitespace(code) {
  if (code < 128)
    return isWhitespaceArray[code];
  switch (code) {
    case 0xA0:  // No-break space
    case 0xFEFF:  // Byte Order Mark
    case 0x2028:  // Line Separator
    case 0x2029:  // Paragraph Separator
      return true;
  }
  return false;
  // TODO: there are other Unicode 'Zs' chars that should go here.
}

// 7.3 Line Terminators
export function isLineTerminator(code) {
  switch (code) {
    case 10:  // \n Line Feed
    case 13:  // \r Carriage Return
    case 0x2028:  // Line Separator
    case 0x2029:  // Paragraph Separator
      return true;
  }
  return false;
}

function isDecimalDigit(code) {
  return code >= 48 && code <= 57;
}

let isHexDigitArray = [];
for (let i = 0; i < 128; i++) {
  isHexDigitArray[i] = i >= 48 && i <= 57 ||  // 0 - 9
      i >= 65 && i <= 70 ||  // A - F
      i >= 97 && i <= 102; // a - f
}
function isHexDigit(code) {
  return code < 128 && isHexDigitArray[code];
}

function isBinaryDigit(code) {
  return code === 48 || code === 49;
}

function isOctalDigit(code) {
  return code >= 48 && code <= 55;  // 0 - 7
}

let isIdentifierStartArray = [];
for (let i = 0; i < 128; i++) {
  isIdentifierStartArray[i] = i === 36 ||  // $
      i >= 65 && i <= 90 ||  // A - Z
      i === 95 ||  // _
      i >= 97 && i <= 122;  // a - z
}

function isIdentifierStart(code) {
  return code < 128 ? isIdentifierStartArray[code] :
      inTable(idStartTable, code);
}

let isIdentifierPartArray = [];
for (let i = 0; i < 128; i++) {
  isIdentifierPartArray[i] = isIdentifierStart(i) || isDecimalDigit(i);
}

export function isIdentifierPart(code) {
  return code < 128 ? isIdentifierPartArray[code] :
      inTable(idStartTable, code) || inTable(idContinueTable, code) ||
      code === 8204 || code === 8205;  // <ZWNJ>, <ZWJ>
}


function inTable(table, code) {
  for (let i = 0; i < table.length;) {
    if (code < table[i++])
      return false;
    if (code <= table[i++])
      return true;
  }
  return false;
}

function isRegularExpressionChar(code) {
  switch (code) {
    case 47:  // /
      return false;
    case 91:  // [
    case 92:  // \
      return true;
  }
  return !isLineTerminator(code);
}

function isRegularExpressionFirstChar(code) {
  return isRegularExpressionChar(code) && code !== 42;  // *
}

let index, input, length, token, lastToken, lookaheadToken, currentCharCode,
    lineNumberTable, errorReporter, currentParser, options;

/**
 * Scans javascript source code into tokens. All entrypoints assume the
 * caller is not expecting a regular expression literal except for
 * nextRegularExpressionLiteralToken.
 *
 * 7 Lexical Conventions
 *
 * TODO: 7.1 Unicode Format-Control Characters
 */

/**
 * @param {ErrorReport} reporter
 * @param {SourceFile} file
 * @param {Parser} parser
 * @param {Options} traceurOptions
 */
export function init(reporter, file, parser, traceurOptions) {
  // These are all module local variables. It is up to the  caller to ensure
  // that there is only one user of that scanner at the same time.
  errorReporter = reporter;
  lineNumberTable = file.lineNumberTable;
  input = file.contents;
  length = file.contents.length;
  setIndex(0);
  currentParser = parser;
  options = traceurOptions;
}

export function getLastToken() {
  return lastToken;
}

/**
 * Consumes a regular expression literal token and returns it.
 *
 * @return {LiteralToken}
 */
export function nextRegularExpressionLiteralToken() {
  lastToken = nextRegularExpressionLiteralToken2();
  token = scanToken();
  return lastToken;
}

export function nextTemplateLiteralToken() {
  let t = nextTemplateLiteralToken2();
  token = scanToken();
  return t;
}

export function setIndex(i) {
  index = i;
  lastToken = null;
  token = null;
  lookaheadToken = null;
  updateCurrentCharCode();
}

/**
 * @return {SourcePosition}
 */
export function getPosition() {
  return getPositionByOffset(getOffset());
}

/**
 * @return {SourcePosition}
 */
function getPositionByOffset(offset) {
  return lineNumberTable.getSourcePosition(offset);
}

/**
 * Called for the close angle for type generics. This allows type expressions
 * like `Array<Array<number>>` to be parsed as `Array<Array<number> >`.
 */
export function nextCloseAngle() {
  switch (token.type) {
    case GREATER_EQUAL:
    case RIGHT_SHIFT:
    case RIGHT_SHIFT_EQUAL:
    case UNSIGNED_RIGHT_SHIFT:
    case UNSIGNED_RIGHT_SHIFT_EQUAL:
      setIndex(index - token.type.length + 1);
      lastToken = createToken(CLOSE_ANGLE, index);
      token = scanToken();
      return lastToken;
  }
  return nextToken();
}



function getTokenRange(startOffset) {
  return lineNumberTable.getSourceRange(startOffset, index);
}

/** @return {number} */
function getOffset() {
  return token ? token.location.start.offset : index;
}

/** @return {LiteralToken} */
function nextRegularExpressionLiteralToken2() {
  // We already passed the leading / or /= so subtract the length of the last
  // token.
  let beginIndex = index - token.toString().length;

  if (token.type === SLASH_EQUAL) {
    skipRegularExpressionBodyContinuation();
  } else {
    skipRegularExpressionBody(beginIndex);
  }

  // separating /
  if (currentCharCode !== 47) {  // /
    reportError('Expected \'/\' in regular expression literal', beginIndex);
    return new LiteralToken(REGULAR_EXPRESSION,
                            getTokenString(beginIndex),
                            getTokenRange(beginIndex));
  }
  next();

  // flags (note: this supports future regular expression flags)
  while (isIdentifierPart(currentCharCode)) {
    next();
  }

  return new LiteralToken(REGULAR_EXPRESSION,
                          getTokenString(beginIndex),
                          getTokenRange(beginIndex));
}

function skipRegularExpressionBody(beginIndex) {
  if (!isRegularExpressionFirstChar(currentCharCode)) {
    reportError('Expected regular expression first char', beginIndex);
    return;
  }
  skipRegularExpressionBodyContinuation();
}

function skipRegularExpressionBodyContinuation() {
  while (!isAtEnd() && isRegularExpressionChar(currentCharCode)) {
    if (!skipRegularExpressionChar()) {
      return;
    }
  }
}

function skipRegularExpressionChar() {
  switch (currentCharCode) {
    case 92:  // \
      return skipRegularExpressionBackslashSequence();
    case 91:  // [
      return skipRegularExpressionClass();
    default:
      next();
      return true;
  }
}

function skipRegularExpressionBackslashSequence() {
  let beginIndex = index;
  next();
  if (isLineTerminator(currentCharCode) || isAtEnd()) {
    reportError('New line not allowed in regular expression literal',
                beginIndex, index);
    return false;
  }
  next();
  return true;
}

function skipRegularExpressionClass() {
  let beginIndex = index;
  next();
  while (!isAtEnd() && peekRegularExpressionClassChar()) {
    if (!skipRegularExpressionClassChar()) {
      return false;
    }
  }
  if (currentCharCode !== 93) {  // ]
    reportError('\']\' expected', beginIndex, index);
    return false;
  }
  next();
  return true;
}

function peekRegularExpressionClassChar() {
  return currentCharCode !== 93 &&  // ]
      !isLineTerminator(currentCharCode);
}

function skipRegularExpressionClassChar() {
  if (currentCharCode === 92) {  // \
    return skipRegularExpressionBackslashSequence();
  }
  next();
  return true;
}

// LiteralPortion ::
//   LiteralCharacter LiteralPortion
//   ε
//
// LiteralCharacter ::
//   SourceCharacter but not ` or LineTerminator or \ or $
//   LineTerminatorSequence
//   LineContinuation
//   \ EscapeSequence
//   $ [ lookahead not { ]
//
// TemplateCharacter ::
//   SourceCharacter but not one of ` or \ or $
//   $ [lookahead not { ]
//   \ EscapeSequence
//   LineContinuation
//
function skipTemplateCharacter() {
  while (!isAtEnd()) {
    switch (currentCharCode) {
      case 96:  // `
        return;
      case 92:  // \
        skipStringLiteralEscapeSequence();
        break;
      case 36: {  // $
        let code = input.charCodeAt(index + 1);
        if (code === 123)  // {
          return;
        next();
        break;
      }
      default:
        next();
    }
  }
}

/**
 * Either returns a NO_SUBSTITUTION_TEMPLATE or TEMPLATE_HEAD token.
 */
function scanTemplateStart(beginIndex) {
  if (isAtEnd()) {
    reportError('Unterminated template literal', beginIndex, index);
    return lastToken = createToken(END_OF_FILE, beginIndex);
  }

  return nextTemplateLiteralTokenShared(NO_SUBSTITUTION_TEMPLATE,
                                        TEMPLATE_HEAD);
}

/**
 * Either returns a TEMPLATE_TAIL or TEMPLATE_MIDDLE token.
 */
function nextTemplateLiteralToken2() {
  if (isAtEnd()) {
    reportError('Expected \'}\' after expression in template literal',
                index, index);
    return createToken(END_OF_FILE, index);
  }

  if (token.type !== CLOSE_CURLY) {
    reportError('Expected \'}\' after expression in template literal',
                index, index);
    return createToken(ERROR, index);
  }

  return nextTemplateLiteralTokenShared(TEMPLATE_TAIL, TEMPLATE_MIDDLE);
}

function nextTemplateLiteralTokenShared(endType, middleType) {
  let beginIndex = index;

  skipTemplateCharacter();

  if (isAtEnd()) {
    reportError('Unterminated template literal');
    return createToken(ERROR, beginIndex);
  }

  let value = getTokenString(beginIndex);

  switch (currentCharCode) {
    case  96:  // `
      next();
      return lastToken = new LiteralToken(endType,
                                          value,
                                          getTokenRange(beginIndex - 1));
      case 36:  // $
      next();  // $
      next();  // {
      return lastToken = new LiteralToken(middleType,
                                          value,
                                          getTokenRange(beginIndex - 1));
  }
}


/**
 * Returns the next JSX token. Does not consume any tokens.
 *
 * @return {Token}
 */
export function peekJsxToken() {
  return token || (token = scanJsxToken());
}

export function nextJsxToken() {
  lastToken = peekJsxToken();
  token = null;
  return lastToken;

}

/**
 * Used to scan for a JSXIdentifier.
 */
function scanJsxToken() {
  skipComments();
  let beginIndex = index;
  switch (currentCharCode) {
    case 34:  // "
    case 39:  // '
      return scanJsxStringLiteral(beginIndex, currentCharCode);
    case 62:  // >
      next();
      return createToken(CLOSE_ANGLE, beginIndex);
    // case 123:  // {
    // case 125:  // }
  }

  if (!isIdentifierStart(currentCharCode)) {
    return scanToken();
  }
  next();
  while (isIdentifierPart(currentCharCode) || currentCharCode === 45) {  // '-'
    next();
  }
  let value = input.slice(beginIndex, index);
  return new JsxIdentifierToken(getTokenRange(beginIndex), value);
}

function scanJsxStringLiteral(beginIndex, terminator) {
  next();
  while (!isAtEnd() && currentCharCode !== terminator) {
    next();
  }
  if (currentCharCode !== terminator) {
    reportError('Unterminated String Literal', beginIndex);
  } else {
    next();
  }
  return new LiteralToken(STRING,
                          getTokenString(beginIndex),
                          getTokenRange(beginIndex));
}

export function nextJsxTextToken() {
  lastToken = token || scanJsxTextToken();
  token = null;
  return lastToken;
}

function skipJsxText() {
  while (!isAtEnd() && peekJsxText()) {
    next();
  }
}

function isJsxTextChar(code) {
  switch (code) {
    case 60:  // <
    case 123:  // {
      return false;
  }
  return true;
}

function skipJsxText() {
  while (!isAtEnd() && isJsxTextChar(currentCharCode)) {
    next();
  }
}

function scanJsxTextToken() {
  let beginIndex = index;

  if (isAtEnd()) {
    return createToken(END_OF_FILE, beginIndex);
  }

  skipJsxText();

  if (beginIndex === index) {
    switch (currentCharCode) {
      case 60:  // <
        next();
        return createToken(OPEN_ANGLE, beginIndex);
      case 123:  // {
        next();
        return createToken(OPEN_CURLY, beginIndex);
    }
  }

  return new LiteralToken(STRING,
                          getTokenString(beginIndex),
                          getTokenRange(beginIndex));
}


/**
 * Consumes the next token and returns it. Will return a never ending stream of
 * END_OF_FILE at the end of the file so callers don't have to check for EOF
 * explicitly.
 *
 * @return {Token}
 */
export function nextToken() {
  let t = peekToken();
  token = lookaheadToken || scanToken();
  lookaheadToken = null;
  lastToken = t;
  return t;
}

/**
 * Peeks the next token ensuring that there is no line terminator before it.
 * This is done by checking the preceding characters for new lines.
 * @return {Token} This returns null if no token is found before the next
 *     line terminator.
 */
export function peekTokenNoLineTerminator() {
  // Search the text between lastToken and next token.
  let t = peekToken();
  let start = lastToken.location.end.offset;
  let end = t.location.start.offset;
  for (let i = start; i < end; i++) {
    // Any newline counts; a new line inside a block comment, the new line
    // at the end of a line comment as well as a new line as a whitespace.
    if (isLineTerminator(input.charCodeAt(i))) {
      return null;
    }
  }
  return t;
}

/**
 * Returns true if the next token is of the expected type. Does not consume
 * any tokens.
 *
 * @param {TokenType} expectedType
 * @return {boolean}
 */
export function peek(expectedType) {
  return peekToken().type === expectedType;
}

export function peekLookahead(expectedType) {
  return peekTokenLookahead().type === expectedType;
}

/**
 * Returns the next token. Does not consume any tokens.
 *
 * @return {Token}
 */
export function peekToken() {
  return token || (token = scanToken());
}

/**
 * Returns the TokenType of the next token. Does not consume any tokens.
 *
 * @return {TokenType}
 */
export function peekType() {
  return peekToken().type;
}

/**
 * Returns the SourceRange of the next token. Does not consume any tokens.
 *
 * @return {SourceRange}
 */
export function peekLocation() {
  return peekToken().location;
}

// This is optimized to do one lookahead vs current in |peekToken_|.
export function peekTokenLookahead() {
  if (!token)
    token = scanToken();
  if (!lookaheadToken)
    lookaheadToken = scanToken();
  return lookaheadToken;
}

// 7.2 White Space
function skipWhitespace() {
  while (!isAtEnd() && peekWhitespace()) {
    next();
  }
}

function peekWhitespace() {
  return isWhitespace(currentCharCode);
}

// 7.4 Comments
function skipComments() {
  while (skipComment()) {}
}

function skipComment() {
  skipWhitespace();
  let code = currentCharCode;
  if (code === 47) {  // /
    code = input.charCodeAt(index + 1);
    switch (code) {
      case 47:  // /
        skipSingleLineComment();
        return true;
      case 42:  // *
        skipMultiLineComment();
        return true;
    }
  }
  return false;
}

function commentCallback(start, index) {
 if (options.commentCallback)
    currentParser.handleComment(lineNumberTable.getSourceRange(start, index));
}

function skipSingleLineComment() {
  let start = index;
  // skip '//'
  index += 2;
  while (!isAtEnd() && !isLineTerminator(input.charCodeAt(index++))) {}
  updateCurrentCharCode();
  commentCallback(start, index);
}

function skipMultiLineComment() {
  let start = index;
  let i = input.indexOf('*/', index + 2);
  if (i !== -1)
    index = i + 2;
  else
    index = length;
  updateCurrentCharCode();
  commentCallback(start, index);
}

/**
 * @return {Token}
 */
function scanToken() {
  skipComments();
  let beginIndex = index;
  if (isAtEnd())
    return createToken(END_OF_FILE, beginIndex);

  let code = currentCharCode;
  next();

  switch (code) {
    case 123:  // {
      return createToken(OPEN_CURLY, beginIndex);
    case 125:  // }
      return createToken(CLOSE_CURLY, beginIndex);
    case 40:  // (
      return createToken(OPEN_PAREN, beginIndex);
    case 41:  // )
      return createToken(CLOSE_PAREN, beginIndex);
    case 91:  // [
      return createToken(OPEN_SQUARE, beginIndex);
    case 93:  // ]
      return createToken(CLOSE_SQUARE, beginIndex);
    case 46:  // .
      switch (currentCharCode) {
        case 46:  // .
          // Harmony spread operator
          if (input.charCodeAt(index + 1) === 46) {
            next();
            next();
            return createToken(DOT_DOT_DOT, beginIndex);
          }
          break;
        default:
          if (isDecimalDigit(currentCharCode))
            return scanNumberPostPeriod(beginIndex);
      }

      return createToken(PERIOD, beginIndex);
    case 59:  // ;
      return createToken(SEMI_COLON, beginIndex);
    case 44:  // ,
      return createToken(COMMA, beginIndex);
    case 126:  // ~
      return createToken(TILDE, beginIndex);
    case 63:  // ?
      return createToken(QUESTION, beginIndex);
    case 58:  // :
      return createToken(COLON, beginIndex);
    case 60:  // <
      switch (currentCharCode) {
        case 60:  // <
          next();
          if (currentCharCode === 61) {  // =
            next();
            return createToken(LEFT_SHIFT_EQUAL, beginIndex);
          }
          return createToken(LEFT_SHIFT, beginIndex);
        case 61:  // =
          next();
          return createToken(LESS_EQUAL, beginIndex);
        default:
          return createToken(OPEN_ANGLE, beginIndex);
      }
    case 62:  // >
      switch (currentCharCode) {
        case 62:  // >
          next();
          switch (currentCharCode) {
            case 61:  // =
              next();
              return createToken(RIGHT_SHIFT_EQUAL, beginIndex);
            case 62:  // >
              next();
              if (currentCharCode === 61) { // =
                next();
                return createToken(
                    UNSIGNED_RIGHT_SHIFT_EQUAL, beginIndex);
              }
              return createToken(UNSIGNED_RIGHT_SHIFT, beginIndex);
            default:
              return createToken(RIGHT_SHIFT, beginIndex);
          }
        case 61:  // =
          next();
          return createToken(GREATER_EQUAL, beginIndex);
        default:
          return createToken(CLOSE_ANGLE, beginIndex);
      }
    case 61:  // =
      if (currentCharCode === 61) {  // =
        next();
        if (currentCharCode === 61) {  // =
          next();
          return createToken(EQUAL_EQUAL_EQUAL, beginIndex);
        }
        return createToken(EQUAL_EQUAL, beginIndex);
      }
      if (currentCharCode === 62 && options.arrowFunctions) {  // >
        next();
        return createToken(ARROW, beginIndex);
      }
      return createToken(EQUAL, beginIndex);
    case 33:  // !
      if (currentCharCode === 61) {  // =
        next();
        if (currentCharCode === 61) {  // =
          next();
          return createToken(NOT_EQUAL_EQUAL, beginIndex);
        }
        return createToken(NOT_EQUAL, beginIndex);
      }
      return createToken(BANG, beginIndex);
    case 42:  // *
      if (currentCharCode === 61) {  // =
        next();
        return createToken(STAR_EQUAL, beginIndex);
      }
      if (currentCharCode === 42 && options.exponentiation) {
        next();
        if (currentCharCode === 61) {  // =
          next();
          return createToken(STAR_STAR_EQUAL, beginIndex);
        }
        return createToken(STAR_STAR, beginIndex);
      }
      return createToken(STAR, beginIndex);
    case 37:  // %
      if (currentCharCode === 61) {  // =
        next();
        return createToken(PERCENT_EQUAL, beginIndex);
      }
      return createToken(PERCENT, beginIndex);
    case 94:  // ^
      if (currentCharCode === 61) {  // =
        next();
        return createToken(CARET_EQUAL, beginIndex);
      }
      return createToken(CARET, beginIndex);
    case 47:  // /
      if (currentCharCode === 61) {  // =
        next();
        return createToken(SLASH_EQUAL, beginIndex);
      }
      return createToken(SLASH, beginIndex);
    case 43:  // +
      switch (currentCharCode) {
        case 43:  // +
          next();
          return createToken(PLUS_PLUS, beginIndex);
        case 61: // =:
          next();
          return createToken(PLUS_EQUAL, beginIndex);
        default:
          return createToken(PLUS, beginIndex);
      }
    case 45:  // -
      switch (currentCharCode) {
        case 45: // -
          next();
          return createToken(MINUS_MINUS, beginIndex);
        case 61:  // =
          next();
          return createToken(MINUS_EQUAL, beginIndex);
        default:
          return createToken(MINUS, beginIndex);
      }
    case 38:  // &
      switch (currentCharCode) {
        case 38:  // &
          next();
          return createToken(AND, beginIndex);
        case 61:  // =
          next();
          return createToken(AMPERSAND_EQUAL, beginIndex);
        default:
          return createToken(AMPERSAND, beginIndex);
      }
    case 124:  // |
      switch (currentCharCode) {
        case 124:  // |
          next();
          return createToken(OR, beginIndex);
        case 61:  // =
          next();
          return createToken(BAR_EQUAL, beginIndex);
        default:
          return createToken(BAR, beginIndex);
      }
    case 96:  // `
      return scanTemplateStart(beginIndex);
    case 64:  // @
      return createToken(AT, beginIndex);

      // TODO: add NumberToken
      // TODO: character following NumericLiteral must not be an
      //       IdentifierStart or DecimalDigit
    case 48:  // 0
      return scanPostZero(beginIndex);
    case 49:  // 1
    case 50:  // 2
    case 51:  // 3
    case 52:  // 4
    case 53:  // 5
    case 54:  // 6
    case 55:  // 7
    case 56:  // 8
    case 57:  // 9
      return scanPostDigit(beginIndex);
    case 34:  // "
    case 39:  // '
      return scanStringLiteral(beginIndex, code);
    default:
      return scanIdentifierOrKeyword(beginIndex, code);
  }
}

/**
 * @return {Token}
 */
function scanNumberPostPeriod(beginIndex) {
  skipDecimalDigits();
  return scanExponentOfNumericLiteral(beginIndex);
}

/**
 * @return {Token}
 */
function scanPostDigit(beginIndex) {
  skipDecimalDigits();
  return scanFractionalNumericLiteral(beginIndex);
}

/**
 * @return {Token}
 */
function scanPostZero(beginIndex) {
  switch (currentCharCode) {
    case 46:  // .
      return scanFractionalNumericLiteral(beginIndex);

    case 88:  // X
    case 120:  // x
      next();
      if (!isHexDigit(currentCharCode)) {
        reportError('Hex Integer Literal must contain at least one digit',
                    beginIndex);
      }
      skipHexDigits();
      return new LiteralToken(NUMBER,
                              getTokenString(beginIndex),
                              getTokenRange(beginIndex));

    case 66:  // B
    case 98:  // b
      if (!options.numericLiterals)
        break;

      next();
      if (!isBinaryDigit(currentCharCode)) {
        reportError('Binary Integer Literal must contain at least one digit',
                    beginIndex);
      }
      skipBinaryDigits();
      return new LiteralToken(NUMBER,
                              getTokenString(beginIndex),
                              getTokenRange(beginIndex));

    case 79:  // O
    case 111:  // o
      if (!options.numericLiterals)
        break;

      next();
      if (!isOctalDigit(currentCharCode)) {
        reportError('Octal Integer Literal must contain at least one digit',
                    beginIndex);
      }
      skipOctalDigits();
      return new LiteralToken(NUMBER,
                              getTokenString(beginIndex),
                              getTokenRange(beginIndex));

    case 48:  // 0
    case 49:  // 1
    case 50:  // 2
    case 51:  // 3
    case 52:  // 4
    case 53:  // 5
    case 54:  // 6
    case 55:  // 7
    case 56:  // 8
    case 57:  // 9
      return scanPostDigit(beginIndex);
  }

  return new LiteralToken(NUMBER,
                          getTokenString(beginIndex),
                          getTokenRange(beginIndex));
}

/**
 * @param {TokenType} type
 * @param {number} beginIndex
 * @return {Token}
 */
function createToken(type, beginIndex) {
  return new Token(type, getTokenRange(beginIndex));
}

function readUnicodeEscapeSequence() {
  let beginIndex = index;
  if (currentCharCode === 117) {  // u
    next();
    if (skipHexDigit() && skipHexDigit() &&
        skipHexDigit() && skipHexDigit()) {
      return parseInt(getTokenString(beginIndex + 1), 16);
    }
  }

  reportError('Invalid unicode escape sequence in identifier', beginIndex - 1);

  return 0;
}

/**
 * @param {number} beginIndex
 * @param {number} code
 * @return {Token}
 */
function scanIdentifierOrKeyword(beginIndex, code) {
  // Keep track of any unicode escape sequences.
  let escapedCharCodes;
  if (code === 92) {  // \
    code = readUnicodeEscapeSequence();
    escapedCharCodes = [code];
  }

  if (!isIdentifierStart(code)) {
    reportError(
        `Character code '${code}' is not a valid identifier start char`,
        beginIndex);
    return createToken(ERROR, beginIndex);
  }

  for (;;) {
    code = currentCharCode;
    if (isIdentifierPart(code)) {
      next();
    } else if (code === 92) {  // \
      next();
      code = readUnicodeEscapeSequence();
      if (!escapedCharCodes)
        escapedCharCodes = [];
      escapedCharCodes.push(code);
      if (!isIdentifierPart(code))
        return createToken(ERROR, beginIndex);
    } else {
      break;
    }
  }

  let value = input.slice(beginIndex, index);
  let keywordType = getKeywordType(value);
  if (keywordType)
    return new KeywordToken(value, keywordType, getTokenRange(beginIndex));

  if (escapedCharCodes) {
    let i = 0;
    value = value.replace(/\\u..../g, function(s) {
      return String.fromCharCode(escapedCharCodes[i++]);
    });
  }

  return new IdentifierToken(getTokenRange(beginIndex), value);
}

/**
 * @return {Token}
 */
function scanStringLiteral(beginIndex, terminator) {
  while (peekStringLiteralChar(terminator)) {
    if (!skipStringLiteralChar()) {
      return new LiteralToken(STRING,
                              getTokenString(beginIndex),
                              getTokenRange(beginIndex));
    }
  }
  if (currentCharCode !== terminator) {
    reportError('Unterminated String Literal', beginIndex);
  } else {
    next();
  }
  return new LiteralToken(STRING,
                          getTokenString(beginIndex),
                          getTokenRange(beginIndex));
}

function getTokenString(beginIndex) {
  return input.substring(beginIndex, index);
}

function peekStringLiteralChar(terminator) {
  return !isAtEnd() && currentCharCode !== terminator &&
      !isLineTerminator(currentCharCode);
}

function skipStringLiteralChar() {
  if (currentCharCode === 92) {
    return skipStringLiteralEscapeSequence();
  }
  next();
  return true;
}

function skipStringLiteralEscapeSequence() {
  next(); // \
  if (isAtEnd()) {
    reportError('Unterminated string literal escape sequence');
    return false;
  }

  if (isLineTerminator(currentCharCode)) {
    skipLineTerminator();
    return true;
  }

  let code = currentCharCode;
  next();
  switch (code) {
    case 39:  // '
    case 34:  // "
    case 92:  // \
    case 98:  // b
    case 102:  // f
    case 110:  // n
    case 114:  // r
    case 116:  // t
    case 118:  // v
    case 48:  // 0
      return true;
    case 120:  // x
      return skipHexDigit() && skipHexDigit();
    case 117:  // u
      return skipUnicodeEscapeSequence();
    default:
      return true;
  }
}

function skipUnicodeEscapeSequence() {
  if (currentCharCode === 123 && options.unicodeEscapeSequences) {  // {
    next();
    let beginIndex = index;

    if (!isHexDigit(currentCharCode)) {
      reportError('Hex digit expected', beginIndex);
      return false;
    }

    skipHexDigits();

    if (currentCharCode !== 125) {  // }
      reportError('Hex digit expected', beginIndex);
      return false;
    }

    let codePoint = getTokenString(beginIndex, index);
    if (parseInt(codePoint, 16) > 0x10FFFF) { // 11.8.4.1
      reportError(
          'The code point in a Unicode escape sequence cannot exceed 10FFFF',
          beginIndex);
      return false;
    }

    next();
    return true;
  }
  return skipHexDigit() && skipHexDigit() &&
      skipHexDigit() && skipHexDigit();
}

function skipHexDigit() {
  if (!isHexDigit(currentCharCode)) {
    reportError('Hex digit expected');
    return false;
  }
  next();
  return true;
}

function skipLineTerminator() {
  let first = currentCharCode;
  next();
  if (first === 13 && currentCharCode === 10) {  // \r and \n
    next();
  }
}

/**
 * @return {LiteralToken}
 */
function scanFractionalNumericLiteral(beginIndex) {
  if (currentCharCode === 46) {  // .
    next();
    skipDecimalDigits();
  }
  return scanExponentOfNumericLiteral(beginIndex);
}

/**
 * @return {LiteralToken}
 */
function scanExponentOfNumericLiteral(beginIndex) {
  switch (currentCharCode) {
    case 101:  // e
    case 69:  // E
      next();
      switch (currentCharCode) {
        case 43:  // +
        case 45:  // -
          next();
          break;
      }
      if (!isDecimalDigit(currentCharCode)) {
        reportError('Exponent part must contain at least one digit',
                    beginIndex);
      }
      skipDecimalDigits();
      break;
    default:
      break;
  }
  return new LiteralToken(NUMBER,
                          getTokenString(beginIndex),
                          getTokenRange(beginIndex));
}

function skipDecimalDigits() {
  while (isDecimalDigit(currentCharCode)) {
    next();
  }
}

function skipHexDigits() {
  while (isHexDigit(currentCharCode)) {
    next();
  }
}

function skipBinaryDigits() {
  while (isBinaryDigit(currentCharCode)) {
    next();
  }
}

function skipOctalDigits() {
  while (isOctalDigit(currentCharCode)) {
    next();
  }
}

export function isAtEnd() {
  return index === length;
}

function next() {
  index++;
  updateCurrentCharCode();
}

function updateCurrentCharCode() {
  currentCharCode = input.charCodeAt(index);
}

function reportError(message, startIndex = index, endIndex = index) {
  let start = getPositionByOffset(startIndex);
  let end = getPositionByOffset(endIndex);
  let location = new SourceRange(start, end);
  errorReporter.reportError(location, message);
}
