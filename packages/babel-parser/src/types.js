// @flow

import type { Token } from "./tokenizer";
import type { SourceLocation } from "./util/location";

/*
 * If making any changes to the AST, update:
 * - This repository:
 *   - This file
 *   - `ast` directory
 * - Babel repository:
 *   - packages/babel-types/src/definitions
 *   - packages/babel-generators/src/generators
 */

export type Comment = {
  type: "CommentBlock" | "CommentLine",
  value: string,
  start: number,
  end: number,
  loc: SourceLocation,
};

export interface NodeBase {
  start: number;
  end: number;
  loc: SourceLocation;
  range: [number, number];
  leadingComments?: Array<Comment>;
  trailingComments?: Array<Comment>;
  innerComments?: Array<Comment>;

  extra: { [key: string]: any };
}

// Using a union type for `Node` makes type-checking too slow.
// Instead, add an index signature to allow a Node to be treated as anything.
export type Node = NodeBase & { [key: string]: any };
export type Expression = Node;
export type Statement = Node;
export type Pattern =
  | Identifier
  | ObjectPattern
  | ArrayPattern
  | RestElement
  | AssignmentPattern;
export type Declaration =
  | VariableDeclaration
  | ClassDeclaration
  | FunctionDeclaration
  | TsInterfaceDeclaration
  | TsTypeAliasDeclaration
  | TsEnumDeclaration
  | TsModuleDeclaration;
export type DeclarationBase = NodeBase & {
  // TypeScript allows declarations to be prefixed by `declare`.
  //TODO: a FunctionDeclaration is never "declare", because it's a TSDeclareFunction instead.
  declare?: true,
};

// TODO: Not in spec
export type HasDecorators = NodeBase & {
  decorators?: $ReadOnlyArray<Decorator>,
};

export type InterpreterDirective = NodeBase & {
  type: "InterpreterDirective",
  value: string,
};

export type Identifier = PatternBase & {
  type: "Identifier",
  name: string,

  __clone(): Identifier,

  // TypeScript only. Used in case of an optional parameter.
  optional?: ?true,
};

export type PrivateName = NodeBase & {
  type: "PrivateName",
  id: Identifier,
};

// Literals

export type Literal =
  | RegExpLiteral
  | NullLiteral
  | StringLiteral
  | BooleanLiteral
  | NumericLiteral;

export type RegExpLiteral = NodeBase & {
  type: "RegExpLiteral",
  pattern: string,
  flags: RegExp$flags,
};

export type NullLiteral = NodeBase & {
  type: "NullLiteral",
};

export type StringLiteral = NodeBase & {
  type: "StringLiteral",
  value: string,
};

export type BooleanLiteral = NodeBase & {
  type: "BooleanLiteral",
  value: boolean,
};

export type NumericLiteral = NodeBase & {
  type: "NumericLiteral",
  value: number,
};

export type BigIntLiteral = NodeBase & {
  type: "BigIntLiteral",
  value: number,
};

// Programs

export type BlockStatementLike = Program | BlockStatement;

export type File = NodeBase & {
  type: "File",
  program: Program,
  comments: $ReadOnlyArray<Comment>,
  tokens: $ReadOnlyArray<Token | Comment>,
};

export type Program = NodeBase & {
  type: "Program",
  sourceType: "script" | "module",
  body: Array<Statement | ModuleDeclaration>, // TODO: $ReadOnlyArray
  directives: $ReadOnlyArray<Directive>, // TODO: Not in spec
  interpreter: InterpreterDirective | null,
};

// Functions

export type Function =
  | NormalFunction
  | ArrowFunctionExpression
  | ObjectMethod
  | ClassMethod;

export type NormalFunction = FunctionDeclaration | FunctionExpression;

export type BodilessFunctionOrMethodBase = HasDecorators & {
  // TODO: Remove this. Should not assign "id" to methods.
  // https://github.com/babel/babylon/issues/535
  id: ?Identifier,

  params: $ReadOnlyArray<Pattern | TSParameterProperty>,
  body: BlockStatement,
  generator: boolean,
  async: boolean,

  // TODO: All not in spec
  expression: boolean,
  typeParameters?: ?TypeParameterDeclarationBase,
  returnType?: ?TypeAnnotationBase,
};

export type BodilessFunctionBase = BodilessFunctionOrMethodBase & {
  id: ?Identifier,
};

export type FunctionBase = BodilessFunctionBase & {
  body: BlockStatement,
};

// Statements

export type ExpressionStatement = NodeBase & {
  type: "ExpressionStatement",
  expression: Expression,
};

