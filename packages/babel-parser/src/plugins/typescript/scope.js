// @flow

import ScopeHandler, { Scope } from "../../util/scope";
import {
  BIND_KIND_TYPE,
  BIND_FLAGS_TS_ENUM,
  BIND_KIND_VALUE,
  BIND_FLAGS_CLASS,
  type ScopeFlags,
  type BindingTypes,
} from "../../util/scopeflags";
import * as N from "../../types";

class TypeScriptScope extends Scope {
  types: string[] = [];
  enums: string[] = [];
  classes: string[] = [];
}

// See https://github.com/babel/babel/pull/9766#discussion_r268920730 for an
// explanation of how typescript handles scope.

export default class TypeScriptScopeHandler extends ScopeHandler<TypeScriptScope> {
  createScope(flags: ScopeFlags): TypeScriptScope {
    return new TypeScriptScope(flags);
  }

  declareName(name: string, bindingType: BindingTypes, pos: number) {
    super.declareName(...arguments);

    const scope = this.currentScope();
    if (bindingType & BIND_KIND_TYPE) {
      if (!(bindingType & BIND_KIND_VALUE)) {
        // "Value" bindings have already been registered by the superclass.
        this.checkRedeclarationInScope(scope, name, bindingType, pos);
        this.maybeExportDefined(scope, name);
      }
      scope.types.push(name);
    }
    if (bindingType & BIND_FLAGS_TS_ENUM) scope.enums.push(name);
    if (bindingType & BIND_FLAGS_CLASS) scope.classes.push(name);
  }

  isRedeclaredInScope(
    scope: TypeScriptScope,
    name: string,
    bindingType: BindingTypes,
  ): boolean {
    if (scope.enums.indexOf(name) > -1) {
      // Enums can be merged with other enums
      return !(bindingType & BIND_FLAGS_TS_ENUM);
    }
    if (bindingType & BIND_FLAGS_CLASS && scope.classes.indexOf(name) > -1) {
      if (scope.lexical.indexOf(name) > -1) {
        // Classes can be merged with interfaces
        return !!(bindingType & BIND_KIND_VALUE);
      } else {
        // Interface can be merged with other classes or interfaces
        return false;
      }
    }
    if (bindingType & BIND_KIND_TYPE && scope.types.indexOf(name) > -1) {
      return true;
    }

    return super.isRedeclaredInScope(...arguments);
  }
}
