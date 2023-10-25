import type { Position } from "../../util/location.ts";
import ScopeHandler, { Scope } from "../../util/scope.ts";
import { BindingFlag, ScopeFlag } from "../../util/scopeflags.ts";
import type * as N from "../../types.ts";
import { Errors } from "../../parse-error.ts";

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

  createScope(flags: ScopeFlag): TypeScriptScope {
    this.importsStack.push(new Set()); // Always keep the top-level scope for export checks.

    return new TypeScriptScope(flags);
  }

  enter(flags: ScopeFlag): void {
    if (flags == ScopeFlag.TS_MODULE) {
      this.importsStack.push(new Set());
    }

    super.enter(flags);
  }

  exit() {
    const flags = super.exit();

    if (flags == ScopeFlag.TS_MODULE) {
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

  declareName(name: string, bindingType: BindingFlag, loc: Position) {
    if (bindingType & BindingFlag.FLAG_TS_IMPORT) {
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
    if (bindingType & BindingFlag.FLAG_TS_EXPORT_ONLY) {
      this.maybeExportDefined(scope, name);
      scope.exportOnlyBindings.add(name);
      return;
    }

    super.declareName(name, bindingType, loc);

    if (bindingType & BindingFlag.KIND_TYPE) {
      if (!(bindingType & BindingFlag.KIND_VALUE)) {
        // "Value" bindings have already been registered by the superclass.
        this.checkRedeclarationInScope(scope, name, bindingType, loc);
        this.maybeExportDefined(scope, name);
      }
      scope.types.add(name);
    }
    if (bindingType & BindingFlag.FLAG_TS_ENUM) scope.enums.add(name);
    if (bindingType & BindingFlag.FLAG_TS_CONST_ENUM) {
      scope.constEnums.add(name);
    }
    if (bindingType & BindingFlag.FLAG_CLASS) scope.classes.add(name);
  }

  isRedeclaredInScope(
    scope: TypeScriptScope,
    name: string,
    bindingType: BindingFlag,
  ): boolean {
    if (scope.enums.has(name)) {
      if (bindingType & BindingFlag.FLAG_TS_ENUM) {
        // Enums can be merged with other enums if they are both
        //  const or both non-const.
        const isConst = !!(bindingType & BindingFlag.FLAG_TS_CONST_ENUM);
        const wasConst = scope.constEnums.has(name);
        return isConst !== wasConst;
      }
      return true;
    }
    if (bindingType & BindingFlag.FLAG_CLASS && scope.classes.has(name)) {
      if (scope.lexical.has(name)) {
        // Classes can be merged with interfaces
        return !!(bindingType & BindingFlag.KIND_VALUE);
      } else {
        // Interface can be merged with other classes or interfaces
        return false;
      }
    }
    if (bindingType & BindingFlag.KIND_TYPE && scope.types.has(name)) {
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