export type BlockStatement = NodeBase & {
  type: "BlockStatement",
  body: Array<Statement>, // TODO: $ReadOnlyArray
  directives: $ReadOnlyArray<Directive>,
};

export type EmptyStatement = NodeBase & {
  type: "EmptyStatement",
};

export type DebuggerStatement = NodeBase & {
  type: "DebuggerStatement",
};

export type WithStatement = NodeBase & {
  type: "WithStatement",
  object: Expression,
  body: Statement,
};

export type ReturnStatement = NodeBase & {
  type: "ReturnStatement",
  argument: ?Expression,
};

export type LabeledStatement = NodeBase & {
  type: "LabeledStatement",
  label: Identifier,
  body: Statement,
};

export type BreakStatement = NodeBase & {
  type: "BreakStatement",
  label: ?Identifier,
};

export type ContinueStatement = NodeBase & {
  type: "ContinueStatement",
  label: ?Identifier,
};

// Choice

export type IfStatement = NodeBase & {
  type: "IfStatement",
  test: Expression,
  consequent: Statement,
  alternate: ?Statement,
};

export type SwitchStatement = NodeBase & {
  type: "SwitchStatement",
  discriminant: Expression,
  cases: $ReadOnlyArray<SwitchCase>,
};

export type SwitchCase = NodeBase & {
  type: "SwitchCase",
  test: ?Expression,
  consequent: $ReadOnlyArray<Statement>,
};

// Exceptions

export type ThrowStatement = NodeBase & {
  type: "ThrowStatement",
  argument: Expression,
};

export type TryStatement = NodeBase & {
  type: "TryStatement",
  block: BlockStatement,
  handler: CatchClause | null,
  finalizer: BlockStatement | null,

  guardedHandlers: $ReadOnlyArray<empty>, // TODO: Not in spec
};

export type CatchClause = NodeBase & {
  type: "CatchClause",
  param: Pattern,
  body: BlockStatement,
};

// Loops

export type WhileStatement = NodeBase & {
  type: "WhileStatement",
  test: Expression,
  body: Statement,
};

export type DoWhileStatement = NodeBase & {
  type: "DoWhileStatement",
  body: Statement,
  test: Expression,
};

export type ForLike = ForStatement | ForInOf;

export type ForStatement = NodeBase & {
  type: "ForStatement",
  init: ?(VariableDeclaration | Expression),
  test: ?Expression,
  update: ?Expression,
  body: Statement,
};

export type ForInOf = ForInStatement | ForOfStatement;

export type ForInOfBase = NodeBase & {
  type: "ForInStatement",
  left: VariableDeclaration | Expression,
  right: Expression,
  body: Statement,
};

export type ForInStatement = ForInOfBase & {
  type: "ForInStatement",
  // TODO: Shouldn't be here, but have to declare it because it's assigned to a ForInOf unconditionally.
  await: boolean,
};

export type ForOfStatement = ForInOfBase & {
  type: "ForOfStatement",
  await: boolean,
};

// Declarations

export type OptFunctionDeclaration = FunctionBase &
  DeclarationBase & {
    type: "FunctionDeclaration",
  };

export type FunctionDeclaration = OptFunctionDeclaration & {
  id: Identifier,
};

export type VariableDeclaration = DeclarationBase &
  HasDecorators & {
    type: "VariableDeclaration",
    declarations: $ReadOnlyArray<VariableDeclarator>,
    kind: "var" | "let" | "const",
  };

export type VariableDeclarator = NodeBase & {
  type: "VariableDeclarator",
  id: Pattern,
  init: ?Expression,

  // TypeScript only:
  definite?: true,
};

// Misc

export type Decorator = NodeBase & {
  type: "Decorator",
  expression: Expression,
  arguments?: Array<Expression | SpreadElement>,
};

export type Directive = NodeBase & {
  type: "Directive",
  value: DirectiveLiteral,
};

export type DirectiveLiteral = StringLiteral & { type: "DirectiveLiteral" };

// Expressions

export type Super = NodeBase & { type: "Super" };

export type Import = NodeBase & { type: "Import" };

export type ThisExpression = NodeBase & { type: "ThisExpression" };

export type ArrowFunctionExpression = FunctionBase & {
  type: "ArrowFunctionExpression",
  body: BlockStatement | Expression,
};

export type YieldExpression = NodeBase & {
  type: "YieldExpression",
  argument: ?Expression,
  delegate: boolean,
};

export type AwaitExpression = NodeBase & {
  type: "AwaitExpression",
  argument: ?Expression,
};

export type ArrayExpression = NodeBase & {
  type: "ArrayExpression",
  elements: $ReadOnlyArray<?(Expression | SpreadElement)>,
};

