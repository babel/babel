import ScopeHandler, { Scope } from "../../util/scope";

class TypeScriptScope extends Scope {}

export default class TypeScriptScopeHandler extends ScopeHandler {
  scopeStack: Array<TypeScriptScope>;

  createScope(flags: ScopeFlags): Scope {
    return new TypeScriptScope(flags);
  }
}
