import { types as tt } from "../tokenizer/types";
import Parser from "./index";
import { lineBreak } from "../util/whitespace";

const pp = Parser.prototype;

// ## Parser utilities

// Test whether a statement node is the string literal `"use strict"`.

pp.isUseStrict = function (stmt) {
  return stmt.type === "ExpressionStatement" && stmt.expression.type === "Literal" && stmt.expression.raw.slice(1, -1) === "use strict";
};

// Predicate that tests whether the next token is of the given
// type, and if yes, consumes it as a side effect.

pp.eat = function (type) {
  if (this.state.type === type) {
    this.next();
    return true;
  } else {
    return false;
  }
};

// TODO

pp.isRelational = function (op) {
  return this.state.type === tt.relational && this.state.value === op;
};

// TODO

pp.expectRelational = function (op) {
  if (this.isRelational(op)) {
    this.next();
  } else {
    this.unexpected();
  }
};

// Tests whether parsed token is a contextual keyword.

pp.isContextual = function (name) {
  return this.state.type === tt.name && this.state.value === name;
};

// Consumes contextual keyword if possible.

pp.eatContextual = function (name) {
  return this.state.value === name && this.eat(tt.name);
};

// Asserts that following token is given contextual keyword.

pp.expectContextual = function (name) {
  if (!this.eatContextual(name)) this.unexpected();
};

// Test whether a semicolon can be inserted at the current position.

pp.canInsertSemicolon = function () {
  return this.state.type === tt.eof ||
    this.state.type === tt.braceR ||
    lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start));
};

pp.insertSemicolon = function () {
  if (this.canInsertSemicolon()) {
    return true;
  }
};

// Consume a semicolon, or, failing that, see if we are allowed to
// pretend that there is a semicolon at this position.

pp.semicolon = function () {
  if (!this.eat(tt.semi) && !this.insertSemicolon()) this.unexpected();
};

pp.afterTrailingComma = function (tokType) {
  if (this.state.type === tokType) {
    this.next();
    return true;
  }
};

// Expect a token of a given type. If found, consume it, otherwise,
// raise an unexpected token error.

pp.expect = function (type) {
  return this.eat(type) || this.unexpected();
};

// Raise an unexpected token error.

pp.unexpected = function (pos) {
  this.raise(pos != null ? pos : this.state.start, "Unexpected token");
};