export type ObjectExpression = NodeBase & {
  type: "ObjectExpression",
  properties: $ReadOnlyArray<ObjectProperty | ObjectMethod | SpreadElement>,
};

export type ObjectOrClassMember = ClassMethod | ClassProperty | ObjectMember;

export type ObjectMember = ObjectProperty | ObjectMethod;

export type ObjectMemberBase = NodeBase & {
  key: Expression,
  computed: boolean,
  value: Expression,
  decorators: $ReadOnlyArray<Decorator>,
  kind?: "get" | "set" | "method",
  method: boolean, // TODO: Not in spec

  variance?: ?FlowVariance, // TODO: Not in spec
};

export type ObjectProperty = ObjectMemberBase & {
  type: "ObjectProperty",
  shorthand: boolean,
};

export type ObjectMethod = ObjectMemberBase &
  MethodBase & {
    type: "ObjectMethod",
    kind: "get" | "set" | "method", // Never "constructor"
  };

export type FunctionExpression = MethodBase & {
  kind?: void, // never set
  type: "FunctionExpression",
};

// Unary operations

export type UnaryExpression = NodeBase & {
  type: "UnaryExpression",
  operator: UnaryOperator,
  prefix: boolean,
  argument: Expression,
};

export type UnaryOperator =
  | "-"
  | "+"
  | "!"
  | "~"
  | "typeof"
  | "void"
  | "delete"
  | "throw";

export type UpdateExpression = NodeBase & {
  type: "UpdateExpression",
  operator: UpdateOperator,
  argument: Expression,
  prefix: boolean,
};

export type UpdateOperator = "++" | "--";

// Binary operations

export type BinaryExpression = NodeBase & {
  type: "BinaryExpression",
  operator: BinaryOperator,
  left: Expression,
  right: Expression,
};

export type BinaryOperator =
  | "=="
  | "!="
  | "==="
  | "!=="
  | "<"
  | "<="
  | ">"
  | ">="
  | "<<"
  | ">>"
  | ">>>"
  | "+"
  | "-"
  | "*"
  | "/"
  | "%"
  | "|"
  | "^"
  | "&"
  | "in"
  | "instanceof";

export type AssignmentExpression = NodeBase & {
  type: "AssignmentExpression",
  operator: AssignmentOperator,
  left: Pattern | Expression,
  right: Expression,
};

export type AssignmentOperator =
  | "="
  | "+="
  | "-="
  | "*="
  | "/="
  | "%="
  | "<<="
  | ">>="
  | ">>>="
  | "|="
  | "^="
  | "&=";

export type LogicalExpression = NodeBase & {
  type: "LogicalExpression",
  operator: LogicalOperator,
  left: Expression,
  right: Expression,
};

export type LogicalOperator = "||" | "&&";

export type SpreadElement = NodeBase & {
  type: "SpreadElement",
  argument: Expression,
};

export type MemberExpression = NodeBase & {
  type: "MemberExpression",
  object: Expression | Super,
  property: Expression,
  computed: boolean,
};

export type OptionalMemberExpression = NodeBase & {
  type: "OptionalMemberExpression",
  object: Expression | Super,
  property: Expression,
  computed: boolean,
  optional: boolean,
};

export type OptionalCallExpression = CallOrNewBase & {
  type: "OptionalCallExpression",
  optional: boolean,
};
export type BindExpression = NodeBase & {
  type: "BindExpression",
  object: $ReadOnlyArray<?Expression>,
  callee: $ReadOnlyArray<Expression>,
};

export type ConditionalExpression = NodeBase & {
  type: "ConditionalExpression",
  test: Expression,
  alternate: Expression,
  consequent: Expression,
};

export type CallOrNewBase = NodeBase & {
  callee: Expression | Super | Import,
  arguments: Array<Expression | SpreadElement>, // TODO: $ReadOnlyArray
  typeArguments: ?TypeParameterInstantiationBase,
  typeParameters?: ?TypeParameterInstantiationBase, // TODO: Not in spec
};

export type CallExpression = CallOrNewBase & {
  type: "CallExpression",
};

export type NewExpression = CallOrNewBase & {
  type: "NewExpression",
  optional?: boolean, // TODO: Not in spec
};

export type SequenceExpression = NodeBase & {
  type: "SequenceExpression",
  expressions: $ReadOnlyArray<Expression>,
};

// Template Literals

export type TemplateLiteral = NodeBase & {
  type: "TemplateLiteral",
  quasis: $ReadOnlyArray<TemplateElement>,
  expressions: $ReadOnlyArray<Expression>,
};

