import type { Linter } from "eslint";
import type { InputOptions } from "@babel/core";
import type { Token as tokenizerToken } from "../../../packages/babel-parser/src/tokenizer";
import type { ExportedTokenType } from "../../../packages/babel-parser/src/tokenizer/types";
import type * as estree from "estree";
import type {
  Definition as OriginalScopeDefinition,
  PatternVisitor,
  Variable,
  Referencer as OriginalReferencer,
  Reference,
  Scope as OriginalESLintScope,
  ScopeManager as OriginalScopeManager,
} from "eslint-scope";

type ScopeDefinition = OriginalScopeDefinition &
  (new (
    type: OriginalScopeDefinition["type"] | "TypeParameter",
    name: estree.Identifier,
    node: estree.Node,
  ) => ScopeDefinition);

export type Options = Linter.ParserOptions & { babelOptions: InputOptions };
export type BabelToken = tokenizerToken & {
  type: ExportedTokenType;
};
export type { Comment } from "../../../packages/babel-parser/src/types";
export type { ParseResult } from "../../../packages/babel-core/src/parser";
export type { AST } from "eslint";

declare enum ReferenceFlag {
  Read = 1,
  Write = 2,
  ReadWrite = 3,
}
interface ReferenceImplicitGlobal {
  node: estree.Node;
  pattern: estree.Identifier;
  ref?: Reference;
}

declare class ESLintScope extends OriginalESLintScope {
  variableScope: ESLintScope;
  __declaredVariables: Map<estree.Node, Variable[]>;
  __left: Reference[];
  constructor(
    scopeManager: ScopeManager,
    type: OriginalESLintScope["type"] | "type-parameters",
    upperScope: ESLintScope,
    block: estree.Node,
    isMethodDefinition: boolean,
  );

  __shouldStaticallyClose(scopeManager: ScopeManager): boolean;

  __shouldStaticallyCloseForGlobal(ref: Reference): boolean;

  __staticCloseRef(ref: Reference): void;

  __dynamicCloseRef(ref: Reference): void;

  __globalCloseRef(ref: Reference): void;

  __close(scopeManager: ScopeManager): void;

  __isValidResolution(ref: Reference, variable: Variable): boolean;

  __resolve(ref: Reference): boolean;

  __delegateToUpperScope(ref: Reference): void;

  __addDeclaredVariablesOfNode(variable: Variable, node: estree.Node): void;

  __defineGeneric(
    name: string,
    set: Map<string, Variable>,
    variables: Variable[],
    node: estree.Node,
    def: ScopeDefinition,
  ): void;

  __define(node: estree.Node, def: ScopeDefinition): void;

  __referencing(
    node: estree.Node,
    assign: ReferenceFlag.Write,
    writeExpr: estree.Node | null,
    maybeImplicitGlobal: ReferenceImplicitGlobal,
    partial: any,
    init: any,
  ): void;

  __detectEval(): void;

  __detectThis(): void;

  __isClosed(): boolean;
}

declare class ScopeManager extends OriginalScopeManager {
  __currentScope: ESLintScope;
  __nestScope(scope: ESLintScope): ESLintScope;
  __nestClassFieldInitializerScope(node: estree.Node): ESLintScope;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare class Referencer extends OriginalReferencer {
  readonly scopeManager: ScopeManager;

  constructor(options: any, scopeManager: ScopeManager);

  currentScope(): ESLintScope;
  currentScope(throwOnNull: true): ESLintScope | null;
}

export type Scope = {
  Definition: ScopeDefinition;
  PatternVisitor: typeof PatternVisitor;
  Referencer: typeof Referencer;
  Scope: typeof ESLintScope;
  ScopeManager: typeof ScopeManager;
};
