import { Scope, type default as ScopeHandler } from "../../util/scope";

class TypeScriptScope extends Scope {}

export default (superClass: Class<ScopeHandler>): Class<ScopeHandler> =>
  class TypeScriptScopeHandler extends superClass {
    scopeStack: Array<TypeScriptScope>;

    createScope(flags: ScopeFlags): Scope {
      return new TypeScriptScope(flags);
    }
  };
