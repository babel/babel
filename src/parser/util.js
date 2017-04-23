import { types as tt } from "../tokenizer/types";
import Tokenizer from "../tokenizer";
import { lineBreak } from "../util/whitespace";

// ## Parser utilities

export default class UtilParser extends Tokenizer {
  // TODO

  addExtra(node, key, val) {
    if (!node) return;

    const extra = node.extra = node.extra || {};
    extra[key] = val;
  }

  // TODO

  isRelational(op) {
    return this.match(tt.relational) && this.state.value === op;
  }

  // TODO

  expectRelational(op) {
    if (this.isRelational(op)) {
      this.next();
    } else {
      this.unexpected(null, tt.relational);
    }
  }

  // Tests whether parsed token is a contextual keyword.

  isContextual(name) {
    return this.match(tt.name) && this.state.value === name;
  }

  // Consumes contextual keyword if possible.

  eatContextual(name) {
    return this.state.value === name && this.eat(tt.name);
  }

  // Asserts that following token is given contextual keyword.

  expectContextual(name, message) {
    if (!this.eatContextual(name)) this.unexpected(null, message);
  }

  // Test whether a semicolon can be inserted at the current position.

  canInsertSemicolon() {
    return this.match(tt.eof) ||
      this.match(tt.braceR) ||
      lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start));
  }

  // TODO

  isLineTerminator() {
    return this.eat(tt.semi) || this.canInsertSemicolon();
  }

  // Consume a semicolon, or, failing that, see if we are allowed to
  // pretend that there is a semicolon at this position.

  semicolon() {
    if (!this.isLineTerminator()) this.unexpected(null, tt.semi);
  }

  // Expect a token of a given type. If found, consume it, otherwise,
  // raise an unexpected token error at given pos.

  expect(type, pos) {
    return this.eat(type) || this.unexpected(pos, type);
  }

  // Raise an unexpected token error. Can take the expected token type
  // instead of a message string.

  unexpected(pos, messageOrType = "Unexpected token") {
    if (messageOrType && typeof messageOrType === "object" && messageOrType.label) {
      messageOrType = `Unexpected token, expected ${messageOrType.label}`;
    }
    this.raise(pos != null ? pos : this.state.start, messageOrType);
  }
}
