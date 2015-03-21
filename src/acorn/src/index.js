// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
// various contributors and released under an MIT license.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/marijnh/acorn/issues
//
// This file defines the main parser interface. The library also comes
// with a [error-tolerant parser][dammit] and an
// [abstract syntax tree walker][walk], defined in other files.
//
// [dammit]: acorn_loose.js
// [walk]: util/walk.js

import {Parser} from "./state"
import {getOptions} from "./options"
import "./parseutil"
import "./statement"
import "./lval"
import "./expression"
import "./lookahead"

export {Parser, plugins} from "./state"
export {defaultOptions} from "./options"
export {SourceLocation} from "./location"
export {getLineInfo} from "./location"
export {Node} from "./node"
export {TokenType, types as tokTypes} from "./tokentype"
export {TokContext, types as tokContexts} from "./tokencontext"
export {isIdentifierChar, isIdentifierStart} from "./identifier"
export {Token} from "./tokenize"
export {isNewLine, lineBreak, lineBreakG} from "./whitespace"

import "../plugins/flow";
import "../plugins/jsx";

export const version = "1.0.0"

// The main exported interface (under `self.acorn` when in the
// browser) is a `parse` function that takes a code string and
// returns an abstract syntax tree as specified by [Mozilla parser
// API][api].
//
// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

export function parse(input, options) {
  let p = parser(options, input)
  let startPos = p.options.locations ? [p.pos, p.curPosition()] : p.pos
  p.nextToken()
  return p.parseTopLevel(p.options.program || p.startNodeAt(startPos))
}

// This function tries to parse a single expression at a given
// offset in a string. Useful for parsing mixed-language formats
// that embed JavaScript expressions.

export function parseExpressionAt(input, pos, options) {
  let p = parser(options, input, pos)
  p.nextToken()
  return p.parseExpression()
}

// Acorn is organized as a tokenizer and a recursive-descent parser.
// The `tokenize` export provides an interface to the tokenizer.
// Because the tokenizer is optimized for being efficiently used by
// the Acorn parser itself, this interface is somewhat crude and not
// very modular.

export function tokenizer(input, options) {
  return parser(options, input)
}

function parser(options, input) {
  return new Parser(getOptions(options), String(input))
}
