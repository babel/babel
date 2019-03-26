// @flow

import ScopeHandler, { Scope } from "../../util/scope";
import {
  BIND_LEXICAL,
  BIND_TS_ENUM,
  type ScopeFlags,
  type BindingTypes,
} from "../../util/scopeflags";
import * as N from "../../types";

class TypeScriptScope extends Scope {
  tsEnum: string[] = [];
}

export default class TypeScriptScopeHandler extends ScopeHandler<TypeScriptScope> {
  createScope(flags: ScopeFlags): TypeScriptScope {
    return new TypeScriptScope(flags);
  }

  declareName(name: string, bindingType: ?BindingTypes, pos: number) {
    if (bindingType === BIND_TS_ENUM) {
      const scope = this.currentScope();
      this.checkRedeclarationInScope(scope, name, bindingType, pos);
      scope.tsEnum.push(name);
      this.maybeExportDefined(scope, name);
    } else {
      super.declareName(...arguments);
    }
  }

  isRedeclaredInScope(
    scope: TypeScriptScope,
    name: string,
    bindingType: ?BindingTypes,
  ): boolean {
    if (bindingType === BIND_TS_ENUM) {
      // This checks for var/let/function. An enum can redeclare an enum.
      return super.isRedeclaredInScope(scope, name, BIND_LEXICAL);
    }

    return (
      scope.tsEnum.indexOf(name) > -1 || super.isRedeclaredInScope(...arguments)
    );
  }

  checkLocalExport(id: N.Identifier) {
    if (this.scopeStack[0].tsEnum.indexOf(id.name) === -1) {
      super.checkLocalExport(...arguments);
    }
  }
}
