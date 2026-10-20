import { Errors, type ParseErrorConstructor } from "../parse-error.ts";
import type { Node } from "../types.ts";
import type Tokenizer from "../tokenizer/index.ts";

/**
 * @module util/expression-scope

ExpressionScope is used to track declaration errors in these ambiguous patterns:

- CoverParenthesizedExpressionAndArrowParameterList
  e.g. we don't know if `({ x })` is an parenthesized expression or an
  arrow function parameters until we see an `=>` after `)`.

- CoverCallExpressionAndAsyncArrowHead
  e.g. we don't know if `async({ x })` is a call expression or an async arrow
  function parameters until we see an `=>` after `)`

The following declaration errors (@see parser-errors/standard) will be recorded in
some expression scopes and thrown later when we know what the ambiguous pattern is

- AwaitBindingIdentifier
- AwaitExpressionFormalParameter
- YieldInParameter
- InvalidParenthesizedAssignment when parenthesized is an identifier

There are five different expression scope
- Expression
  A general scope that represents program / function body / static block. No errors
  will be recorded nor thrown in this scope.

- MaybeArrowParameterDeclaration
  A scope that represents ambiguous arrow head e.g. `(x)`. Errors will be recorded
  alongside parent scopes and thrown when `ExpressionScopeHandler#validateAsPattern`
  is called.

- MaybeAsyncArrowParameterDeclaration
  A scope that represents ambiguous async arrow head e.g. `async(x)`. Errors will
  be recorded alongside parent scopes and thrown when
  `ExpressionScopeHandler#validateAsPattern` is called.

- ParameterDeclaration
  A scope that represents unambiguous function parameters `function(x)`. Errors
  recorded in this scope will be thrown immediately. No errors will be recorded in
  this scope.

- Initializer
  A scope that represents an expression that can never be a binding target, but
  may be nested within (possible) parameters. It is entered by an
  AssignmentExpression that is not parsed as part of a cover grammar when the
  current scope is a (possible) ParameterDeclaration, e.g. the
  initializer `(b) = 1` in `(a = (b) = 1) => {}`, the computed key in
  `({ [(b) = 1]: a }) => {}` or the decorator argument in
  `function f(@dec((b) = 1) a) {}`. Parenthesized binding errors will not be
  recorded in this scope, while parameter initializer errors and async arrow
  parameter errors will be propagated to its parent scopes.

// @see {@link https://docs.google.com/document/d/1FAvEp9EUK-G8kHfDIEo_385Hs2SUBCYbJ5H-NnLvq8M | V8 Expression Scope design docs}
 */

const enum ExpressionScopeType {
  kExpression = 0,
  kMaybeArrowParameterDeclaration = 1,
  kMaybeAsyncArrowParameterDeclaration = 2,
  kParameterDeclaration = 3,
  kInitializer = 4,
}

class ExpressionScope {
  declare type: ExpressionScopeType;

  constructor(type: ExpressionScopeType = ExpressionScopeType.kExpression) {
    this.type = type;
  }

  canBeArrowParameterDeclaration(): this is ArrowHeadParsingScope {
    return (
      this.type === ExpressionScopeType.kMaybeAsyncArrowParameterDeclaration ||
      this.type === ExpressionScopeType.kMaybeArrowParameterDeclaration
    );
  }

  isCertainlyParameterDeclaration() {
    return this.type === ExpressionScopeType.kParameterDeclaration;
  }

  isInitializer() {
    return this.type === ExpressionScopeType.kInitializer;
  }
}

type ArrowHeadParsingParameterInitializerError =
  typeof Errors.AwaitExpressionFormalParameter | typeof Errors.YieldInParameter;
type ArrowHeadParsingDeclarationError =
  | ArrowHeadParsingParameterInitializerError
  | typeof Errors.InvalidParenthesizedAssignment
  | typeof Errors.AwaitBindingIdentifier;

class ArrowHeadParsingScope extends ExpressionScope {
  declarationErrors = new Map<number, ParseErrorConstructor<object>>();
  constructor(
    type:
      | ExpressionScopeType.kMaybeArrowParameterDeclaration
      | ExpressionScopeType.kMaybeAsyncArrowParameterDeclaration,
  ) {
    super(type);
  }
  recordDeclarationError(
    ParsingErrorClass: ParseErrorConstructor<object>,
    index: number,
  ) {
    this.declarationErrors.set(index, ParsingErrorClass);
  }
  clearDeclarationError(index: number) {
    this.declarationErrors.delete(index);
  }
  iterateErrors(
    iterator: (a: ArrowHeadParsingDeclarationError, b: number) => void,
  ) {
    this.declarationErrors.forEach(iterator);
  }
}

export default class ExpressionScopeHandler {
  parser: Tokenizer;
  stack: ExpressionScope[] = [new ExpressionScope()];

  constructor(parser: Tokenizer) {
    this.parser = parser;
  }
  enter(scope: ExpressionScope) {
    this.stack.push(scope);
  }

  exit() {
    this.stack.pop();
  }

