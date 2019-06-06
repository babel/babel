// @flow

import { types as tt, type TokenType } from "../tokenizer/types";
import Tokenizer from "../tokenizer";
import type { Node } from "../types";
import { lineBreak, skipWhiteSpace } from "../util/whitespace";

const literal = /^('|")((?:\\?.)*?)\1/;

// ## Parser utilities

export default class UtilParser extends Tokenizer {
  // TODO

  addExtra(node: Node, key: string, val: any): void {
    if (!node) return;

    const extra = (node.extra = node.extra || {});
    extra[key] = val;
  }

  // TODO

  isRelational(op: "<" | ">"): boolean {
    return this.match(tt.relational) && this.state.value === op;
  }

  isLookaheadRelational(op: "<" | ">"): boolean {
    const l = this.lookahead();
    return l.type === tt.relational && l.value === op;
  }

  // TODO

  expectRelational(op: "<" | ">"): void {
    if (this.isRelational(op)) {
      this.next();
    } else {
      this.unexpected(null, tt.relational);
    }
  }

  // eat() for relational operators.

  eatRelational(op: "<" | ">"): boolean {
    if (this.isRelational(op)) {
      this.next();
      return true;
    }
    return false;
  }

  // Tests whether parsed token is a contextual keyword.

  isContextual(name: string): boolean {
    return (
      this.match(tt.name) &&
      this.state.value === name &&
      !this.state.containsEsc
    );
  }

  isLookaheadContextual(name: string): boolean {
    const l = this.lookahead();
    return l.type === tt.name && l.value === name;
  }

  // Consumes contextual keyword if possible.

  eatContextual(name: string): boolean {
    return this.isContextual(name) && this.eat(tt.name);
  }

  // Asserts that following token is given contextual keyword.

  expectContextual(name: string, message?: string): void {
    if (!this.eatContextual(name)) this.unexpected(null, message);
  }

  // Test whether a semicolon can be inserted at the current position.

  canInsertSemicolon(): boolean {
    return (
      this.match(tt.eof) ||
      this.match(tt.braceR) ||
      this.hasPrecedingLineBreak()
    );
  }

  hasPrecedingLineBreak(): boolean {
    return lineBreak.test(
      this.input.slice(this.state.lastTokEnd, this.state.start),
    );
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

  // Throws if the current token and the prev one are separated by a space.
  assertNoSpace(message: string = "Unexpected space."): void {
    if (this.state.start > this.state.lastTokEnd) {
      this.raise(this.state.lastTokEnd, message);
    }
  }

  // Raise an unexpected token error. Can take the expected token type
  // instead of a message string.

  unexpected(
    pos: ?number,
    messageOrType: string | TokenType = "Unexpected token",
  ): empty {
    if (typeof messageOrType !== "string") {
      messageOrType = `Unexpected token, expected "${messageOrType.label}"`;
    }
    throw this.raise(pos != null ? pos : this.state.start, messageOrType);
  }

  expectPlugin(name: string, pos?: ?number): true {
    if (!this.hasPlugin(name)) {
      throw this.raise(
        pos != null ? pos : this.state.start,
        `This experimental syntax requires enabling the parser plugin: '${name}'`,
        { missingPluginNames: [name] },
      );
    }

    return true;
  }

  expectOnePlugin(names: Array<string>, pos?: ?number): void {
    if (!names.some(n => this.hasPlugin(n))) {
      throw this.raise(
        pos != null ? pos : this.state.start,
        `This experimental syntax requires enabling one of the following parser plugin(s): '${names.join(
          ", ",
        )}'`,
        { missingPluginNames: names },
      );
    }
  }

  checkYieldAwaitInDefaultParams() {
    if (
      this.state.yieldPos &&
      (!this.state.awaitPos || this.state.yieldPos < this.state.awaitPos)
    ) {
      this.raise(
        this.state.yieldPos,
        "Yield cannot be used as name inside a generator function",
      );
    }
    if (this.state.awaitPos) {
      this.raise(
        this.state.awaitPos,
        "Await cannot be used as name inside an async function",
      );
    }
  }

  strictDirective(start: number): boolean {
    for (;;) {
      // Try to find string literal.
      skipWhiteSpace.lastIndex = start;
      // $FlowIgnore
      start += skipWhiteSpace.exec(this.input)[0].length;
      const match = literal.exec(this.input.slice(start));
      if (!match) break;
      if (match[2] === "use strict") return true;
      start += match[0].length;

      // Skip semicolon, if any.
      skipWhiteSpace.lastIndex = start;
      // $FlowIgnore
      start += skipWhiteSpace.exec(this.input)[0].length;
      if (this.input[start] === ";") {
        start++;
      }
    }

    return false;
  }
}
