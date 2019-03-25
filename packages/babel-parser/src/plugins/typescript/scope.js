import type ScopeHandler, { Scope } from "../../util/scope";

interface TypeScriptScope extends Scope {}

const mixinScope = (superClass: Class<Scope>): Class<TypeScriptScope> =>
  class TypeScriptScope extends superClass {};

export default (superClass: Class<ScopeHandler>): Class<ScopeHandler> =>
  class TypeScriptScopeHandler extends superClass {
    static Scope = mixinScope(super.Scope);
    scopeStack: Array<TypeScriptScope>;
  };
