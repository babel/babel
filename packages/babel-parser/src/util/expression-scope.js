// @flow

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

type raiseFunction = (number, string, ...any) => void;

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
  errors: Map</* pos */ number, /* message */ string> = new Map();
  constructor(type: 1 | 2) {
    super(type);
  }
  recordDeclarationError(pos: number, message: string) {
    this.errors.set(pos, message);
  }
  clearDeclarationError(pos: number) {
    this.errors.delete(pos);
  }
  iterateErrors(iterator: (message: string, pos: number) => void) {
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
   * @param {string} message Error message
   * @memberof ExpressionScopeHandler
   */
  recordParameterInitializerError(pos: number, message: string): void {
    const { stack } = this;
    let i = stack.length - 1;
    let scope: ExpressionScope = stack[i];
    while (!scope.isCertainlyParameterDeclaration()) {
      if (scope.canBeArrowParameterDeclaration()) {
        /*:: invariant(scope instanceof ArrowHeadParsingScope) */
        scope.recordDeclarationError(pos, message);
      } else {
        /*:: invariant(scope.type == kExpression) */
        // Type-Expression is the boundary where initializer error can populate to
        return;
      }
      scope = stack[--i];
    }
    /* eslint-disable @babel/development-internal/dry-error-messages */
    this.raise(pos, message);
  }
  /**
   * Record likely async arrow parameter errors
   *
   * Errors will be recorded to any ancestry MaybeAsyncArrowParameterDeclaration
   * scope until an Expression scope is seen.
   * @param {number} pos
   * @param {string} message
   * @memberof ExpressionScopeHandler
   */
  recordAsyncArrowParametersError(pos: number, message: string): void {
    const { stack } = this;
    let i = stack.length - 1;
    let scope: ExpressionScope = stack[i];
    while (scope.canBeArrowParameterDeclaration()) {
      if (scope.type === kMaybeAsyncArrowParameterDeclaration) {
        /*:: invariant(scope instanceof ArrowHeadParsingScope) */
        scope.recordDeclarationError(pos, message);
      }
      scope = stack[--i];
    }
  }

  validateAsPattern(): void {
    const { stack } = this;
    const currentScope = stack[stack.length - 1];
    if (!currentScope.canBeArrowParameterDeclaration()) return;
    /*:: invariant(currentScope instanceof ArrowHeadParsingScope) */
    currentScope.iterateErrors((message, pos) => {
      /* eslint-disable @babel/development-internal/dry-error-messages */
      this.raise(pos, message);
      // iterate from parent scope
      let i = stack.length - 2;
      let scope = stack[i];
      while (scope.canBeArrowParameterDeclaration()) {
        /*:: invariant(scope instanceof ArrowHeadParsingScope) */
        scope.clearDeclarationError(pos);
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
