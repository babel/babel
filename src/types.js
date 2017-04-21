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
  type: "CommentBlock" | "CommentLine";
  value: string;
  start: number;
  end: number;
  loc: SourceLocation;
};

export interface NodeBase {
  start: number;
  end: number;
  loc: SourceLocation;
  range: [number, number];
  leadingComments?: ?Array<Comment>;
  trailingComments?: ?Array<Comment>;
  innerComments?: ?Array<Comment>;

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
  | FunctionDeclaration;
export type DeclarationBase = NodeBase;

// TODO: Not in spec
export type HasDecorators = NodeBase & {
  decorators?: $ReadOnlyArray<Decorator>;
};

export type Identifier = PatternBase & {
  type: "Identifier";
  name: string;

  __clone(): Identifier;
};

// Literals

export type Literal = RegExpLiteral | NullLiteral | StringLiteral | BooleanLiteral | NumericLiteral;

export type RegExpLiteral = NodeBase & {
  type: "RegExpLiteral";
  pattern: string;
  flags: RegExp$flags;
};

export type NullLiteral = NodeBase & {
  type: "NullLiteral";
}

export type StringLiteral = NodeBase & {
  type: "StringLiteral";
  value: string;
};

export type BooleanLiteral = NodeBase & {
  type: "BooleanLiteral";
  value: boolean;
};

export type NumericLiteral = NodeBase & {
  type: "NumericLiteral";
  value: number;
};

// Programs

export type BlockStatementLike = Program | BlockStatement;

export type File = NodeBase & {
  type: "File";
  program: Program;
  comments: $ReadOnlyArray<Comment>;
  tokens: $ReadOnlyArray<Token | Comment>;
};

export type Program = NodeBase & {
  type: "Program";
  sourceType: "script" | "module";
  body: Array<Statement | ModuleDeclaration>; // TODO: $ReadOnlyArray
  directives: $ReadOnlyArray<Directive>; // TODO: Not in spec
};

// Functions

export type Function =
  NormalFunction | ArrowFunctionExpression | ObjectMethod | ClassMethod;

export type NormalFunction =
  FunctionDeclaration | FunctionExpression;

export type FunctionBase =  HasDecorators & {
  id: ?Identifier;
  params: $ReadOnlyArray<Pattern>;
  body: BlockStatement;
  generator: boolean;
  async: boolean;

  expression: boolean; // TODO: Not in spec
  typeParameters?: ?FlowTypeParameterDeclaration; // TODO: Not in spec
  returnType?: ?FlowTypeAnnotation; // TODO: Not in spec
};

// Statements

export type ExpressionStatement = NodeBase & {
  type: "ExpressionStatement";
  expression: Expression;
};

export type BlockStatement = NodeBase & {
  type: "BlockStatement";
  body: Array<Statement>; // TODO: $ReadOnlyArray
  directives: $ReadOnlyArray<Directive>;
};

export type EmptyStatement = NodeBase & {
  type: "EmptyStatement"
};

export type DebuggerStatement = NodeBase & {
  type: "DebuggerStatement"
};

export type WithStatement = NodeBase & {
  type: "WithStatement";
  object: Expression;
  body: Statement;
};

export type ReturnStatement = NodeBase & {
  type: "ReturnStatement";
  argument: ?Expression;
};

export type LabeledStatement = NodeBase & {
  type: "LabeledStatement";
  label: Identifier;
  body: Statement;
};

export type BreakStatement = NodeBase & {
  type: "BreakStatement";
  label: ?Identifier;
};

export type ContinueStatement = NodeBase & {
  type: "ContinueStatement";
  label: ?Identifier;
};

// Choice

export type IfStatement = NodeBase & {
  type: "IfStatement";
  test: Expression;
  consequent: Statement;
  alternate: ?Statement;
};

export type SwitchStatement = NodeBase & {
  type: "SwitchStatement";
  discriminant: Expression;
  cases: $ReadOnlyArray<SwitchCase>;
};

export type SwitchCase = NodeBase & {
  type: "SwitchCase";
  test: ?Expression;
  consequent: $ReadOnlyArray<Statement>;
};

// Exceptions

export type ThrowStatement = NodeBase & {
  type: "ThrowStatement";
  argument: Expression;
};

export type TryStatement = NodeBase & {
  type: "TryStatement";
  block: BlockStatement;
  handler: CatchClause | null;
  finalizer: BlockStatement | null;

  guardedHandlers: $ReadOnlyArray<empty>; // TODO: Not in spec
};

export type CatchClause = NodeBase & {
  type: "CatchClause";
  param: Pattern;
  body: BlockStatement;
};

// Loops

export type WhileStatement = NodeBase & {
  type: "WhileStatement";
  test: Expression;
  body: Statement;
};

export type DoWhileStatement = NodeBase & {
  type: "DoWhileStatement";
  body: Statement;
  test: Expression;
};

export type ForLike = ForStatement | ForInOf;

export type ForStatement = NodeBase & {
  type: "ForStatement";
  init: ?(VariableDeclaration | Expression);
  test: ?Expression;
  update: ?Expression;
  body: Statement;
};

export type ForInOf = ForInStatement | ForOfStatement;

export type ForInOfBase = NodeBase & {
  type: "ForInStatement";
  left: VariableDeclaration | Expression;
  right: Expression;
  body: Statement;
};

export type ForInStatement = ForInOfBase & {
  type: "ForInStatement";
  // TODO: Shouldn't be here, but have to declare it because it's assigned to a ForInOf unconditionally.
  await: boolean;
};

export type ForOfStatement = ForInOfBase & {
  type: "ForOfStatement";
  await: boolean;
};

// Declarations

export type FunctionDeclaration = FunctionBase & DeclarationBase & HasDecorators & {
  type: "FunctionDeclaration";
  id: Identifier;
};

export type VariableDeclaration = DeclarationBase & HasDecorators & {
  type: "VariableDeclaration";
  declarations: $ReadOnlyArray<VariableDeclarator>;
  kind: "var" | "let" | "const";
};

export type VariableDeclarator = NodeBase & {
  type: "VariableDeclarator";
  id: Pattern;
  init: ?Expression;
};

// Misc

export type Decorator = NodeBase & {
  type: "Decorator";
  expression: Expression;
};

export type Directive = NodeBase & {
  type: "Directive";
  value: DirectiveLiteral;
};

export type DirectiveLiteral = StringLiteral & { type: "DirectiveLiteral" };

// Expressions

export type Super = NodeBase & { type: "Super" };

export type Import = NodeBase & { type: "Import" };

export type ThisExpression = NodeBase & { type: "ThisExpression" };

export type ArrowFunctionExpression = FunctionBase & {
  type: "ArrowFunctionExpression";
  body: BlockStatement | Expression;
};

export type YieldExpression = NodeBase & {
  type: "YieldExpression";
  argument: ?Expression;
  delegate: boolean;
};

export type AwaitExpression = NodeBase & {
  type: "AwaitExpression";
  argument: ?Expression;
};

export type ArrayExpression = NodeBase & {
  type: "ArrayExpression";
  elements: $ReadOnlyArray<?(Expression | SpreadElement)>;
};

export type ObjectExpression = NodeBase & {
  type: "ObjectExpression";
  properties: $ReadOnlyArray<ObjectProperty | ObjectMethod | SpreadElement>;
};

export type ObjectOrClassMember = ClassMethod | ClassProperty | ObjectMember;

export type ObjectMember = ObjectProperty | ObjectMethod;

export type ObjectMemberBase = NodeBase & {
  key: Expression;
  computed: boolean;
  value: Expression;
  decorators: $ReadOnlyArray<Decorator>;
  kind?: "get" | "set" | "method";
  method: boolean; // TODO: Not in spec

  variance?: ?FlowVariance; // TODO: Not in spec
};

export type ObjectProperty = ObjectMemberBase & {
  type: "ObjectProperty";
  shorthand: boolean;
};

export type ObjectMethod = ObjectMemberBase & MethodBase &  {
  type: "ObjectMethod";
  kind: "get" | "set" | "method"; // Never "constructor"
};

export type FunctionExpression = MethodBase & {
  kind?: void; // never set
  type: "FunctionExpression";
};

// Unary operations

export type UnaryExpression = NodeBase & {
  type: "UnaryExpression";
  operator: UnaryOperator;
  prefix: boolean;
  argument: Expression;
};

export type UnaryOperator = "-" | "+" | "!" | "~" | "typeof" | "void" | "delete";

export type UpdateExpression = NodeBase & {
  type: "UpdateExpression";
  operator: UpdateOperator;
  argument: Expression;
  prefix: boolean;
};

export type UpdateOperator = "++" | "--";

// Binary operations

export type BinaryExpression = NodeBase & {
  type: "BinaryExpression";
  operator: BinaryOperator;
  left: Expression;
  right: Expression;
};

export type BinaryOperator =
  | "==" | "!=" | "===" | "!=="
  | "<" | "<=" | ">" | ">="
  | "<<" | ">>" | ">>>"
  | "+" | "-" | "*" | "/" | "%"
  | "|" | "^" | "&" | "in"
  | "instanceof";

export type AssignmentExpression = NodeBase & {
  type: "AssignmentExpression";
  operator: AssignmentOperator;
  left: Pattern | Expression;
  right: Expression;
};

export type AssignmentOperator =
  | "=" | "+=" | "-=" | "*=" | "/=" | "%="
  | "<<=" | ">>=" | ">>>="
  | "|=" | "^=" | "&=";

export type LogicalExpression = NodeBase & {
  type: "LogicalExpression";
  operator: LogicalOperator;
  left: Expression;
  right: Expression;
};

export type LogicalOperator = "||" | "&&";

export type SpreadElement = NodeBase & {
  type: "SpreadElement";
  argument: Expression;
};

export type MemberExpression = NodeBase & {
  type: "MemberExpression";
  object: Expression | Super;
  property: Expression;
  computed: boolean;
}

export type BindExpression = NodeBase & {
  type: "BindExpression";
  object: $ReadOnlyArray<?Expression>;
  callee: $ReadOnlyArray<Expression>;
};

export type ConditionalExpression = NodeBase & {
  type: "ConditionalExpression";
  test: Expression;
  alternate: Expression;
  consequent: Expression;
};

export type CallOrNewBase = NodeBase & {
  callee: Expression | Super | Import;
  arguments: Array<Expression | SpreadElement>; // TODO: $ReadOnlyArray
};

export type CallExpression = CallOrNewBase & {
  type: "CallExpression";
};

export type NewExpression = CallOrNewBase & {
  type: "NewExpression";
};

export type SequenceExpression = NodeBase & {
  type: "SequenceExpression";
  expressions: $ReadOnlyArray<Expression>;
};

// Template Literals

export type TemplateLiteral = NodeBase & {
  type: "TemplateLiteral";
  quasis: $ReadOnlyArray<TemplateElement>;
  expressions: $ReadOnlyArray<Expression>;
};

export type TaggedTmplateExpression = NodeBase & {
  type: "TaggedTemplateExpression";
  tag: Expression;
  quasi: TemplateLiteral;
};

export type TemplateElement = NodeBase & {
  type: "TemplateElement";
  tail: boolean;
  value: {
    cooked: string;
    raw: string;
  }
};

// Patterns

export type PatternBase = HasDecorators & {
  // Flow only:
  typeAnnotation?: ?FlowTypeAnnotation;
};

export type AssignmentProperty = ObjectProperty & {
  value: Pattern;
};

export type ObjectPattern = PatternBase & {
  type: "ObjectPattern";
  properties: $ReadOnlyArray<AssignmentProperty | RestElement>;
};

export type ArrayPattern = PatternBase & {
  type: "ArrayPattern";
  elements: $ReadOnlyArray<?Pattern>;
};

export type RestElement = PatternBase & {
  type: "RestElement";
  argument: Pattern;
};

export type AssignmentPattern = PatternBase & {
  type: "AssignmentPattern";
  left: Pattern;
  right: Expression;
};

// Classes

export type Class = ClassDeclaration | ClassExpression;

export type ClassBase = HasDecorators & {
  id: ?Identifier;
  superClass: ?Expression;
  body: ClassBody;
  decorators: $ReadOnlyArray<Decorator>;

  typeParameters?: ?FlowTypeParameterDeclaration; // TODO: Not in spec
  superTypeParameters?: ?FlowTypeParameterInstantiation; // TODO: Not in spec
  implements?: $ReadOnlyArray<FlowClassImplements>;
};

export type ClassBody = NodeBase & {
  type: "ClassBody";
  body: Array<ClassMember>; // TODO: $ReadOnlyArray
};

export type ClassMemberBase = NodeBase & HasDecorators & {
  static: boolean;
  computed: boolean;
  // TypeScript only:
  access?: ?Accessibility;
  abstract?: ?true;
  optional?: ?true;
}

export type Accessibility = "public" | "protected" | "private";

export type ClassMember = ClassMethod | ClassProperty;

export type MethodLike = ObjectMethod | FunctionExpression | ClassMethod;

export type MethodBase = FunctionBase & {
  +kind?: MethodKind;
};

export type MethodKind = "constructor" | "method" | "get" | "set";

export type ClassMethod = MethodBase & ClassMemberBase & {
  type: "ClassMethod";
  key: Expression;
  kind: MethodKind;
  static: boolean;
  decorators: $ReadOnlyArray<Decorator>;

  variance?: ?FlowVariance; // TODO: Not in spec
};

export type ClassProperty = ClassMemberBase & {
  type: "ClassProperty";
  key: Identifier;
  value: ?Expression; // TODO: Not in spec that this is nullable.

  typeAnnotation?: ?FlowTypeAnnotation; // TODO: Not in spec
  variance?: ?FlowVariance; // TODO: Not in spec

  // TypeScript only: (TODO: Not in spec)
  readonly?: true;
};

export type ClassDeclaration = ClassBase & DeclarationBase & HasDecorators & {
  type: "ClassDeclaration";
  id: Identifier;
  // TypeScript only
  abstract?: ?true;
};

export type ClassExpression = ClassBase & { type: "ClassExpression" };

export type MetaProperty = NodeBase & {
  type: "MetaProperty";
  meta: Identifier;
  property: Identifier;
};

// Modules

export type ModuleDeclaration = AnyImport | AnyExport;

export type AnyImport = ImportDeclaration;

export type AnyExport =
  | ExportNamedDeclaration
  | ExportDefaultDeclaration
  | ExportAllDeclaration;

export type ModuleSpecifier = NodeBase & {
  local: Identifier;
};

// Imports

export type ImportDeclaration = NodeBase & {
  type: "ImportDeclaration";
  // TODO: $ReadOnlyArray
  specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>;
  source: Literal;

  importKind?: "type" | "typeof" | "value"; // TODO: Not in spec
};

export type ImportSpecifier = ModuleSpecifier & {
  type: "ImportSpecifier";
  imported: Identifier;
};

export type ImportDefaultSpecifier = ModuleSpecifier & {
  type: "ImportDefaultSpecifier"
};

export type ImportNamespaceSpecifier = ModuleSpecifier & {
  type: "ImportNamespaceSpecifier"
};

// Exports

export type ExportNamedDeclaration = NodeBase & {
  type: "ExportNamedDeclaration";
  declaration: ?Declaration;
  specifiers: Array<ExportSpecifier>; // TODO: $ReadOnlyArray
  source: ?Literal;

  exportKind?: "type" | "value"; // TODO: Not in spec
};

export type ExportSpecifier = NodeBase & {
  type: "ExportSpecifier";
  exported: Identifier;
};

export type ExportDefaultDeclaration = NodeBase & {
  type: "ExportDefaultDeclaration";
  declaration: Declaration | Expression;
};

export type ExportAllDeclaration = NodeBase & {
  type: "ExportAllDeclaration";
  source: Literal;
};

// JSX (TODO: Not in spec)

export type JSXIdentifier = Node;
export type JSXNamespacedName = Node;
export type JSXMemberExpression = Node;
export type JSXEmptyExpression = Node;
export type JSXSpreadChild = Node;
export type JSXExpressionContainer = Node;
export type JSXAttribute = Node;
export type JSXOpeningElement = Node;
export type JSXClosingElement = Node;
export type JSXElement = Node;

// Flow (TODO: Not in spec)

export type FlowType = Node;
export type FlowPredicate = Node;
export type FlowDeclare = Node;
export type FlowDeclareClass = Node;
export type FlowDeclareFunction = Node;
export type FlowDeclareVariable = Node;
export type FlowDeclareModule = Node;
export type FlowDeclareModuleExports = Node;
export type FlowDeclareTypeAlias = Node;
export type FlowDeclareInterface = Node;
export type FlowInterface = Node;
export type FlowInterfaceExtends = Node;
export type FlowTypeAlias = Node;
export type FlowTypeParameter = Node;
export type FlowTypeParameterDeclaration = Node;
export type FlowTypeParameterInstantiation = Node;
export type FlowObjectTypeIndexer = Node;
export type FlowFunctionTypeAnnotation = Node;
export type FlowObjectTypeProperty = Node;
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
