// @flow
import {
  SCOPE_ARROW,
  SCOPE_ASYNC,
  SCOPE_DIRECT_SUPER,
  SCOPE_FUNCTION,
  SCOPE_GENERATOR,
  SCOPE_SIMPLE_CATCH,
  SCOPE_SUPER,
  SCOPE_PROGRAM,
  SCOPE_VAR,
  BIND_SIMPLE_CATCH,
  BIND_LEXICAL,
  BIND_FUNCTION,
  type ScopeFlags,
  type BindingTypes,
  SCOPE_CLASS,
} from "./scopeflags";
import * as N from "../types";

// Start an AST node, attaching a start offset.
class Scope {
  flags: ScopeFlags;
  // A list of var-declared names in the current lexical scope
  var: string[] = [];
  // A list of lexically-declared names in the current lexical scope
  lexical: string[] = [];
  // A list of lexically-declared FunctionDeclaration names in the current lexical scope
  functions: string[] = [];

  constructor(flags: ScopeFlags) {
    this.flags = flags;
  }
}

type raiseFunction = (number, string) => void;

// The functions in this module keep track of declared variables in the
// current scope in order to detect duplicate variable names.
export default class ScopeHandler {
  scopeStack: Array<Scope> = [];
  raise: raiseFunction;
  inModule: boolean;
  undefinedExports: Map<string, number> = new Map();

  constructor(raise: raiseFunction, inModule: boolean) {
    this.raise = raise;
    this.inModule = inModule;
  }

  get inFunction() {
    return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
  }
  get inGenerator() {
    return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0;
  }
  get inAsync() {
    return (this.currentVarScope().flags & SCOPE_ASYNC) > 0;
  }
  get allowSuper() {
    return (this.currentThisScope().flags & SCOPE_SUPER) > 0;
  }
  get allowDirectSuper() {
    return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
  }
  get inNonArrowFunction() {
    return (this.currentThisScope().flags & SCOPE_FUNCTION) > 0;
  }
  get treatFunctionsAsVar() {
    return this.treatFunctionsAsVarInScope(this.currentScope());
  }

  enter(flags: ScopeFlags) {
    this.scopeStack.push(new Scope(flags));
  }

  exit() {
    this.scopeStack.pop();
  }

  // The spec says:
  // > At the top level of a function, or script, function declarations are
  // > treated like var declarations rather than like lexical declarations.
  treatFunctionsAsVarInScope(scope: Scope): boolean {
    return !!(
      scope.flags & SCOPE_FUNCTION ||
      (!this.inModule && scope.flags & SCOPE_PROGRAM)
    );
  }

  declareName(name: string, bindingType: ?BindingTypes, pos: number) {
    let redeclared = false;
    if (bindingType === BIND_LEXICAL) {
      const scope = this.currentScope();
      redeclared =
        scope.lexical.indexOf(name) > -1 ||
        scope.functions.indexOf(name) > -1 ||
        scope.var.indexOf(name) > -1;
      scope.lexical.push(name);
      if (this.inModule && scope.flags & SCOPE_PROGRAM) {
        this.undefinedExports.delete(name);
      }
    } else if (bindingType === BIND_SIMPLE_CATCH) {
      const scope = this.currentScope();
      scope.lexical.push(name);
    } else if (bindingType === BIND_FUNCTION) {
      const scope = this.currentScope();
      if (this.treatFunctionsAsVar) {
        redeclared = scope.lexical.indexOf(name) > -1;
      } else {
        redeclared =
          scope.lexical.indexOf(name) > -1 || scope.var.indexOf(name) > -1;
      }
      scope.functions.push(name);
    } else {
      for (let i = this.scopeStack.length - 1; i >= 0; --i) {
        const scope = this.scopeStack[i];
        if (
          (scope.lexical.indexOf(name) > -1 &&
            !(scope.flags & SCOPE_SIMPLE_CATCH && scope.lexical[0] === name)) ||
          (!this.treatFunctionsAsVarInScope(scope) &&
            scope.functions.indexOf(name) > -1)
        ) {
          redeclared = true;
          break;
        }
        scope.var.push(name);

        if (this.inModule && scope.flags & SCOPE_PROGRAM) {
          this.undefinedExports.delete(name);
        }

        if (scope.flags & SCOPE_VAR) break;
      }
    }
    if (redeclared) {
      this.raise(pos, `Identifier '${name}' has already been declared`);
    }
  }

  checkLocalExport(id: N.Identifier) {
    // scope.functions must be empty as Module code is always strict.
    if (
      this.scopeStack[0].lexical.indexOf(id.name) === -1 &&
      this.scopeStack[0].var.indexOf(id.name) === -1
    ) {
      this.undefinedExports.set(id.name, id.start);
    }
  }

  currentScope(): Scope {
    return this.scopeStack[this.scopeStack.length - 1];
  }

  // $FlowIgnore
  currentVarScope(): Scope {
    for (let i = this.scopeStack.length - 1; ; i--) {
      const scope = this.scopeStack[i];
      if (scope.flags & SCOPE_VAR) {
        return scope;
      }
    }
  }

  // Could be useful for `this`, `new.target`, `super()`, `super.property`, and `super[property]`.
  // $FlowIgnore
  currentThisScope(): Scope {
    for (let i = this.scopeStack.length - 1; ; i--) {
      const scope = this.scopeStack[i];
      if (
        (scope.flags & SCOPE_VAR || scope.flags & SCOPE_CLASS) &&
        !(scope.flags & SCOPE_ARROW)
      ) {
        return scope;
      }
    }
  }
}