export type TaggedTemplateExpression = NodeBase & {
  type: "TaggedTemplateExpression",
  tag: Expression,
  quasi: TemplateLiteral,
};

export type TemplateElement = NodeBase & {
  type: "TemplateElement",
  tail: boolean,
  value: {
    cooked: string,
    raw: string,
  },
};

// Patterns

// TypeScript access modifiers
export type Accessibility = "public" | "protected" | "private";

export type PatternBase = HasDecorators & {
  // TODO: All not in spec
  // Flow/TypeScript only:
  typeAnnotation?: ?TypeAnnotationBase,
};

export type AssignmentProperty = ObjectProperty & {
  value: Pattern,
};

export type ObjectPattern = PatternBase & {
  type: "ObjectPattern",
  properties: $ReadOnlyArray<AssignmentProperty | RestElement>,
};

export type ArrayPattern = PatternBase & {
  type: "ArrayPattern",
  elements: $ReadOnlyArray<?Pattern>,
};

export type RestElement = PatternBase & {
  type: "RestElement",
  argument: Pattern,
};

export type AssignmentPattern = PatternBase & {
  type: "AssignmentPattern",
  left: Pattern,
  right: Expression,
};

// Classes

export type Class = ClassDeclaration | ClassExpression;

export type ClassBase = HasDecorators & {
  id: ?Identifier,
  superClass: ?Expression,
  body: ClassBody,
  decorators: $ReadOnlyArray<Decorator>,

  // TODO: All not in spec
  typeParameters?: ?TypeParameterDeclarationBase,
  superTypeParameters?: ?TypeParameterInstantiationBase,
  implements?:
    | ?$ReadOnlyArray<TsExpressionWithTypeArguments>
    | $ReadOnlyArray<FlowClassImplements>,
};

export type ClassBody = NodeBase & {
  type: "ClassBody",
  body: Array<ClassMember | TsIndexSignature>, // TODO: $ReadOnlyArray
};

export type ClassMemberBase = NodeBase &
  HasDecorators & {
    static: boolean,
    computed: boolean,
    // TypeScript only:
    accessibility?: ?Accessibility,
    abstract?: ?true,
    optional?: ?true,
  };

export type ClassMember =
  | ClassMethod
  | ClassPrivateMethod
  | ClassProperty
  | ClassPrivateProperty;

export type MethodLike =
  | ObjectMethod
  | FunctionExpression
  | ClassMethod
  | ClassPrivateMethod
  | TSDeclareMethod;

export type MethodBase = FunctionBase & {
  +kind: MethodKind,
};

export type MethodKind = "constructor" | "method" | "get" | "set";

export type ClassMethodOrDeclareMethodCommon = ClassMemberBase & {
  key: Expression,
  kind: MethodKind,
  static: boolean,
  decorators: $ReadOnlyArray<Decorator>,
};

export type ClassMethod = MethodBase &
  ClassMethodOrDeclareMethodCommon & {
    type: "ClassMethod",
    variance?: ?FlowVariance, // TODO: Not in spec
  };

export type ClassPrivateMethod = NodeBase &
  ClassMethodOrDeclareMethodCommon &
  MethodBase & {
    type: "ClassPrivateMethod",
    key: PrivateName,
    computed: false,
  };

export type ClassProperty = ClassMemberBase & {
  type: "ClassProperty",
  key: Expression,
  value: ?Expression, // TODO: Not in spec that this is nullable.

  typeAnnotation?: ?TypeAnnotationBase, // TODO: Not in spec
  variance?: ?FlowVariance, // TODO: Not in spec

  // TypeScript only: (TODO: Not in spec)
  readonly?: true,
  definite?: true,
};

export type ClassPrivateProperty = NodeBase & {
  type: "ClassPrivateProperty",
  key: PrivateName,
  value: ?Expression, // TODO: Not in spec that this is nullable.
  static: boolean,
  computed: false,
  typeAnnotation?: ?TypeAnnotationBase, // TODO: Not in spec
};

export type OptClassDeclaration = ClassBase &
  DeclarationBase &
  HasDecorators & {
    type: "ClassDeclaration",
    // TypeScript only
    abstract?: ?true,
  };

export type ClassDeclaration = OptClassDeclaration & {
  id: Identifier,
};

export type ClassExpression = ClassBase & { type: "ClassExpression" };

export type MetaProperty = NodeBase & {
  type: "MetaProperty",
  meta: Identifier,
  property: Identifier,
};

// Modules

export type ModuleDeclaration = AnyImport | AnyExport;

export type AnyImport = ImportDeclaration | TsImportEqualsDeclaration;

export type AnyExport =
  | ExportNamedDeclaration
  | ExportDefaultDeclaration
  | ExportAllDeclaration
  | TsExportAssignment;

