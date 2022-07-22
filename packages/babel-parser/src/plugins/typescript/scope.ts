// @flow

import { Position } from "../../util/location";
import ScopeHandler, { Scope } from "../../util/scope";
import {
  BIND_KIND_TYPE,
  BIND_FLAGS_TS_ENUM,
  BIND_FLAGS_TS_CONST_ENUM,
  BIND_FLAGS_TS_EXPORT_ONLY,
  BIND_KIND_VALUE,
  BIND_FLAGS_CLASS,
  type ScopeFlags,
  type BindingTypes,
} from "../../util/scopeflags";
import * as N from "../../types";

class TypeScriptScope extends Scope {
  types: Set<string> = new Set();

  // enums (which are also in .types)
  enums: Set<string> = new Set();

  // const enums (which are also in .enums and .types)
  constEnums: Set<string> = new Set();

  // classes (which are also in .lexical) and interface (which are also in .types)
  classes: Set<string> = new Set();

  // namespaces and ambient functions (or classes) are too difficult to track,
  // especially without type analysis.
  // We need to track them anyway, to avoid "X is not defined" errors
  // when exporting them.
  exportOnlyBindings: Set<string> = new Set();
}

// See https://github.com/babel/babel/pull/9766#discussion_r268920730 for an
// explanation of how typescript handles scope.

export default class TypeScriptScopeHandler extends ScopeHandler<TypeScriptScope> {
  createScope(flags: ScopeFlags): TypeScriptScope {
    return new TypeScriptScope(flags);
  }

  declareName(name: string, bindingType: BindingTypes, loc: Position) {
    const scope = this.currentScope();
    if (bindingType & BIND_FLAGS_TS_EXPORT_ONLY) {
      this.maybeExportDefined(scope, name);
      scope.exportOnlyBindings.add(name);
      return;
    }

    super.declareName(...arguments);

    if (bindingType & BIND_KIND_TYPE) {
      if (!(bindingType & BIND_KIND_VALUE)) {
        // "Value" bindings have already been registered by the superclass.
        this.checkRedeclarationInScope(scope, name, bindingType, loc);
        this.maybeExportDefined(scope, name);
      }
      scope.types.add(name);
    }
    if (bindingType & BIND_FLAGS_TS_ENUM) scope.enums.add(name);
    if (bindingType & BIND_FLAGS_TS_CONST_ENUM) scope.constEnums.add(name);
    if (bindingType & BIND_FLAGS_CLASS) scope.classes.add(name);
  }

  isRedeclaredInScope(
    scope: TypeScriptScope,
    name: string,
    bindingType: BindingTypes,
  ): boolean {
    if (scope.enums.has(name)) {
      if (bindingType & BIND_FLAGS_TS_ENUM) {
        // Enums can be merged with other enums if they are both
        //  const or both non-const.
        const isConst = !!(bindingType & BIND_FLAGS_TS_CONST_ENUM);
        const wasConst = scope.constEnums.has(name);
        return isConst !== wasConst;
      }
      return true;
    }
    if (bindingType & BIND_FLAGS_CLASS && scope.classes.has(name)) {
      if (scope.lexical.has(name)) {
        // Classes can be merged with interfaces
        return !!(bindingType & BIND_KIND_VALUE);
      } else {
        // Interface can be merged with other classes or interfaces
        return false;
      }
    }
    if (bindingType & BIND_KIND_TYPE && scope.types.has(name)) {
      return true;
    }

    return super.isRedeclaredInScope(...arguments);
  }

  checkLocalExport(id: N.Identifier) {
    const topLevelScope = this.scopeStack[0];
    const { name } = id;
    if (
      !topLevelScope.types.has(name) &&
      !topLevelScope.exportOnlyBindings.has(name)
    ) {
      super.checkLocalExport(id);
    }
  }
}
