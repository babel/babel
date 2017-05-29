// @flow

import { types as tt, type TokenType } from "../tokenizer/types";
import Tokenizer from "../tokenizer";
import type { Node } from "../types";
import { lineBreak } from "../util/whitespace";

// ## Parser utilities

export default class UtilParser extends Tokenizer {
  // TODO

  addExtra(node: Node, key: string, val: any): void {
    if (!node) return;

    const extra = node.extra = node.extra || {};
    extra[key] = val;
  }

  // TODO

  isRelational(op: "<" | ">"): boolean {
    return this.match(tt.relational) && this.state.value === op;
  }

  // TODO

  expectRelational(op: "<" | ">"): void {
    if (this.isRelational(op)) {
      this.next();
    } else {
      this.unexpected(null, tt.relational);
    }
  }

  // Tests whether parsed token is a contextual keyword.

  isContextual(name: string): boolean {
    return this.match(tt.name) && this.state.value === name;
  }

  // Consumes contextual keyword if possible.

  eatContextual(name: string): boolean {
    return this.state.value === name && this.eat(tt.name);
  }

  // Asserts that following token is given contextual keyword.

  expectContextual(name: string, message?: string): void {
    if (!this.eatContextual(name)) this.unexpected(null, message);
  }

  // Test whether a semicolon can be inserted at the current position.

  canInsertSemicolon(): boolean {
    return this.match(tt.eof) ||
      this.match(tt.braceR) ||
      lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start));
  }

  // TODO

  isLineTerminator(): boolean {
    return this.eat(tt.semi) || this.canInsertSemicolon();
  }

  // Consume a semicolon, or, failing that, see if we are allowed to
  // pretend that there is a semicolon at this position.

  semicolon(): void {
    if (!this.isLineTerminator()) this.unexpected(null, tt.semi);
  }

  // Expect a token of a given type. If found, consume it, otherwise,
  // raise an unexpected token error at given pos.

  expect(type: TokenType, pos?: ?number): void {
    this.eat(type) || this.unexpected(pos, type);
  }

  // Raise an unexpected token error. Can take the expected token type
  // instead of a message string.

  unexpected(pos: ?number, messageOrType: string | TokenType = "Unexpected token"): empty {
    if (typeof messageOrType !== "string") {
      messageOrType = `Unexpected token, expected ${messageOrType.label}`;
    }
    throw this.raise(pos != null ? pos : this.state.start, messageOrType);
  }
}