export type ModuleSpecifier = NodeBase & {
  local: Identifier,
};

// Imports

export type ImportDeclaration = NodeBase & {
  type: "ImportDeclaration",
  // TODO: $ReadOnlyArray
  specifiers: Array<
    ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier,
  >,
  source: Literal,

  importKind?: "type" | "typeof" | "value", // TODO: Not in spec
};

export type ImportSpecifier = ModuleSpecifier & {
  type: "ImportSpecifier",
  imported: Identifier,
};

export type ImportDefaultSpecifier = ModuleSpecifier & {
  type: "ImportDefaultSpecifier",
};

export type ImportNamespaceSpecifier = ModuleSpecifier & {
  type: "ImportNamespaceSpecifier",
};

// Exports

export type ExportNamedDeclaration = NodeBase & {
  type: "ExportNamedDeclaration",
  declaration: ?Declaration,
  specifiers: $ReadOnlyArray<ExportSpecifier>,
  source: ?Literal,

  exportKind?: "type" | "value", // TODO: Not in spec
};

export type ExportSpecifier = NodeBase & {
  type: "ExportSpecifier",
  exported: Identifier,
};

export type ExportDefaultDeclaration = NodeBase & {
  type: "ExportDefaultDeclaration",
  declaration:
    | OptFunctionDeclaration
    | OptTSDeclareFunction
    | OptClassDeclaration
    | Expression,
};

export type ExportAllDeclaration = NodeBase & {
  type: "ExportAllDeclaration",
  source: Literal,
  exportKind?: "type" | "value", // TODO: Not in spec
};

// JSX (TODO: Not in spec)

export type JSXIdentifier = Node;
export type JSXNamespacedName = Node;
export type JSXMemberExpression = Node;
export type JSXEmptyExpression = Node;
export type JSXSpreadChild = Node;
export type JSXExpressionContainer = Node;
export type JSXAttribute = Node;
export type JSXOpeningElement = NodeBase & {
  type: "JSXOpeningElement",
  name: JSXNamespacedName | JSXMemberExpression,
  typeParameters?: ?TypeParameterInstantiationBase, // TODO: Not in spec
  attributes: $ReadOnlyArray<JSXAttribute>,
  selfClosing: boolean,
};
export type JSXClosingElement = Node;
export type JSXElement = Node;
export type JSXOpeningFragment = Node;
export type JSXClosingFragment = Node;
export type JSXFragment = Node;

// Flow/TypeScript common (TODO: Not in spec)

export type TypeAnnotationBase = NodeBase & {
  typeAnnotation: Node,
};

export type TypeAnnotation = NodeBase & {
  type: "TypeAnnotation",
  typeAnnotation: FlowTypeAnnotation,
};

export type TsTypeAnnotation = NodeBase & {
  type: "TSTypeAnnotation",
  typeAnnotation: TsType,
};

export type TypeParameterDeclarationBase = NodeBase & {
  params: $ReadOnlyArray<TypeParameterBase>,
};

export type TypeParameterDeclaration = TypeParameterDeclarationBase & {
  type: "TypeParameterDeclaration",
  params: $ReadOnlyArray<TypeParameter>,
};

export type TsTypeParameterDeclaration = TypeParameterDeclarationBase & {
  type: "TsTypeParameterDeclaration",
  params: $ReadOnlyArray<TsTypeParameter>,
};

export type TypeParameterBase = NodeBase & {
  name: string,
};

export type TypeParameter = TypeParameterBase & {
  type: "TypeParameter",
  default?: TypeAnnotation,
};

export type TsTypeParameter = TypeParameterBase & {
  type: "TSTypeParameter",
  constraint?: TsType,
  default?: TsType,
};

export type TypeParameterInstantiationBase = NodeBase & {
  params: $ReadOnlyArray<Node>,
};

export type TypeParameterInstantiation = TypeParameterInstantiationBase & {
  type: "TypeParameterInstantiation",
  params: $ReadOnlyArray<FlowType>,
};

export type TsTypeParameterInstantiation = TypeParameterInstantiationBase & {
  type: "TSTypeParameterInstantiation",
  params: $ReadOnlyArray<TsType>,
};

// Flow (TODO: Not in spec)

export type TypeCastExpressionBase = NodeBase & {
  expression: Expression,
  typeAnnotation: TypeAnnotationBase,
};

export type TypeCastExpression = NodeBase & {
  type: "TypeCastExpression",
  expression: Expression,
  typeAnnotation: TypeAnnotation,
};

