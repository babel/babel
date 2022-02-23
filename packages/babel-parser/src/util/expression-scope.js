// @flow

import type { ErrorData, ErrorTemplate, raiseFunction } from "../parser/error";
import { Position } from "./location";

/*:: declare var invariant; */
/**
 * @module util/expression-scope

ExpressionScope is used to track declaration errors in these ambiguous patterns:

- CoverParenthesizedExpressionAndArrowParameterList
  e.g. we don't know if `({ x })` is an parenthesized expression or an
  arrow function parameters until we see an `=>` after `)`.

- CoverCallExpressionAndAsyncArrowHead
   e.g. we don't know if `async({ x })` is a call expression or an async arrow
   function parameters until we see an `=>` after `)`

The following declaration errors (@see parser/error-message) will be recorded in
some expression scopes and thrown later when we know what the ambigous pattern is

- AwaitBindingIdentifier
- AwaitExpressionFormalParameter
- YieldInParameter
- InvalidParenthesizedAssignment when parenthesized is an identifier

There are four different expression scope
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

// @see {@link https://docs.google.com/document/d/1FAvEp9EUK-G8kHfDIEo_385Hs2SUBCYbJ5H-NnLvq8M|V8 Expression Scope design docs}
 */

const kExpression = 0,
  kMaybeArrowParameterDeclaration = 1,
  kMaybeAsyncArrowParameterDeclaration = 2,
  kParameterDeclaration = 3;

type ExpressionScopeType = 0 | 1 | 2 | 3;

class ExpressionScope {
  type: ExpressionScopeType;

  constructor(type: ExpressionScopeType = kExpression) {
    this.type = type;
  }

  canBeArrowParameterDeclaration() {
    return (
      this.type === kMaybeAsyncArrowParameterDeclaration ||
      this.type === kMaybeArrowParameterDeclaration
    );
  }

  isCertainlyParameterDeclaration() {
    return this.type === kParameterDeclaration;
  }
}

class ArrowHeadParsingScope extends ExpressionScope {
  errors: Map</* pos */ number, ErrorData> = new Map();
  constructor(type: 1 | 2) {
    super(type);
  }
  recordDeclarationError(message: ErrorTemplate, loc: Position) {
    this.errors.set(loc.index, { message, loc });
  }
  clearDeclarationError(loc: Position) {
    this.errors.delete(loc.index);
  }
  iterateErrors(iterator: (data: ErrorData) => void) {
    this.errors.forEach(iterator);
  }
}

export default class ExpressionScopeHandler {
  stack: Array<ExpressionScope> = [new ExpressionScope()];
  declare raise: raiseFunction;
  constructor(raise: raiseFunction) {
    this.raise = raise;
  }
  enter(scope: ExpressionScope) {
    this.stack.push(scope);
  }

  exit() {
    this.stack.pop();
  }

  /**
   * Record likely parameter initializer errors
   *
   * When current scope is a ParameterDeclaration, the error will be thrown immediately,
   * otherwise it will be recorded to any ancestry MaybeArrowParameterDeclaration and
   * MaybeAsyncArrowParameterDeclaration scope until an Expression scope is seen.
   * @param {number} pos Error position
   * @param {ErrorTemplate} template Error template
   * @memberof ExpressionScopeHandler
   */
  recordParameterInitializerError(
    loc: Position,
    template: ErrorTemplate,
  ): void {
    const { stack } = this;
    let i = stack.length - 1;
    let scope: ExpressionScope = stack[i];
    while (!scope.isCertainlyParameterDeclaration()) {
      if (scope.canBeArrowParameterDeclaration()) {
        /*:: invariant(scope instanceof ArrowHeadParsingScope) */
        scope.recordDeclarationError(template, loc);
      } else {
        /*:: invariant(scope.type == kExpression) */
        // Type-Expression is the boundary where initializer error can populate to
        return;
      }
      scope = stack[--i];
    }
    /* eslint-disable @babel/development-internal/dry-error-messages */
    this.raise(template, { at: loc });
  }

  /**
   * Record parenthesized identifier errors
   *
   * A parenthesized identifier in LHS can be ambiguous because the assignment
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
   * @param {number} pos
   * @param {ErrorTemplate} template
   * @returns {void}
   * @memberof ExpressionScopeHandler
   */
  recordParenthesizedIdentifierError(
    template: ErrorTemplate,
    loc: Position,
  ): void {
    const { stack } = this;
    const scope: ExpressionScope = stack[stack.length - 1];
    if (scope.isCertainlyParameterDeclaration()) {
      this.raise(template, { at: loc });
    } else if (scope.canBeArrowParameterDeclaration()) {
      /*:: invariant(scope instanceof ArrowHeadParsingScope) */
      scope.recordDeclarationError(template, loc);
    } else {
      return;
    }
  }

  /**
   * Record likely async arrow parameter errors
   *
   * Errors will be recorded to any ancestry MaybeAsyncArrowParameterDeclaration
   * scope until an Expression scope is seen.
   * @param {number} pos
   * @param {ErrorTemplate} template
   * @memberof ExpressionScopeHandler
   */
  recordAsyncArrowParametersError(
    template: ErrorTemplate,
    loc: Position,
  ): void {
    const { stack } = this;
    let i = stack.length - 1;
    let scope: ExpressionScope = stack[i];
    while (scope.canBeArrowParameterDeclaration()) {
      if (scope.type === kMaybeAsyncArrowParameterDeclaration) {
        /*:: invariant(scope instanceof ArrowHeadParsingScope) */
        scope.recordDeclarationError(template, loc);
      }
      scope = stack[--i];
    }
  }

  validateAsPattern(): void {
    const { stack } = this;
    const currentScope = stack[stack.length - 1];
    if (!currentScope.canBeArrowParameterDeclaration()) return;
    /*:: invariant(currentScope instanceof ArrowHeadParsingScope) */
    currentScope.iterateErrors(({ message, loc }) => {
      /* eslint-disable @babel/development-internal/dry-error-messages */
      this.raise(message, { at: loc });
      // iterate from parent scope
      let i = stack.length - 2;
      let scope = stack[i];
      while (scope.canBeArrowParameterDeclaration()) {
        /*:: invariant(scope instanceof ArrowHeadParsingScope) */
        scope.clearDeclarationError(loc);
        scope = stack[--i];
      }
    });
  }
}

export function newParameterDeclarationScope() {
  return new ExpressionScope(kParameterDeclaration);
}

export function newArrowHeadScope() {
  return new ArrowHeadParsingScope(kMaybeArrowParameterDeclaration);
}

export function newAsyncArrowScope() {
  return new ArrowHeadParsingScope(kMaybeAsyncArrowParameterDeclaration);
}

export function newExpressionScope() {
  return new ExpressionScope();
}
