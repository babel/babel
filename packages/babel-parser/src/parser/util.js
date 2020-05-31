// @flow

import { types as tt, type TokenType } from "../tokenizer/types";
import Tokenizer from "../tokenizer";
import State from "../tokenizer/state";
import type { Node } from "../types";
import { lineBreak } from "../util/whitespace";
import { isIdentifierChar } from "../util/identifier";
import * as charCodes from "charcodes";
import { Errors } from "./error";

type TryParse<Node, Error, Thrown, Aborted, FailState> = {
  node: Node,
  error: Error,
  thrown: Thrown,
  aborted: Aborted,
  failState: FailState,
};

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
    const next = this.nextTokenStart();
    if (this.input.charAt(next) === op) {
      if (next + 1 === this.input.length) {
        return true;
      }
      const afterNext = this.input.charCodeAt(next + 1);
      return afterNext !== op.charCodeAt(0) && afterNext !== charCodes.equalsTo;
    }
    return false;
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
    return (
      this.match(tt.name) &&
      this.state.value === name &&
      !this.state.containsEsc
    );
  }

  isUnparsedContextual(nameStart: number, name: string): boolean {
    const nameEnd = nameStart + name.length;
    return (
      this.input.slice(nameStart, nameEnd) === name &&
      (nameEnd === this.input.length ||
        !isIdentifierChar(this.input.charCodeAt(nameEnd)))
    );
  }

  isLookaheadContextual(name: string): boolean {
    const next = this.nextTokenStart();
    return this.isUnparsedContextual(next, name);
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
      throw this.raiseWithData(
        pos != null ? pos : this.state.start,
        { missingPlugin: [name] },
        `This experimental syntax requires enabling the parser plugin: '${name}'`,
      );
    }

    return true;
  }

  expectOnePlugin(names: Array<string>, pos?: ?number): void {
    if (!names.some(n => this.hasPlugin(n))) {
      throw this.raiseWithData(
        pos != null ? pos : this.state.start,
        { missingPlugin: names },
        `This experimental syntax requires enabling one of the following parser plugin(s): '${names.join(
          ", ",
        )}'`,
      );
    }
  }

  checkYieldAwaitInDefaultParams() {
    if (
      this.state.yieldPos !== -1 &&
      (this.state.awaitPos === -1 || this.state.yieldPos < this.state.awaitPos)
    ) {
      this.raise(
        this.state.yieldPos,
        "Yield cannot be used as name inside a generator function",
      );
    }
    if (this.state.awaitPos !== -1) {
      this.raise(
        this.state.awaitPos,
        "Await cannot be used as name inside an async function",
      );
    }
  }

  // tryParse will clone parser state.
  // It is expensive and should be used with cautions
  tryParse<T: Node | $ReadOnlyArray<Node>>(
    fn: (abort: (node?: T) => empty) => T,
    oldState: State = this.state.clone(),
  ):
    | TryParse<T, null, false, false, null>
    | TryParse<T | null, SyntaxError, boolean, false, State>
    | TryParse<T | null, null, false, true, State> {
    const abortSignal: { node: T | null } = { node: null };
    try {
      const node = fn((node = null) => {
        abortSignal.node = node;
        throw abortSignal;
      });
      if (this.state.errors.length > oldState.errors.length) {
        const failState = this.state;
        this.state = oldState;
        return {
          node,
          error: (failState.errors[oldState.errors.length]: SyntaxError),
          thrown: false,
          aborted: false,
          failState,
        };
      }

      return {
        node,
        error: null,
        thrown: false,
        aborted: false,
        failState: null,
      };
    } catch (error) {
      const failState = this.state;
      this.state = oldState;
      if (error instanceof SyntaxError) {
        return { node: null, error, thrown: true, aborted: false, failState };
      }
      if (error === abortSignal) {
        return {
          node: abortSignal.node,
          error: null,
          thrown: false,
          aborted: true,
          failState,
        };
      }

      throw error;
    }
  }

  checkExpressionErrors(
    refExpressionErrors: ?ExpressionErrors,
    andThrow: boolean,
  ) {
    if (!refExpressionErrors) return false;
    const { shorthandAssign, doubleProto } = refExpressionErrors;
    if (!andThrow) return shorthandAssign >= 0 || doubleProto >= 0;
    if (shorthandAssign >= 0) {
      this.unexpected(shorthandAssign);
    }
    if (doubleProto >= 0) {
      this.raise(doubleProto, Errors.DuplicateProto);
    }
  }

  /**
   * Test if current token is a literal property name
   * https://tc39.es/ecma262/#prod-LiteralPropertyName
   * LiteralPropertyName:
   *   IdentifierName
   *   StringLiteral
   *   NumericLiteral
   *   BigIntLiteral
   */
  isLiteralPropertyName(): boolean {
    return (
      this.match(tt.name) ||
      !!this.state.type.keyword ||
      this.match(tt.string) ||
      this.match(tt.num) ||
      this.match(tt.bigint)
    );
  }
}

/**
 * The ExpressionErrors is a context struct used to track
 * - **shorthandAssign**: track initializer `=` position when parsing ambiguous
 *   patterns. When we are sure the parsed pattern is a RHS, which means it is
 *   not a pattern, we will throw on this position on invalid assign syntax,
 *   otherwise it will be reset to -1
 * - **doubleProto**: track the duplicate `__proto__` key position when parsing
 *   ambiguous object patterns. When we are sure the parsed pattern is a RHS,
 *   which means it is an object literal, we will throw on this position for
 *   __proto__ redefinition, otherwise it will be reset to -1
 */
export class ExpressionErrors {
  shorthandAssign = -1;
  doubleProto = -1;
}
