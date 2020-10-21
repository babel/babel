// @flow

// Expression.
const kExpression = 0,
  // Declaration or expression or assignment target.
  kMaybeArrowParameterDeclaration = 1,
  kMaybeAsyncArrowParameterDeclaration = 2,
  // Declarations.
  kParameterDeclaration = 3;

type ExpressionScopeType = 0 | 1 | 2 | 3 | 4;

class ExpressionScope {
  type: ExpressionScopeType;
  error: string = null;
  pos: number = null;

  constructor(type = kExpression) {
    this.type = type;
  }

  canBeExpression() {
    return this.type < kParameterDeclaration;
  }

  canBeDeclaration() {
    return this.type > kExpression;
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
  constructor(type: 1 | 2) {
    super(type);
  }
  recordDeclarationError(pos, message) {
    this.declarationErrorPos = pos;
    this.declarationErrorMessage = message;
  }
}

export default class ExpressionScopeHandler {
  stack: Array<ExpressionScope> = [new ExpressionScope()];
  constructor(raise: raiseFunction) {
    this.raise = raise;
  }
  enter(scope: ExpressionScope) {
    this.stack.push(scope);
  }

  get currentScope() {
    const { stack } = this;
    return stack[stack.length - 1];
  }

  exit() {
    if (this.stack.length === 1) {
      throw new Error("Internal Error");
    }
    this.stack.pop();
    // todo: move error message to upper scopes
  }

  recordParameterInitializerError(pos, message) {
    const { stack } = this;
    let i = stack.length - 1;
    let scope: ExpressionScope = stack[i];
    while (!scope.isCertainlyParameterDeclaration()) {
      if (scope.canBeParameterDeclaration()) {
        scope.recordDeclarationError(pos, message);
      }
      if (i === 0) return;
      scope = stack[--i];
    }
    /* eslint-disable @babel/development-internal/dry-error-messages */
    this.raise(pos, message);
  }

  recordAsyncArrowParametersError(pos, message) {
    const { stack } = this;
    let i = stack.length - 1;
    let scope: ExpressionScope = stack[i];
    while (i > 0) {
      scope = stack[i];
      if (scope.type === kMaybeAsyncArrowParameterDeclaration) {
        scope.recordDeclarationError(pos, message);
      }
      --i;
    }
  }

  validateAsPattern() {
    const { currentScope } = this;
    if (!currentScope.canBeArrowParameterDeclaration()) return;
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
