// @flow

import type { Node } from "../types";
import { lineBreak, skipWhiteSpace } from "../util/whitespace";
import { types as tt, type TokenType } from "../util/token-types";

import { next, match, eat, lookahead } from "::build-tool::bindings/tokenizer";
import { state, input } from "./index";
import { raise } from "./location";
import { hasPlugin } from "./base";

const literal = /^('|")((?:\\?.)*?)\1/;

// ## Parser utilities

// TODO

export function addExtra(node: Node, key: string, val: any): void {
  if (!node) return;

  const extra = (node.extra = node.extra || {});
  extra[key] = val;
}

// TODO

export function isRelational(op: "<" | ">"): boolean {
  return match(tt.relational) && state.value === op;
}

export function isLookaheadRelational(op: "<" | ">"): boolean {
  const l = lookahead();
  return l.type === tt.relational && l.value === op;
}

// TODO

export function expectRelational(op: "<" | ">"): void {
  if (isRelational(op)) {
    next();
  } else {
    unexpected(null, tt.relational);
  }
}

// eat() for relational operators.

export function eatRelational(op: "<" | ">"): boolean {
  if (isRelational(op)) {
    next();
    return true;
  }
  return false;
}

// Tests whether parsed token is a contextual keyword.

export function isContextual(name: string): boolean {
  return match(tt.name) && state.value === name && !state.containsEsc;
}

export function isLookaheadContextual(name: string): boolean {
  const l = lookahead();
  return l.type === tt.name && l.value === name;
}

// Consumes contextual keyword if possible.

export function eatContextual(name: string): boolean {
  return isContextual(name) && eat(tt.name);
}

// Asserts that following token is given contextual keyword.

export function expectContextual(name: string, message?: string): void {
  if (!eatContextual(name)) unexpected(null, message);
}

// Test whether a semicolon can be inserted at the current position.

export function canInsertSemicolon(): boolean {
  return match(tt.eof) || match(tt.braceR) || hasPrecedingLineBreak();
}

export function hasPrecedingLineBreak(): boolean {
  return lineBreak.test(input.slice(state.lastTokEnd, state.start));
}

// TODO

export function isLineTerminator(): boolean {
  return eat(tt.semi) || canInsertSemicolon();
}

// Consume a semicolon, or, failing that, see if we are allowed to
// pretend that there is a semicolon at this position.

export function semicolon(): void {
  if (!isLineTerminator()) unexpected(null, tt.semi);
}

// Expect a token of a given type. If found, consume it, otherwise,
// raise an unexpected token error at given pos.

export function expect(type: TokenType, pos?: ?number): void {
  eat(type) || unexpected(pos, type);
}

// Throws if the current token and the prev one are separated by a space.
export function assertNoSpace(message: string = "Unexpected space."): void {
  if (state.start > state.lastTokEnd) {
    raise(state.lastTokEnd, message);
  }
}

// Raise an unexpected token error. Can take the expected token type
// instead of a message string.

export function unexpected(
  pos: ?number,
  messageOrType: string | TokenType = "Unexpected token",
): empty {
  if (typeof messageOrType !== "string") {
    messageOrType = `Unexpected token, expected "${messageOrType.label}"`;
  }
  throw raise(pos != null ? pos : state.start, messageOrType);
}

export function expectPlugin(name: string, pos?: ?number): true {
  if (!hasPlugin(name)) {
    throw raise(
      pos != null ? pos : state.start,
      `This experimental syntax requires enabling the parser plugin: '${name}'`,
      { missingPluginNames: [name] },
    );
  }

  return true;
}

export function expectOnePlugin(names: Array<string>, pos?: ?number): void {
  if (!names.some(n => hasPlugin(n))) {
    throw raise(
      pos != null ? pos : state.start,
      `This experimental syntax requires enabling one of the following parser plugin(s): '${names.join(
        ", ",
      )}'`,
      { missingPluginNames: names },
    );
  }
}

export function checkYieldAwaitInDefaultParams() {
  if (state.yieldPos && (!state.awaitPos || state.yieldPos < state.awaitPos)) {
    raise(
      state.yieldPos,
      "Yield cannot be used as name inside a generator function",
    );
  }
  if (state.awaitPos) {
    raise(
      state.awaitPos,
      "Await cannot be used as name inside an async function",
    );
  }
}

export function strictDirective(start: number): boolean {
  for (;;) {
    // Try to find string literal.
    skipWhiteSpace.lastIndex = start;
    // $FlowIgnore
    start += skipWhiteSpace.exec(input)[0].length;
    const match = literal.exec(input.slice(start));
    if (!match) break;
    if (match[2] === "use strict") return true;
    start += match[0].length;

    // Skip semicolon, if any.
    skipWhiteSpace.lastIndex = start;
    // $FlowIgnore
    start += skipWhiteSpace.exec(input)[0].length;
    if (input[start] === ";") {
      start++;
    }
  }

  return false;
}