export type TsTypeCastExpression = NodeBase & {
  type: "TSTypeCastExpression",
  expression: Expression,
  typeAnnotation: TsTypeAnnotation,
};

export type FlowType = Node;
export type FlowPredicate = Node;
export type FlowDeclare = Node;
export type FlowDeclareClass = Node;
export type FlowDeclareExportDeclaration = Node;
export type FlowDeclareFunction = Node;
export type FlowDeclareVariable = Node;
export type FlowDeclareModule = Node;
export type FlowDeclareModuleExports = Node;
export type FlowDeclareTypeAlias = Node;
export type FlowDeclareOpaqueType = Node;
export type FlowDeclareInterface = Node;
export type FlowInterface = Node;
export type FlowInterfaceExtends = Node;
export type FlowTypeAlias = Node;
export type FlowOpaqueType = Node;
export type FlowObjectTypeIndexer = Node;
export type FlowObjectTypeInternalSlot = Node;
export type FlowFunctionTypeAnnotation = Node;
export type FlowObjectTypeProperty = Node;
export type FlowObjectTypeSpreadProperty = Node;
export type FlowObjectTypeCallProperty = Node;
export type FlowObjectTypeAnnotation = Node;
export type FlowQualifiedTypeIdentifier = Node;
export type FlowGenericTypeAnnotation = Node;
export type FlowTypeofTypeAnnotation = Node;
export type FlowTupleTypeAnnotation = Node;
export type FlowFunctionTypeParam = Node;
export type FlowTypeAnnotation = Node;
export type FlowVariance = Node;
export type FlowClassImplements = Node;

export type FlowInterfaceType = NodeBase & {
  type: "FlowInterfaceType",
  extends: FlowInterfaceExtends,
  body: FlowObjectTypeAnnotation,
};

// estree

export type EstreeProperty = NodeBase & {
  type: "Property",
  shorthand: boolean,
  key: Expression,
  computed: boolean,
  value: Expression,
  decorators: $ReadOnlyArray<Decorator>,
  kind?: "get" | "set" | "init",

  variance?: ?FlowVariance,
};

export type EstreeMethodDefinition = NodeBase & {
  type: "MethodDefinition",
  static: boolean,
  key: Expression,
  computed: boolean,
  value: Expression,
  decorators: $ReadOnlyArray<Decorator>,
  kind?: "get" | "set" | "method",

  variance?: ?FlowVariance,
};

// === === === ===
// TypeScript
// === === === ===

// Note: A type named `TsFoo` is based on TypeScript's `FooNode` type,
// defined in https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts
// Differences:
// * Change `NodeArray<T>` to just `$ReadOnlyArray<T>`.
// * Don't give nodes a "modifiers" list; use boolean flags instead,
//   and only allow modifiers that are not considered errors.
// * A property named `type` must be renamed to `typeAnnotation` to avoid conflict with the node's type.
// * Sometimes TypeScript allows to parse something which will be a grammar error later;
//   in @babel/parser these cause exceptions, so the AST format is stricter.

// ================
// Misc
// ================

export type TSParameterProperty = HasDecorators & {
  // Note: This has decorators instead of its parameter.
  type: "TSParameterProperty",
  // At least one of `accessibility` or `readonly` must be set.
  accessibility?: ?Accessibility,
  readonly?: ?true,
  parameter: Identifier | AssignmentPattern,
};

export type OptTSDeclareFunction = BodilessFunctionBase &
  DeclarationBase & {
    type: "TSDeclareFunction",
  };

export type TSDeclareFunction = OptTSDeclareFunction & {
  id: Identifier,
};

export type TSDeclareMethod = BodilessFunctionOrMethodBase &
  ClassMethodOrDeclareMethodCommon & {
    type: "TSDeclareMethod",
    +kind: MethodKind,
  };

export type TsQualifiedName = NodeBase & {
  type: "TSQualifiedName",
  left: TsEntityName,
  right: Identifier,
};

export type TsEntityName = Identifier | TsQualifiedName;

export type TsSignatureDeclaration =
  | TsCallSignatureDeclaration
  | TsConstructSignatureDeclaration
  | TsMethodSignature
  | TsFunctionType
  | TsConstructorType;

export type TsSignatureDeclarationOrIndexSignatureBase = NodeBase & {
  // Not using TypeScript's "ParameterDeclaration" here, since it's inconsistent with regular functions.
  parameters: $ReadOnlyArray<Identifier | RestElement>,
  typeAnnotation: ?TsTypeAnnotation,
};

export type TsSignatureDeclarationBase = TsSignatureDeclarationOrIndexSignatureBase & {
  typeParameters: ?TsTypeParameterDeclaration,
};

