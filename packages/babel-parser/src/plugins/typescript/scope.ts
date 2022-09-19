import type { Position } from "../../util/location";
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
  BIND_FLAGS_TS_IMPORT,
  SCOPE_TS_MODULE,
} from "../../util/scopeflags";
import type * as N from "../../types";
import { Errors } from "../../parse-error";

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
  importsStack: Set<string>[] = [];

  createScope(flags: ScopeFlags): TypeScriptScope {
    this.importsStack.push(new Set()); // Always keep the top-level scope for export checks.

    return new TypeScriptScope(flags);
  }

  enter(flags: number): void {
    if (flags == SCOPE_TS_MODULE) {
      this.importsStack.push(new Set());
    }

    super.enter(flags);
  }

  exit() {
    const flags = super.exit();

    if (flags == SCOPE_TS_MODULE) {
      this.importsStack.pop();
    }

    return flags;
  }

  hasImport(name: string, allowShadow?: boolean) {
    const len = this.importsStack.length;
    if (this.importsStack[len - 1].has(name)) {
      return true;
    }
    if (!allowShadow && len > 1) {
      for (let i = 0; i < len - 1; i++) {
        if (this.importsStack[i].has(name)) return true;
      }
    }
    return false;
  }

  declareName(name: string, bindingType: BindingTypes, loc: Position) {
    if (bindingType & BIND_FLAGS_TS_IMPORT) {
      if (this.hasImport(name, true)) {
        this.parser.raise(Errors.VarRedeclaration, {
          at: loc,
          identifierName: name,
        });
      }
      this.importsStack[this.importsStack.length - 1].add(name);
      return;
    }

    const scope = this.currentScope();
    if (bindingType & BIND_FLAGS_TS_EXPORT_ONLY) {
      this.maybeExportDefined(scope, name);
      scope.exportOnlyBindings.add(name);
      return;
    }

    super.declareName(name, bindingType, loc);

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

    return super.isRedeclaredInScope(scope, name, bindingType);
  }

  checkLocalExport(id: N.Identifier) {
    const { name } = id;

    if (this.hasImport(name)) return;

    const len = this.scopeStack.length;
    for (let i = len - 1; i >= 0; i--) {
      const scope = this.scopeStack[i];
      if (scope.types.has(name) || scope.exportOnlyBindings.has(name)) return;
    }

    super.checkLocalExport(id);
  }
}
