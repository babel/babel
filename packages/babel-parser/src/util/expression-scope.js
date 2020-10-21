// @flow

/*:: declare var invariant; */
// Expression.
const kExpression = 0,
  // Declaration or expression or assignment target.
  kMaybeArrowParameterDeclaration = 1,
  kMaybeAsyncArrowParameterDeclaration = 2,
  // Declarations.
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

  canBeParameterDeclaration() {
    return this.type > kExpression;
  }

  isCertainlyParameterDeclaration() {
    return this.type === kParameterDeclaration;
  }
}

class ArrowHeadParsingScope extends ExpressionScope {
  declare declarationErrorPos: number;
  declare declarationErrorMessage: string;
  constructor(type: 1 | 2) {
    super(type);
  }
  recordDeclarationError(pos: number, message: string) {
    this.declarationErrorPos = pos;
    this.declarationErrorMessage = message;
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

  recordParameterInitializerError(pos: number, message: string) {
    const { stack } = this;
    let i = stack.length - 1;
    let scope: ExpressionScope = stack[i];
    if (!scope.canBeParameterDeclaration()) {
      return;
    }
    while (!scope.isCertainlyParameterDeclaration()) {
      if (scope.canBeParameterDeclaration()) {
        /*:: invariant(scope instanceof ArrowHeadParsingScope) */
        scope.recordDeclarationError(pos, message);
      }
      if (i === 0) return;
      scope = stack[--i];
    }
    /* eslint-disable @babel/development-internal/dry-error-messages */
    this.raise(pos, message);
  }

  recordAsyncArrowParametersError(pos: number, message: string) {
    const { stack } = this;
    let i = stack.length - 1;
    while (i > 0) {
      const scope: ExpressionScope = stack[i];
      if (!scope.canBeParameterDeclaration()) {
        return;
      }
      if (scope.type === kMaybeAsyncArrowParameterDeclaration) {
        /*:: invariant(scope instanceof ArrowHeadParsingScope) */
        scope.recordDeclarationError(pos, message);
      }
      --i;
    }
  }

  validateAsPattern() {
    const { stack } = this;
    const currentScope = stack[stack.length - 1];
    if (!currentScope.canBeArrowParameterDeclaration()) return;
    /*:: invariant(currentScope instanceof ArrowHeadParsingScope) */
    if (currentScope.declarationErrorPos) {
      this.raise(
        currentScope.declarationErrorPos,
        /* eslint-disable @babel/development-internal/dry-error-messages */
        currentScope.declarationErrorMessage,
      );
    }
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