// ================
// TypeScript type members (for type literal / interface / class)
// ================

export type TsTypeElement =
  | TsCallSignatureDeclaration
  | TsConstructSignatureDeclaration
  | TsPropertySignature
  | TsMethodSignature
  | TsIndexSignature;

export type TsCallSignatureDeclaration = TsSignatureDeclarationBase & {
  type: "TSCallSignatureDeclaration",
};

export type TsConstructSignatureDeclaration = TsSignatureDeclarationBase & {
  type: "TSConstructSignature",
};

export type TsNamedTypeElementBase = NodeBase & {
  // Not using TypeScript's `PropertyName` here since we don't have a `ComputedPropertyName` node type.
  // This is usually an Identifier but may be e.g. `Symbol.iterator` if `computed` is true.
  key: Expression,
  computed: boolean,
  optional?: true,
};

export type TsPropertySignature = TsNamedTypeElementBase & {
  type: "TSPropertySignature",
  readonly?: true,
  typeAnnotation?: TsTypeAnnotation,
  initializer?: Expression,
};

export type TsMethodSignature = TsSignatureDeclarationBase &
  TsNamedTypeElementBase & {
    type: "TSMethodSignature",
  };

// *Not* a ClassMemberBase: Can't have accessibility, can't be abstract, can't be optional.
export type TsIndexSignature = TsSignatureDeclarationOrIndexSignatureBase & {
  readonly?: true,
  type: "TSIndexSignature",
  // Note: parameters.length must be 1.
};

// ================
// TypeScript types
// ================

export type TsType =
  | TsKeywordType
  | TsThisType
  | TsFunctionOrConstructorType
  | TsTypeReference
  | TsTypeQuery
  | TsTypeLiteral
  | TsArrayType
  | TsTupleType
  | TsUnionOrIntersectionType
  | TsConditionalType
  | TsInferType
  | TsParenthesizedType
  | TsTypeOperator
  | TsIndexedAccessType
  | TsMappedType
  | TsLiteralType
  // TODO: This probably shouldn't be included here.
  | TsTypePredicate;

export type TsTypeBase = NodeBase;

export type TsKeywordTypeType =
  | "TSAnyKeyword"
  | "TSNumberKeyword"
  | "TSObjectKeyword"
  | "TSBooleanKeyword"
  | "TSStringKeyword"
  | "TSSymbolKeyword"
  | "TSVoidKeyword"
  | "TSUndefinedKeyword"
  | "TSNullKeyword"
  | "TSNeverKeyword";
export type TsKeywordType = TsTypeBase & {
  type: TsKeywordTypeType,
};

export type TsThisType = TsTypeBase & {
  type: "TSThisType",
};

export type TsFunctionOrConstructorType = TsFunctionType | TsConstructorType;

export type TsFunctionType = TsTypeBase &
  TsSignatureDeclarationBase & {
    type: "TSFunctionType",
    typeAnnotation: TypeAnnotation, // not optional
  };

export type TsConstructorType = TsTypeBase &
  TsSignatureDeclarationBase & {
    type: "TSConstructorType",
    typeAnnotation: TsTypeAnnotation,
  };

export type TsTypeReference = TsTypeBase & {
  type: "TSTypeReference",
  typeName: TsEntityName,
  typeParameters?: TsTypeParameterInstantiation,
};

export type TsTypePredicate = TsTypeBase & {
  type: "TSTypePredicate",
  parameterName: Identifier | TsThisType,
  typeAnnotation: TsTypeAnnotation,
};

// `typeof` operator
export type TsTypeQuery = TsTypeBase & {
  type: "TSTypeQuery",
  exprName: TsEntityName,
};

export type TsTypeLiteral = TsTypeBase & {
  type: "TSTypeLiteral",
  members: $ReadOnlyArray<TsTypeElement>,
};

export type TsArrayType = TsTypeBase & {
  type: "TSArrayType",
  elementType: TsType,
};

export type TsTupleType = TsTypeBase & {
  type: "TSTupleType",
  elementTypes: $ReadOnlyArray<TsType>,
};

export type TsUnionOrIntersectionType = TsUnionType | TsIntersectionType;

export type TsUnionOrIntersectionTypeBase = TsTypeBase & {
  types: $ReadOnlyArray<TsType>,
};

export type TsUnionType = TsUnionOrIntersectionTypeBase & {
  type: "TSUnionType",
};

export type TsIntersectionType = TsUnionOrIntersectionTypeBase & {
  type: "TSIntersectionType",
};

export type TsConditionalType = TsTypeBase & {
  type: "TSConditionalType",
  checkType: TsType,
  extendsType: TsType,
  trueType: TsType,
  falseType: TsType,
};

