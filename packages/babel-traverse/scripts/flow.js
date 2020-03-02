const t = require("@babel/types");
const NODE_PREFIX = "BabelNode";

const types = Object.keys(t.NODE_FIELDS).concat(
  t.TYPES.filter(v => !(v in t.NODE_FIELDS))
);

const code = `// @flow
declare module "@babel/traverse" {
  import type { BabelNode, ${types
    .map(v => NODE_PREFIX + v)
    .join(",\n                ")} } from "@babel/types";

  declare type VariableDeclarationKind =
    | "var"
    | "let"
    | "const"
    | "module"
    | "hoisted";

  declare export interface Binding {
    block: BabelNode;
    path: NodePath<
      | BabelNodeVariableDeclarator
      | BabelNodeClassDeclaration
      | BabelNodeFunctionDeclaration
      | BabelNodeModuleSpecifier
    >;
    referencePaths: Array<NodePath<BabelNodeIdentifier>>;
    constantViolations: Array<
      NodePath<BabelNodeAssignmentExpression | BabelNodeUpdateExpression>
    >;
    identifier: BabelNodeIdentifier;
    scope: Scope;
    kind: VariableDeclarationKind;
    referenced: boolean;
    references: number;
    constant: boolean;
    reference(NodePath<Identifier>): void;
    reassign(NodePath<BabelNodeAssignmentExpression | BabelNodeUpdateExpression>): void;
    dereference(): void;
  }

  declare export interface Scope {
    parent: Scope;
    path: NodePath<BabelNode>;
    references: { [string]: boolean, ... };
    generateUidIdentifier(name?: string): BabelNodeIdentifier;
    generateUid(name?: string): string;
    rename(oldName: string, newName?: string): void;

    setData(key: string, value: mixed): void;
    getData(key: string): ?any;
    removeData(key: string): void;

    getBinding(name: string): ?Binding;
    getOwnBinding(name: string): ?Binding;
    getBindingIdentifier(name: string): ?BabelNodeIdentifier;
    getOwnBindingIdentifier(name: string): ?BabelNodeIdentifier;
    hasOwnBinding(name: string): ?Binding;
    hasBinding(name: string, noGlobals?: boolean): boolean;
    parentHasBinding(name: string, noGlobals?: boolean): boolean;
    removeBinding(name: string): void;

    removeOwnBinding(string): boolean;
    removeBinding(string): boolean;
    registerDeclaration(path: NodePath<BabelDeclaration>): void;
    registerBinding(
      kind: VariableDeclarationKind,
      path: NodePath<BabelNodeVariableDeclaration | BabelNodeVariableDeclarator>
    ): void;
    bindings: {[name: string]: Binding, ...};
    getAllBindings(): {[name: string]: Binding, ...};
    getAllBindingsOfKind(...kinds: Array<string>): {[name: string]: Binding, ...};
    push(opts: {|
      id: BabelNodeLVal,
      init?: BabelNodeExpression | null,
      unique?: boolean,
      kind?: VariableDeclarationKind
    |}): void;

    addGlobal(node: BabelNode): void;
    hasGlobal(name: string): boolean;
    hasReference(name: string): boolean;
    isPure(node: BabelNode, constantsOnly?: boolean): boolean;

    crawl(): void;
    getProgramParent(): Scope;
    getFunctionParent(): Scope;
    getBlockParent(): Scope;
  }

  declare export interface NodePath<+T: BabelNode> {
    node: T;
    scope: Scope;
    parent: BabelNode;
    parentPath: NodePath<BabelNode>;
    get<U: NodePath<BabelNode> | $ReadOnlyArray<NodePath<BabelNode>>>(string): U;
    getStatementParent(): NodePath<Statement>;
    findParent(cb: (NodePath<BabelNode>) => boolean): ?NodePath<BabelNode>;
    find(cb: (NodePath<BabelNode>) => boolean): ?NodePath<BabelNode>;
    getFunctionParent(): NodePath<BabelFunction>;
    getAncestry(): Array<NodePath<BabelNode>>;
    isAncestor(NodePath<BabelNode>): boolean;
    isDescendant(NodePath<BabelNode>): boolean;

    remove(): void;
    replaceWith<U: BabelNode>(U): NodePath<U>;
    replaceWithMultiple<U: BabelNode>(Array<U>): $ReadOnlyArray<NodePath<U>>;
    insertBefore<U: BabelNode>(
      Array<U> | U
    ): $ReadOnlyArray<NodePath<U>>;
    insertAfter<U: BabelNode>(
      Array<U> | U
    ): $ReadOnlyArray<NodePath<U>>;
    unshiftContainer<U: BabelNode>(
      string,
      Array<U> | U
    ): $ReadOnlyArray<NodePath<U>>;
    pushContainer<U: BabelNode>(
      string,
      Array<U> | U
    ): $ReadOnlyArray<NodePath<U>>;
    matchesPattern(
      match: string | Array<string>,
      allowPartial?: boolean
    ): boolean;

    getPrevSibling(): NodePath<BabelNode>;
    getNextSibling(): NodePath<BabelNode>;
    getAllNextSiblings(): $ReadOnlyArray<NodePath<BabelNode>>;
    getAllPrevSiblings(): $ReadOnlyArray<NodePath<BabelNode>>;

    getBindingIdentifiers(
      duplicates?: boolean
    ): { [string]: BabelNodeIdentifier, ... };
    getOuterBindingIdentifiers(
      duplicates?: boolean
    ): { [string]: BabelNodeIdentifier, ... };
    getBindingIdentifierPaths(
      duplicates?: boolean,
      outer?: boolean
    ): { [string]: NodePath<BabelNodeIdentifier>, ... };
    getOuterBindingIdentifierPaths(
      duplicates?: boolean
    ): { [string]: NodePath<BabelNodeIdentifier>, ... };

    evaluateTruthy(): ?boolean;
    evaluate(): {| confident: boolean, value: any |};

    arrowFunctionToExpression({|
      allowInsertArrow?: boolean,
      specCompliant?: boolean
    |}): void;
    ensureBlock(): BabelBlockStatement;

    addComment(type: string, content: string, line?: boolean): void;
    addComments(type: string, comments: Array<string>): void;

    setData(string, any): void;
    getData(string): any;

    isPure(): boolean;
    isGenerated(): boolean;
    isUser(): boolean;
    isVar(): boolean;
    isBlockScoped(): boolean;
    isReferenced(): boolean;
    isScope(): boolean;
    isBindingIdentifier(): boolean;
    isReferencedMemberExpression(): boolean;

    traverse<S>(visitor: Visitor<S>, state?: S): void;
    stop(): void;
    skip(): void;
    requeue(pathToQueue?: NodePath<BabelNode>): void;

    ${types
      .map(v => `is${v.charAt(0).toUpperCase() + v.slice(1)}(): boolean;`)
      .join("\n    ")}
  }
  declare export default {|
    <S>(
      node: BabelNode,
      visitor: Visitor<S>,
      scope?: Object,
      state?: S,
      parentPath?: BabelNode
    ): void,
    cache: {|
      clear(): void,
      clearPath(): void,
      clearScope(): void
    |}
  |};

  declare type VisitorFunc<N: BabelNode, S> = (NodePath<N>, S) => void;
  declare type SingleVisitor<N: BabelNode, S> =
    | VisitorFunc<N, S>
    | {|
        enter?: VisitorFunc<N, S>,
        exit?: VisitorFunc<N, S>
      |};

  declare export type Visitor<S> = {|
    noScope?: boolean,
    blacklist?: Array<string>,
    shouldSkip?: (NodePath<BabelNode>) => boolean,
    ReferencedIdentifier?: SingleVisitor<BabelNodeIdentifier, S>,
    ${types
      .map(v => `${v}?: SingleVisitor<${NODE_PREFIX + v}, S>,`)
      .join("\n    ")}
  |};
}
`;

process.stdout.write(code);
