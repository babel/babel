import type { Linter } from "eslint";
import type { InputOptions } from "@babel/core";
import type { Token as tokenizerToken } from "../../../packages/babel-parser/src/tokenizer";
import type { ExportedTokenType } from "../../../packages/babel-parser/src/tokenizer/types";
import type * as estree from "estree";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type {
  PatternVisitor,
  Reference,
  ScopeManager,
  Variable,
  Visitor,
} from "@typescript-eslint/scope-manager";

export type Options = Linter.ParserOptions & { babelOptions: InputOptions };
export type BabelToken = tokenizerToken & {
  type: ExportedTokenType;
};
export type { ParseResult } from "../../../packages/babel-core/src/parser";
export type { AST } from "eslint";

declare class ScopeDefinition {
  constructor(
    type: string,
    name: estree.Identifier,
    node: estree.Node,
    parent?: estree.Node,
    index?: number,
    kind?: string,
  );
  type: string;
  name: estree.Identifier;
  node: estree.Node;
  parent?: estree.Node;
  index?: number;
  kind?: string;
}

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

declare class ESLintScope {
  declare type: string;
  declare set: Map<string, Variable>;
  declare taints: Map<string, boolean>;
  declare dynamic: boolean;
  declare block: estree.Node;
  declare through: Reference[];
  declare variables: Variable[];
  declare references: Reference[];
  declare variableScope: ESLintScope;
  declare functionExpressionScope: boolean;
  declare directCallToEvalScope: boolean;
  declare thisFound: boolean;
  declare upper: ESLintScope;
  declare isStrict: boolean;
  declare childScopes: ESLintScope[];
  declare __declaredVariables: Map<estree.Node, Variable[]>;
  declare __left: Reference[];
  constructor(
    scopeManager: ScopeManager,
    type: string,
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

  resolve(ident: estree.Identifier): Reference | null;

  isStatic(): boolean;

  isArgumentsMaterialized(): boolean;

  isThisMaterialized(): boolean;

  isUsedName(name: any): boolean;
}

declare class Referencer extends Visitor {
  readonly scopeManager: ScopeManager & {
    __currentScope: ESLintScope;
    __nestScope(scope: ESLintScope): ESLintScope;
    __nestClassFieldInitializerScope?(scope: ESLintScope): ESLintScope;
  };
  options: any;

  constructor(options: any, scopeManager: ScopeManager);

  currentScope(): ESLintScope;
  currentScope(throwOnNull: true): ESLintScope | null;
  close(node: estree.Node): void;
  referencingDefaultValue(
    pattern: estree.Identifier,
    assignments: (estree.AssignmentExpression | estree.AssignmentPattern)[],
    maybeImplicitGlobal: ReferenceImplicitGlobal | null,
    init: boolean,
  ): void;

  visitProperty(node: estree.Property): void;
  visitClass(node: estree.ClassDeclaration | estree.ClassExpression): void;
  visitFunction(
    node: estree.FunctionDeclaration | estree.FunctionExpression,
  ): void;

  MethodDefinition(node: estree.MethodDefinition): void;
  MemberExpression(node: estree.MemberExpression): void;
}

export type Scope = {
  Definition: typeof ScopeDefinition;
  PatternVisitor: typeof PatternVisitor;
  Referencer: typeof Referencer;
  Scope: typeof ESLintScope;
  ScopeManager: typeof ScopeManager;
};