export type TsInferType = TsTypeBase & {
  type: "TSInferType",
  typeParameter: TypeParameter,
};

export type TsParenthesizedType = TsTypeBase & {
  type: "TSParenthesizedType",
  typeAnnotation: TsType,
};

export type TsTypeOperator = TsTypeBase & {
  type: "TSTypeOperator",
  operator: "keyof" | "unique",
  typeAnnotation: TsType,
};

export type TsIndexedAccessType = TsTypeBase & {
  type: "TSIndexedAccessType",
  objectType: TsType,
  indexType: TsType,
};

export type TsMappedType = TsTypeBase & {
  type: "TSMappedType",
  readonly?: true | "+" | "-",
  typeParameter: TsTypeParameter,
  optional?: true | "+" | "-",
  typeAnnotation: ?TsType,
};

export type TsLiteralType = TsTypeBase & {
  type: "TSLiteralType",
  literal: NumericLiteral | StringLiteral | BooleanLiteral,
};

// ================
// TypeScript declarations
// ================

export type TsInterfaceDeclaration = DeclarationBase & {
  type: "TSInterfaceDeclaration",
  id: Identifier,
  typeParameters: ?TsTypeParameterDeclaration,
  // TS uses "heritageClauses", but want this to resemble ClassBase.
  extends?: $ReadOnlyArray<TsExpressionWithTypeArguments>,
  body: TSInterfaceBody,
};

export type TSInterfaceBody = NodeBase & {
  type: "TSInterfaceBody",
  body: $ReadOnlyArray<TsTypeElement>,
};

export type TsExpressionWithTypeArguments = TsTypeBase & {
  type: "TSExpressionWithTypeArguments",
  expression: TsEntityName,
  typeParameters?: TsTypeParameterInstantiation,
};

export type TsTypeAliasDeclaration = DeclarationBase & {
  type: "TSTypeAliasDeclaration",
  id: Identifier,
  typeParameters: ?TsTypeParameterDeclaration,
  typeAnnotation: TsType,
};

export type TsEnumDeclaration = DeclarationBase & {
  type: "TSEnumDeclaration",
  const?: true,
  id: Identifier,
  members: $ReadOnlyArray<TsEnumMember>,
};

export type TsEnumMember = NodeBase & {
  type: "TSEnumMemodulmber",
  id: Identifier | StringLiteral,
  initializer?: Expression,
};

export type TsModuleDeclaration = DeclarationBase & {
  type: "TSModuleDeclaration",
  global?: true, // In TypeScript, this is only available through `node.flags`.
  id: TsModuleName,
  body: TsNamespaceBody,
};

// `namespace A.B { }` is a namespace named `A` with another TsNamespaceDeclaration as its body.
export type TsNamespaceBody = TsModuleBlock | TsNamespaceDeclaration;

export type TsModuleBlock = NodeBase & {
  type: "TSModuleBlock",
  body: $ReadOnlyArray<Statement>,
};

export type TsNamespaceDeclaration = TsModuleDeclaration & {
  id: Identifier,
  body: TsNamespaceBody,
};

export type TsModuleName = Identifier | StringLiteral;

export type TsImportEqualsDeclaration = NodeBase & {
  type: "TSImportEqualsDeclaration",
  isExport: boolean,
  id: Identifier,
  moduleReference: TsModuleReference,
};

export type TsModuleReference = TsEntityName | TsExternalModuleReference;

export type TsExternalModuleReference = NodeBase & {
  type: "TSExternalModuleReference",
  expression: StringLiteral,
};

// TypeScript's own parser uses ExportAssignment for both `export default` and `export =`.
// But for @babel/parser, `export default` is an ExportDefaultDeclaration,
// so a TsExportAssignment is always `export =`.
export type TsExportAssignment = NodeBase & {
  type: "TSExportAssignment",
  expression: Expression,
};

export type TsNamespaceExportDeclaration = NodeBase & {
  type: "TSNamespaceExportDeclaration",
  id: Identifier,
};

// ================
// TypeScript expressions
// ================

export type TsTypeAssertionLikeBase = NodeBase & {
  expression: Expression,
  typeAnnotation: TsType,
};

export type TsAsExpression = TsTypeAssertionLikeBase & {
  type: "TSAsExpression",
};

export type TsTypeAssertion = TsTypeAssertionLikeBase & {
  type: "TSTypeAssertion",
};

export type TsNonNullExpression = NodeBase & {
  type: "TSNonNullExpression",
  expression: Expression,
};

// ================
// Other
// ================

export type ParseSubscriptState = {
  optionalChainMember: boolean,
  stop: boolean,
};