  /**
   * Whether the current expression may be within (possible) parameters. Otherwise
   * entering an Initializer scope has no effect, since no binding error is recorded
   * in the Expression or Initializer scope.
   */
  canBeInParameters(): boolean {
    const scope = this.stack[this.stack.length - 1];
    return (
      scope.canBeArrowParameterDeclaration() ||
      scope.isCertainlyParameterDeclaration()
    );
  }

  /**
   * Record likely parameter initializer errors
   *
   * When current scope is a ParameterDeclaration, the error will be thrown immediately,
   * otherwise it will be recorded to any ancestry MaybeArrowParameterDeclaration and
   * MaybeAsyncArrowParameterDeclaration scope until an Expression scope is seen.
   */
  recordParameterInitializerError(
    toParseError: ArrowHeadParsingParameterInitializerError,
    loc: number,
  ): void {
    const { stack } = this;
    let i = stack.length - 1;
    let scope: ExpressionScope = stack[i];
    while (!scope.isCertainlyParameterDeclaration()) {
      if (scope.canBeArrowParameterDeclaration()) {
        scope.recordDeclarationError(toParseError, loc);
      } else if (!scope.isInitializer()) {
        // Type-Expression is the boundary where initializer error can populate to
        return;
      }
      scope = stack[--i];
    }
    this.parser.raise(toParseError, loc);
  }

  /**
   * Record errors that must be thrown if the current pattern ends up being an arrow
   * function parameter. This is used to record parenthesized identifiers, and to record
   * "a as T" and "<T> a" type assertions when parsing typescript.
   *
   * A parenthesized identifier (or type assertion) in LHS can be ambiguous because the assignment
   * can be transformed to an assignable later, but not vice versa:
   * For example, in `([(a) = []] = []) => {}`, we think `(a) = []` is an LHS in `[(a) = []]`,
   * an LHS within `[(a) = []] = []`. However the LHS chain is then transformed by toAssignable,
   * and we should throw assignment `(a)`, which is only valid in LHS. Hence we record the
   * location of parenthesized `(a)` to current scope if it is one of MaybeArrowParameterDeclaration
   * and MaybeAsyncArrowParameterDeclaration
   *
   * Unlike `recordParameterInitializerError`, we don't record to ancestry scope because we
   * validate arrow head parsing scope before exit, and then the LHS will be unambiguous:
   * For example, in `( x = ( [(a) = []] = [] ) ) => {}`, we should not record `(a)` in `( x = ... ) =>`
   * arrow scope because when we finish parsing `( [(a) = []] = [] )`, it is an unambiguous assignment
   * expression and can not be cast to pattern
   *
   * Similarly, in `( x = (a) = [] ) => {}`, we should not record `(a)` because it is in the
   * initializer of `x`, which is parsed in an Initializer scope and can never be a binding target
   */
  recordArrowParameterBindingError(
    error: ParseErrorConstructor<object>,
    node: Node,
  ): void {
    const { stack } = this;
    const scope: ExpressionScope = stack[stack.length - 1];
    const origin = node.start!;
    if (scope.isCertainlyParameterDeclaration()) {
      this.parser.raise(error, origin);
    } else if (scope.canBeArrowParameterDeclaration()) {
      scope.recordDeclarationError(error, origin);
    } else {
      return;
    }
  }

  /**
   * Record likely async arrow parameter errors
   *
   * Errors will be recorded to any ancestry MaybeAsyncArrowParameterDeclaration
   * scope until an Expression scope is seen.
   */
  recordAsyncArrowParametersError(at: number): void {
    const { stack } = this;
    for (let i = stack.length - 1; ; i--) {
      const scope: ExpressionScope = stack[i];
      if (scope.canBeArrowParameterDeclaration()) {
        if (
          scope.type === ExpressionScopeType.kMaybeAsyncArrowParameterDeclaration
        ) {
          scope.recordDeclarationError(Errors.AwaitBindingIdentifier, at);
        }
      } else if (!scope.isInitializer()) {
        return;
      }
    }
  }

  validateAsPattern(): void {
    const { stack } = this;
    const currentScope = stack[stack.length - 1];
    if (!currentScope.canBeArrowParameterDeclaration()) return;
    currentScope.iterateErrors((toParseError, key) => {
      this.parser.raise(toParseError, key);
      // iterate from parent scope
      for (let i = stack.length - 2; ; i--) {
        const scope = stack[i];
        if (scope.canBeArrowParameterDeclaration()) {
          scope.clearDeclarationError(key);
        } else if (!scope.isInitializer()) {
          break;
        }
      }
    });
  }
}

export function newArrowHeadScope() {
  return new ArrowHeadParsingScope(
    ExpressionScopeType.kMaybeArrowParameterDeclaration,
  );
}

export function newAsyncArrowScope() {
  return new ArrowHeadParsingScope(
    ExpressionScopeType.kMaybeAsyncArrowParameterDeclaration,
  );
}

// The Expression, ParameterDeclaration and Initializer scopes hold no state, so
// a single instance of each is shared
export const sharedExpressionScope = new ExpressionScope();
export const parameterDeclarationScope = new ExpressionScope(
  ExpressionScopeType.kParameterDeclaration,
);
export const initializerScope = new ExpressionScope(
  ExpressionScopeType.kInitializer,
);
