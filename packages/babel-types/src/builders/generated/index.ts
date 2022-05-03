/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import validateNode from "../validateNode";
import type * as t from "../..";
export function arrayExpression(
  elements: Array<null | t.Expression | t.SpreadElement> = [],
) {
  const node: t.ArrayExpression = {
    type: "ArrayExpression",
    elements,
  };
  validateNode(node);
  return node;
}
export function assignmentExpression(
  operator: string,
  left: t.LVal,
  right: t.Expression,
) {
  const node: t.AssignmentExpression = {
    type: "AssignmentExpression",
    operator,
    left,
    right,
  };
  validateNode(node);
  return node;
}
export function binaryExpression(
  operator:
    | "+"
    | "-"
    | "/"
    | "%"
    | "*"
    | "**"
    | "&"
    | "|"
    | ">>"
    | ">>>"
    | "<<"
    | "^"
    | "=="
    | "==="
    | "!="
    | "!=="
    | "in"
    | "instanceof"
    | ">"
    | "<"
    | ">="
    | "<="
    | "|>",
  left: t.Expression | t.PrivateName,
  right: t.Expression,
) {
  const node: t.BinaryExpression = {
    type: "BinaryExpression",
    operator,
    left,
    right,
  };
  validateNode(node);
  return node;
}
export function interpreterDirective(value: string) {
  const node: t.InterpreterDirective = {
    type: "InterpreterDirective",
    value,
  };
  validateNode(node);
  return node;
}
export function directive(value: t.DirectiveLiteral) {
  const node: t.Directive = {
    type: "Directive",
    value,
  };
  validateNode(node);
  return node;
}
export function directiveLiteral(value: string) {
  const node: t.DirectiveLiteral = {
    type: "DirectiveLiteral",
    value,
  };
  validateNode(node);
  return node;
}
export function blockStatement(
  body: Array<t.Statement>,
  directives: Array<t.Directive> = [],
) {
  const node: t.BlockStatement = {
    type: "BlockStatement",
    body,
    directives,
  };
  validateNode(node);
  return node;
}
export function breakStatement(label: t.Identifier | null = null) {
  const node: t.BreakStatement = {
    type: "BreakStatement",
    label,
  };
  validateNode(node);
  return node;
}
export function callExpression(
  callee: t.Expression | t.V8IntrinsicIdentifier,
  _arguments: Array<
    t.Expression | t.SpreadElement | t.JSXNamespacedName | t.ArgumentPlaceholder
  >,
) {
  const node: t.CallExpression = {
    type: "CallExpression",
    callee,
    arguments: _arguments,
  };
  validateNode(node);
  return node;
}
export function catchClause(
  param:
    | t.Identifier
    | t.ArrayPattern
    | t.ObjectPattern
    | null
    | undefined = null,
  body: t.BlockStatement,
) {
  const node: t.CatchClause = {
    type: "CatchClause",
    param,
    body,
  };
  validateNode(node);
  return node;
}
export function conditionalExpression(
  test: t.Expression,
  consequent: t.Expression,
  alternate: t.Expression,
) {
  const node: t.ConditionalExpression = {
    type: "ConditionalExpression",
    test,
    consequent,
    alternate,
  };
  validateNode(node);
  return node;
}
export function continueStatement(label: t.Identifier | null = null) {
  const node: t.ContinueStatement = {
    type: "ContinueStatement",
    label,
  };
  validateNode(node);
  return node;
}
export function debuggerStatement() {
  const node: t.DebuggerStatement = {
    type: "DebuggerStatement",
  };
  validateNode(node);
  return node;
}
export function doWhileStatement(test: t.Expression, body: t.Statement) {
  const node: t.DoWhileStatement = {
    type: "DoWhileStatement",
    test,
    body,
  };
  validateNode(node);
  return node;
}
export function emptyStatement() {
  const node: t.EmptyStatement = {
    type: "EmptyStatement",
  };
  validateNode(node);
  return node;
}
export function expressionStatement(expression: t.Expression) {
  const node: t.ExpressionStatement = {
    type: "ExpressionStatement",
    expression,
  };
  validateNode(node);
  return node;
}
export function file(
  program: t.Program,
  comments: Array<t.CommentBlock | t.CommentLine> | null = null,
  tokens: Array<any> | null = null,
) {
  const node: t.File = {
    type: "File",
    program,
    comments,
    tokens,
  };
  validateNode(node);
  return node;
}
export function forInStatement(
  left: t.VariableDeclaration | t.LVal,
  right: t.Expression,
  body: t.Statement,
) {
  const node: t.ForInStatement = {
    type: "ForInStatement",
    left,
    right,
    body,
  };
  validateNode(node);
  return node;
}
export function forStatement(
  init: t.VariableDeclaration | t.Expression | null | undefined = null,
  test: t.Expression | null | undefined = null,
  update: t.Expression | null | undefined = null,
  body: t.Statement,
) {
  const node: t.ForStatement = {
    type: "ForStatement",
    init,
    test,
    update,
    body,
  };
  validateNode(node);
  return node;
}
export function functionDeclaration(
  id: t.Identifier | null | undefined = null,
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  body: t.BlockStatement,
  generator: boolean = false,
  async: boolean = false,
) {
  const node: t.FunctionDeclaration = {
    type: "FunctionDeclaration",
    id,
    params,
    body,
    generator,
    async,
  };
  validateNode(node);
  return node;
}
export function functionExpression(
  id: t.Identifier | null | undefined = null,
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  body: t.BlockStatement,
  generator: boolean = false,
  async: boolean = false,
) {
  const node: t.FunctionExpression = {
    type: "FunctionExpression",
    id,
    params,
    body,
    generator,
    async,
  };
  validateNode(node);
  return node;
}
export function identifier(name: string) {
  const node: t.Identifier = {
    type: "Identifier",
    name,
  };
  validateNode(node);
  return node;
}
export function ifStatement(
  test: t.Expression,
  consequent: t.Statement,
  alternate: t.Statement | null = null,
) {
  const node: t.IfStatement = {
    type: "IfStatement",
    test,
    consequent,
    alternate,
  };
  validateNode(node);
  return node;
}
export function labeledStatement(label: t.Identifier, body: t.Statement) {
  const node: t.LabeledStatement = {
    type: "LabeledStatement",
    label,
    body,
  };
  validateNode(node);
  return node;
}
export function stringLiteral(value: string) {
  const node: t.StringLiteral = {
    type: "StringLiteral",
    value,
  };
  validateNode(node);
  return node;
}
export function numericLiteral(value: number) {
  const node: t.NumericLiteral = {
    type: "NumericLiteral",
    value,
  };
  validateNode(node);
  return node;
}
export function nullLiteral() {
  const node: t.NullLiteral = {
    type: "NullLiteral",
  };
  validateNode(node);
  return node;
}
export function booleanLiteral(value: boolean) {
  const node: t.BooleanLiteral = {
    type: "BooleanLiteral",
    value,
  };
  validateNode(node);
  return node;
}
export function regExpLiteral(pattern: string, flags: string = "") {
  const node: t.RegExpLiteral = {
    type: "RegExpLiteral",
    pattern,
    flags,
  };
  validateNode(node);
  return node;
}
export function logicalExpression(
  operator: "||" | "&&" | "??",
  left: t.Expression,
  right: t.Expression,
) {
  const node: t.LogicalExpression = {
    type: "LogicalExpression",
    operator,
    left,
    right,
  };
  validateNode(node);
  return node;
}
export function memberExpression(
  object: t.Expression,
  property: t.Expression | t.Identifier | t.PrivateName,
  computed: boolean = false,
  optional: true | false | null = null,
) {
  const node: t.MemberExpression = {
    type: "MemberExpression",
    object,
    property,
    computed,
    optional,
  };
  validateNode(node);
  return node;
}
export function newExpression(
  callee: t.Expression | t.V8IntrinsicIdentifier,
  _arguments: Array<
    t.Expression | t.SpreadElement | t.JSXNamespacedName | t.ArgumentPlaceholder
  >,
) {
  const node: t.NewExpression = {
    type: "NewExpression",
    callee,
    arguments: _arguments,
  };
  validateNode(node);
  return node;
}
export function program(
  body: Array<t.Statement>,
  directives: Array<t.Directive> = [],
  sourceType: "script" | "module" = "script",
  interpreter: t.InterpreterDirective | null = null,
) {
  const node: t.Program = {
    type: "Program",
    body,
    directives,
    sourceType,
    interpreter,
    sourceFile: null,
  };
  validateNode(node);
  return node;
}
export function objectExpression(
  properties: Array<t.ObjectMethod | t.ObjectProperty | t.SpreadElement>,
) {
  const node: t.ObjectExpression = {
    type: "ObjectExpression",
    properties,
  };
  validateNode(node);
  return node;
}
export function objectMethod(
  kind: "method" | "get" | "set" | undefined = "method",
  key: t.Expression | t.Identifier | t.StringLiteral | t.NumericLiteral,
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  body: t.BlockStatement,
  computed: boolean = false,
  generator: boolean = false,
  async: boolean = false,
) {
  const node: t.ObjectMethod = {
    type: "ObjectMethod",
    kind,
    key,
    params,
    body,
    computed,
    generator,
    async,
  };
  validateNode(node);
  return node;
}
export function objectProperty(
  key: t.Expression | t.Identifier | t.StringLiteral | t.NumericLiteral,
  value: t.Expression | t.PatternLike,
  computed: boolean = false,
  shorthand: boolean = false,
  decorators: Array<t.Decorator> | null = null,
) {
  const node: t.ObjectProperty = {
    type: "ObjectProperty",
    key,
    value,
    computed,
    shorthand,
    decorators,
  };
  validateNode(node);
  return node;
}
export function restElement(argument: t.LVal) {
  const node: t.RestElement = {
    type: "RestElement",
    argument,
  };
  validateNode(node);
  return node;
}
export function returnStatement(argument: t.Expression | null = null) {
  const node: t.ReturnStatement = {
    type: "ReturnStatement",
    argument,
  };
  validateNode(node);
  return node;
}
export function sequenceExpression(expressions: Array<t.Expression>) {
  const node: t.SequenceExpression = {
    type: "SequenceExpression",
    expressions,
  };
  validateNode(node);
  return node;
}
export function parenthesizedExpression(expression: t.Expression) {
  const node: t.ParenthesizedExpression = {
    type: "ParenthesizedExpression",
    expression,
  };
  validateNode(node);
  return node;
}
export function switchCase(
  test: t.Expression | null | undefined = null,
  consequent: Array<t.Statement>,
) {
  const node: t.SwitchCase = {
    type: "SwitchCase",
    test,
    consequent,
  };
  validateNode(node);
  return node;
}
export function switchStatement(
  discriminant: t.Expression,
  cases: Array<t.SwitchCase>,
) {
  const node: t.SwitchStatement = {
    type: "SwitchStatement",
    discriminant,
    cases,
  };
  validateNode(node);
  return node;
}
export function thisExpression() {
  const node: t.ThisExpression = {
    type: "ThisExpression",
  };
  validateNode(node);
  return node;
}
export function throwStatement(argument: t.Expression) {
  const node: t.ThrowStatement = {
    type: "ThrowStatement",
    argument,
  };
  validateNode(node);
  return node;
}
export function tryStatement(
  block: t.BlockStatement,
  handler: t.CatchClause | null = null,
  finalizer: t.BlockStatement | null = null,
) {
  const node: t.TryStatement = {
    type: "TryStatement",
    block,
    handler,
    finalizer,
  };
  validateNode(node);
  return node;
}
export function unaryExpression(
  operator: "void" | "throw" | "delete" | "!" | "+" | "-" | "~" | "typeof",
  argument: t.Expression,
  prefix: boolean = true,
) {
  const node: t.UnaryExpression = {
    type: "UnaryExpression",
    operator,
    argument,
    prefix,
  };
  validateNode(node);
  return node;
}
export function updateExpression(
  operator: "++" | "--",
  argument: t.Expression,
  prefix: boolean = false,
) {
  const node: t.UpdateExpression = {
    type: "UpdateExpression",
    operator,
    argument,
    prefix,
  };
  validateNode(node);
  return node;
}
export function variableDeclaration(
  kind: "var" | "let" | "const",
  declarations: Array<t.VariableDeclarator>,
) {
  const node: t.VariableDeclaration = {
    type: "VariableDeclaration",
    kind,
    declarations,
  };
  validateNode(node);
  return node;
}
export function variableDeclarator(
  id: t.LVal,
  init: t.Expression | null = null,
) {
  const node: t.VariableDeclarator = {
    type: "VariableDeclarator",
    id,
    init,
  };
  validateNode(node);
  return node;
}
export function whileStatement(test: t.Expression, body: t.Statement) {
  const node: t.WhileStatement = {
    type: "WhileStatement",
    test,
    body,
  };
  validateNode(node);
  return node;
}
export function withStatement(object: t.Expression, body: t.Statement) {
  const node: t.WithStatement = {
    type: "WithStatement",
    object,
    body,
  };
  validateNode(node);
  return node;
}
export function assignmentPattern(
  left:
    | t.Identifier
    | t.ObjectPattern
    | t.ArrayPattern
    | t.MemberExpression
    | t.TSAsExpression
    | t.TSTypeAssertion
    | t.TSNonNullExpression,
  right: t.Expression,
) {
  const node: t.AssignmentPattern = {
    type: "AssignmentPattern",
    left,
    right,
  };
  validateNode(node);
  return node;
}
export function arrayPattern(elements: Array<null | t.PatternLike>) {
  const node: t.ArrayPattern = {
    type: "ArrayPattern",
    elements,
  };
  validateNode(node);
  return node;
}
export function arrowFunctionExpression(
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  body: t.BlockStatement | t.Expression,
  async: boolean = false,
) {
  const node: t.ArrowFunctionExpression = {
    type: "ArrowFunctionExpression",
    params,
    body,
    async,
    expression: null,
  };
  validateNode(node);
  return node;
}
export function classBody(
  body: Array<
    | t.ClassMethod
    | t.ClassPrivateMethod
    | t.ClassProperty
    | t.ClassPrivateProperty
    | t.ClassAccessorProperty
    | t.TSDeclareMethod
    | t.TSIndexSignature
    | t.StaticBlock
  >,
) {
  const node: t.ClassBody = {
    type: "ClassBody",
    body,
  };
  validateNode(node);
  return node;
}
export function classExpression(
  id: t.Identifier | null | undefined = null,
  superClass: t.Expression | null | undefined = null,
  body: t.ClassBody,
  decorators: Array<t.Decorator> | null = null,
) {
  const node: t.ClassExpression = {
    type: "ClassExpression",
    id,
    superClass,
    body,
    decorators,
  };
  validateNode(node);
  return node;
}
export function classDeclaration(
  id: t.Identifier,
  superClass: t.Expression | null | undefined = null,
  body: t.ClassBody,
  decorators: Array<t.Decorator> | null = null,
) {
  const node: t.ClassDeclaration = {
    type: "ClassDeclaration",
    id,
    superClass,
    body,
    decorators,
  };
  validateNode(node);
  return node;
}
export function exportAllDeclaration(source: t.StringLiteral) {
  const node: t.ExportAllDeclaration = {
    type: "ExportAllDeclaration",
    source,
  };
  validateNode(node);
  return node;
}
export function exportDefaultDeclaration(
  declaration:
    | t.FunctionDeclaration
    | t.TSDeclareFunction
    | t.ClassDeclaration
    | t.Expression,
) {
  const node: t.ExportDefaultDeclaration = {
    type: "ExportDefaultDeclaration",
    declaration,
  };
  validateNode(node);
  return node;
}
export function exportNamedDeclaration(
  declaration: t.Declaration | null = null,
  specifiers: Array<
    t.ExportSpecifier | t.ExportDefaultSpecifier | t.ExportNamespaceSpecifier
  > = [],
  source: t.StringLiteral | null = null,
) {
  const node: t.ExportNamedDeclaration = {
    type: "ExportNamedDeclaration",
    declaration,
    specifiers,
    source,
  };
  validateNode(node);
  return node;
}
export function exportSpecifier(
  local: t.Identifier,
  exported: t.Identifier | t.StringLiteral,
) {
  const node: t.ExportSpecifier = {
    type: "ExportSpecifier",
    local,
    exported,
  };
  validateNode(node);
  return node;
}
export function forOfStatement(
  left: t.VariableDeclaration | t.LVal,
  right: t.Expression,
  body: t.Statement,
  _await: boolean = false,
) {
  const node: t.ForOfStatement = {
    type: "ForOfStatement",
    left,
    right,
    body,
    await: _await,
  };
  validateNode(node);
  return node;
}
export function importDeclaration(
  specifiers: Array<
    t.ImportSpecifier | t.ImportDefaultSpecifier | t.ImportNamespaceSpecifier
  >,
  source: t.StringLiteral,
) {
  const node: t.ImportDeclaration = {
    type: "ImportDeclaration",
    specifiers,
    source,
  };
  validateNode(node);
  return node;
}
export function importDefaultSpecifier(local: t.Identifier) {
  const node: t.ImportDefaultSpecifier = {
    type: "ImportDefaultSpecifier",
    local,
  };
  validateNode(node);
  return node;
}
export function importNamespaceSpecifier(local: t.Identifier) {
  const node: t.ImportNamespaceSpecifier = {
    type: "ImportNamespaceSpecifier",
    local,
  };
  validateNode(node);
  return node;
}
export function importSpecifier(
  local: t.Identifier,
  imported: t.Identifier | t.StringLiteral,
) {
  const node: t.ImportSpecifier = {
    type: "ImportSpecifier",
    local,
    imported,
  };
  validateNode(node);
  return node;
}
export function metaProperty(meta: t.Identifier, property: t.Identifier) {
  const node: t.MetaProperty = {
    type: "MetaProperty",
    meta,
    property,
  };
  validateNode(node);
  return node;
}
export function classMethod(
  kind: "get" | "set" | "method" | "constructor" | undefined = "method",
  key: t.Identifier | t.StringLiteral | t.NumericLiteral | t.Expression,
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  body: t.BlockStatement,
  computed: boolean = false,
  _static: boolean = false,
  generator: boolean = false,
  async: boolean = false,
) {
  const node: t.ClassMethod = {
    type: "ClassMethod",
    kind,
    key,
    params,
    body,
    computed,
    static: _static,
    generator,
    async,
  };
  validateNode(node);
  return node;
}
export function objectPattern(
  properties: Array<t.RestElement | t.ObjectProperty>,
) {
  const node: t.ObjectPattern = {
    type: "ObjectPattern",
    properties,
  };
  validateNode(node);
  return node;
}
export function spreadElement(argument: t.Expression) {
  const node: t.SpreadElement = {
    type: "SpreadElement",
    argument,
  };
  validateNode(node);
  return node;
}
function _super() {
  const node: t.Super = {
    type: "Super",
  };
  validateNode(node);
  return node;
}
export { _super as super };
export function taggedTemplateExpression(
  tag: t.Expression,
  quasi: t.TemplateLiteral,
) {
  const node: t.TaggedTemplateExpression = {
    type: "TaggedTemplateExpression",
    tag,
    quasi,
  };
  validateNode(node);
  return node;
}
export function templateElement(
  value: { raw: string; cooked?: string },
  tail: boolean = false,
) {
  const node: t.TemplateElement = {
    type: "TemplateElement",
    value,
    tail,
  };
  validateNode(node);
  return node;
}
export function templateLiteral(
  quasis: Array<t.TemplateElement>,
  expressions: Array<t.Expression | t.TSType>,
) {
  const node: t.TemplateLiteral = {
    type: "TemplateLiteral",
    quasis,
    expressions,
  };
  validateNode(node);
  return node;
}
export function yieldExpression(
  argument: t.Expression | null = null,
  delegate: boolean = false,
) {
  const node: t.YieldExpression = {
    type: "YieldExpression",
    argument,
    delegate,
  };
  validateNode(node);
  return node;
}
export function awaitExpression(argument: t.Expression) {
  const node: t.AwaitExpression = {
    type: "AwaitExpression",
    argument,
  };
  validateNode(node);
  return node;
}
function _import() {
  const node: t.Import = {
    type: "Import",
  };
  validateNode(node);
  return node;
}
export { _import as import };
export function bigIntLiteral(value: string) {
  const node: t.BigIntLiteral = {
    type: "BigIntLiteral",
    value,
  };
  validateNode(node);
  return node;
}
export function exportNamespaceSpecifier(exported: t.Identifier) {
  const node: t.ExportNamespaceSpecifier = {
    type: "ExportNamespaceSpecifier",
    exported,
  };
  validateNode(node);
  return node;
}
export function optionalMemberExpression(
  object: t.Expression,
  property: t.Expression | t.Identifier,
  computed: boolean | undefined = false,
  optional: boolean,
) {
  const node: t.OptionalMemberExpression = {
    type: "OptionalMemberExpression",
    object,
    property,
    computed,
    optional,
  };
  validateNode(node);
  return node;
}
export function optionalCallExpression(
  callee: t.Expression,
  _arguments: Array<
    t.Expression | t.SpreadElement | t.JSXNamespacedName | t.ArgumentPlaceholder
  >,
  optional: boolean,
) {
  const node: t.OptionalCallExpression = {
    type: "OptionalCallExpression",
    callee,
    arguments: _arguments,
    optional,
  };
  validateNode(node);
  return node;
}
export function classProperty(
  key: t.Identifier | t.StringLiteral | t.NumericLiteral | t.Expression,
  value: t.Expression | null = null,
  typeAnnotation: t.TypeAnnotation | t.TSTypeAnnotation | t.Noop | null = null,
  decorators: Array<t.Decorator> | null = null,
  computed: boolean = false,
  _static: boolean = false,
) {
  const node: t.ClassProperty = {
    type: "ClassProperty",
    key,
    value,
    typeAnnotation,
    decorators,
    computed,
    static: _static,
  };
  validateNode(node);
  return node;
}
export function classAccessorProperty(
  key:
    | t.Identifier
    | t.StringLiteral
    | t.NumericLiteral
    | t.Expression
    | t.PrivateName,
  value: t.Expression | null = null,
  typeAnnotation: t.TypeAnnotation | t.TSTypeAnnotation | t.Noop | null = null,
  decorators: Array<t.Decorator> | null = null,
  computed: boolean = false,
  _static: boolean = false,
) {
  const node: t.ClassAccessorProperty = {
    type: "ClassAccessorProperty",
    key,
    value,
    typeAnnotation,
    decorators,
    computed,
    static: _static,
  };
  validateNode(node);
  return node;
}
export function classPrivateProperty(
  key: t.PrivateName,
  value: t.Expression | null | undefined = null,
  decorators: Array<t.Decorator> | null | undefined = null,
  _static: any,
) {
  const node: t.ClassPrivateProperty = {
    type: "ClassPrivateProperty",
    key,
    value,
    decorators,
    static: _static,
  };
  validateNode(node);
  return node;
}
export function classPrivateMethod(
  kind: "get" | "set" | "method" | "constructor" | undefined = "method",
  key: t.PrivateName,
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  body: t.BlockStatement,
  _static: boolean = false,
) {
  const node: t.ClassPrivateMethod = {
    type: "ClassPrivateMethod",
    kind,
    key,
    params,
    body,
    static: _static,
  };
  validateNode(node);
  return node;
}
export function privateName(id: t.Identifier) {
  const node: t.PrivateName = {
    type: "PrivateName",
    id,
  };
  validateNode(node);
  return node;
}
export function staticBlock(body: Array<t.Statement>) {
  const node: t.StaticBlock = {
    type: "StaticBlock",
    body,
  };
  validateNode(node);
  return node;
}
export function anyTypeAnnotation() {
  const node: t.AnyTypeAnnotation = {
    type: "AnyTypeAnnotation",
  };
  validateNode(node);
  return node;
}
export function arrayTypeAnnotation(elementType: t.FlowType) {
  const node: t.ArrayTypeAnnotation = {
    type: "ArrayTypeAnnotation",
    elementType,
  };
  validateNode(node);
  return node;
}
export function booleanTypeAnnotation() {
  const node: t.BooleanTypeAnnotation = {
    type: "BooleanTypeAnnotation",
  };
  validateNode(node);
  return node;
}
export function booleanLiteralTypeAnnotation(value: boolean) {
  const node: t.BooleanLiteralTypeAnnotation = {
    type: "BooleanLiteralTypeAnnotation",
    value,
  };
  validateNode(node);
  return node;
}
export function nullLiteralTypeAnnotation() {
  const node: t.NullLiteralTypeAnnotation = {
    type: "NullLiteralTypeAnnotation",
  };
  validateNode(node);
  return node;
}
export function classImplements(
  id: t.Identifier,
  typeParameters: t.TypeParameterInstantiation | null = null,
) {
  const node: t.ClassImplements = {
    type: "ClassImplements",
    id,
    typeParameters,
  };
  validateNode(node);
  return node;
}
export function declareClass(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  _extends: Array<t.InterfaceExtends> | null | undefined = null,
  body: t.ObjectTypeAnnotation,
) {
  const node: t.DeclareClass = {
    type: "DeclareClass",
    id,
    typeParameters,
    extends: _extends,
    body,
  };
  validateNode(node);
  return node;
}
export function declareFunction(id: t.Identifier) {
  const node: t.DeclareFunction = {
    type: "DeclareFunction",
    id,
  };
  validateNode(node);
  return node;
}
export function declareInterface(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  _extends: Array<t.InterfaceExtends> | null | undefined = null,
  body: t.ObjectTypeAnnotation,
) {
  const node: t.DeclareInterface = {
    type: "DeclareInterface",
    id,
    typeParameters,
    extends: _extends,
    body,
  };
  validateNode(node);
  return node;
}
export function declareModule(
  id: t.Identifier | t.StringLiteral,
  body: t.BlockStatement,
  kind: "CommonJS" | "ES" | null = null,
) {
  const node: t.DeclareModule = {
    type: "DeclareModule",
    id,
    body,
    kind,
  };
  validateNode(node);
  return node;
}
export function declareModuleExports(typeAnnotation: t.TypeAnnotation) {
  const node: t.DeclareModuleExports = {
    type: "DeclareModuleExports",
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export function declareTypeAlias(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  right: t.FlowType,
) {
  const node: t.DeclareTypeAlias = {
    type: "DeclareTypeAlias",
    id,
    typeParameters,
    right,
  };
  validateNode(node);
  return node;
}
export function declareOpaqueType(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null = null,
  supertype: t.FlowType | null = null,
) {
  const node: t.DeclareOpaqueType = {
    type: "DeclareOpaqueType",
    id,
    typeParameters,
    supertype,
  };
  validateNode(node);
  return node;
}
export function declareVariable(id: t.Identifier) {
  const node: t.DeclareVariable = {
    type: "DeclareVariable",
    id,
  };
  validateNode(node);
  return node;
}
export function declareExportDeclaration(
  declaration: t.Flow | null = null,
  specifiers: Array<
    t.ExportSpecifier | t.ExportNamespaceSpecifier
  > | null = null,
  source: t.StringLiteral | null = null,
) {
  const node: t.DeclareExportDeclaration = {
    type: "DeclareExportDeclaration",
    declaration,
    specifiers,
    source,
  };
  validateNode(node);
  return node;
}
export function declareExportAllDeclaration(source: t.StringLiteral) {
  const node: t.DeclareExportAllDeclaration = {
    type: "DeclareExportAllDeclaration",
    source,
  };
  validateNode(node);
  return node;
}
export function declaredPredicate(value: t.Flow) {
  const node: t.DeclaredPredicate = {
    type: "DeclaredPredicate",
    value,
  };
  validateNode(node);
  return node;
}
export function existsTypeAnnotation() {
  const node: t.ExistsTypeAnnotation = {
    type: "ExistsTypeAnnotation",
  };
  validateNode(node);
  return node;
}
export function functionTypeAnnotation(
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  params: Array<t.FunctionTypeParam>,
  rest: t.FunctionTypeParam | null | undefined = null,
  returnType: t.FlowType,
) {
  const node: t.FunctionTypeAnnotation = {
    type: "FunctionTypeAnnotation",
    typeParameters,
    params,
    rest,
    returnType,
  };
  validateNode(node);
  return node;
}
export function functionTypeParam(
  name: t.Identifier | null | undefined = null,
  typeAnnotation: t.FlowType,
) {
  const node: t.FunctionTypeParam = {
    type: "FunctionTypeParam",
    name,
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export function genericTypeAnnotation(
  id: t.Identifier | t.QualifiedTypeIdentifier,
  typeParameters: t.TypeParameterInstantiation | null = null,
) {
  const node: t.GenericTypeAnnotation = {
    type: "GenericTypeAnnotation",
    id,
    typeParameters,
  };
  validateNode(node);
  return node;
}
export function inferredPredicate() {
  const node: t.InferredPredicate = {
    type: "InferredPredicate",
  };
  validateNode(node);
  return node;
}
export function interfaceExtends(
  id: t.Identifier | t.QualifiedTypeIdentifier,
  typeParameters: t.TypeParameterInstantiation | null = null,
) {
  const node: t.InterfaceExtends = {
    type: "InterfaceExtends",
    id,
    typeParameters,
  };
  validateNode(node);
  return node;
}
export function interfaceDeclaration(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  _extends: Array<t.InterfaceExtends> | null | undefined = null,
  body: t.ObjectTypeAnnotation,
) {
  const node: t.InterfaceDeclaration = {
    type: "InterfaceDeclaration",
    id,
    typeParameters,
    extends: _extends,
    body,
  };
  validateNode(node);
  return node;
}
export function interfaceTypeAnnotation(
  _extends: Array<t.InterfaceExtends> | null | undefined = null,
  body: t.ObjectTypeAnnotation,
) {
  const node: t.InterfaceTypeAnnotation = {
    type: "InterfaceTypeAnnotation",
    extends: _extends,
    body,
  };
  validateNode(node);
  return node;
}
export function intersectionTypeAnnotation(types: Array<t.FlowType>) {
  const node: t.IntersectionTypeAnnotation = {
    type: "IntersectionTypeAnnotation",
    types,
  };
  validateNode(node);
  return node;
}
export function mixedTypeAnnotation() {
  const node: t.MixedTypeAnnotation = {
    type: "MixedTypeAnnotation",
  };
  validateNode(node);
  return node;
}
export function emptyTypeAnnotation() {
  const node: t.EmptyTypeAnnotation = {
    type: "EmptyTypeAnnotation",
  };
  validateNode(node);
  return node;
}
export function nullableTypeAnnotation(typeAnnotation: t.FlowType) {
  const node: t.NullableTypeAnnotation = {
    type: "NullableTypeAnnotation",
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export function numberLiteralTypeAnnotation(value: number) {
  const node: t.NumberLiteralTypeAnnotation = {
    type: "NumberLiteralTypeAnnotation",
    value,
  };
  validateNode(node);
  return node;
}
export function numberTypeAnnotation() {
  const node: t.NumberTypeAnnotation = {
    type: "NumberTypeAnnotation",
  };
  validateNode(node);
  return node;
}
export function objectTypeAnnotation(
  properties: Array<t.ObjectTypeProperty | t.ObjectTypeSpreadProperty>,
  indexers: Array<t.ObjectTypeIndexer> | null = null,
  callProperties: Array<t.ObjectTypeCallProperty> | null = null,
  internalSlots: Array<t.ObjectTypeInternalSlot> | null = null,
  exact: boolean = false,
) {
  const node: t.ObjectTypeAnnotation = {
    type: "ObjectTypeAnnotation",
    properties,
    indexers,
    callProperties,
    internalSlots,
    exact,
  };
  validateNode(node);
  return node;
}
export function objectTypeInternalSlot(
  id: t.Identifier,
  value: t.FlowType,
  optional: boolean,
  _static: boolean,
  method: boolean,
) {
  const node: t.ObjectTypeInternalSlot = {
    type: "ObjectTypeInternalSlot",
    id,
    value,
    optional,
    static: _static,
    method,
  };
  validateNode(node);
  return node;
}
export function objectTypeCallProperty(value: t.FlowType) {
  const node: t.ObjectTypeCallProperty = {
    type: "ObjectTypeCallProperty",
    value,
    static: null,
  };
  validateNode(node);
  return node;
}
export function objectTypeIndexer(
  id: t.Identifier | null | undefined = null,
  key: t.FlowType,
  value: t.FlowType,
  variance: t.Variance | null = null,
) {
  const node: t.ObjectTypeIndexer = {
    type: "ObjectTypeIndexer",
    id,
    key,
    value,
    variance,
    static: null,
  };
  validateNode(node);
  return node;
}
export function objectTypeProperty(
  key: t.Identifier | t.StringLiteral,
  value: t.FlowType,
  variance: t.Variance | null = null,
) {
  const node: t.ObjectTypeProperty = {
    type: "ObjectTypeProperty",
    key,
    value,
    variance,
    kind: null,
    method: null,
    optional: null,
    proto: null,
    static: null,
  };
  validateNode(node);
  return node;
}
export function objectTypeSpreadProperty(argument: t.FlowType) {
  const node: t.ObjectTypeSpreadProperty = {
    type: "ObjectTypeSpreadProperty",
    argument,
  };
  validateNode(node);
  return node;
}
export function opaqueType(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  supertype: t.FlowType | null | undefined = null,
  impltype: t.FlowType,
) {
  const node: t.OpaqueType = {
    type: "OpaqueType",
    id,
    typeParameters,
    supertype,
    impltype,
  };
  validateNode(node);
  return node;
}
export function qualifiedTypeIdentifier(
  id: t.Identifier,
  qualification: t.Identifier | t.QualifiedTypeIdentifier,
) {
  const node: t.QualifiedTypeIdentifier = {
    type: "QualifiedTypeIdentifier",
    id,
    qualification,
  };
  validateNode(node);
  return node;
}
export function stringLiteralTypeAnnotation(value: string) {
  const node: t.StringLiteralTypeAnnotation = {
    type: "StringLiteralTypeAnnotation",
    value,
  };
  validateNode(node);
  return node;
}
export function stringTypeAnnotation() {
  const node: t.StringTypeAnnotation = {
    type: "StringTypeAnnotation",
  };
  validateNode(node);
  return node;
}
export function symbolTypeAnnotation() {
  const node: t.SymbolTypeAnnotation = {
    type: "SymbolTypeAnnotation",
  };
  validateNode(node);
  return node;
}
export function thisTypeAnnotation() {
  const node: t.ThisTypeAnnotation = {
    type: "ThisTypeAnnotation",
  };
  validateNode(node);
  return node;
}
export function tupleTypeAnnotation(types: Array<t.FlowType>) {
  const node: t.TupleTypeAnnotation = {
    type: "TupleTypeAnnotation",
    types,
  };
  validateNode(node);
  return node;
}
export function typeofTypeAnnotation(argument: t.FlowType) {
  const node: t.TypeofTypeAnnotation = {
    type: "TypeofTypeAnnotation",
    argument,
  };
  validateNode(node);
  return node;
}
export function typeAlias(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  right: t.FlowType,
) {
  const node: t.TypeAlias = {
    type: "TypeAlias",
    id,
    typeParameters,
    right,
  };
  validateNode(node);
  return node;
}
export function typeAnnotation(typeAnnotation: t.FlowType) {
  const node: t.TypeAnnotation = {
    type: "TypeAnnotation",
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export function typeCastExpression(
  expression: t.Expression,
  typeAnnotation: t.TypeAnnotation,
) {
  const node: t.TypeCastExpression = {
    type: "TypeCastExpression",
    expression,
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export function typeParameter(
  bound: t.TypeAnnotation | null = null,
  _default: t.FlowType | null = null,
  variance: t.Variance | null = null,
) {
  const node: t.TypeParameter = {
    type: "TypeParameter",
    bound,
    default: _default,
    variance,
    name: null,
  };
  validateNode(node);
  return node;
}
export function typeParameterDeclaration(params: Array<t.TypeParameter>) {
  const node: t.TypeParameterDeclaration = {
    type: "TypeParameterDeclaration",
    params,
  };
  validateNode(node);
  return node;
}
export function typeParameterInstantiation(params: Array<t.FlowType>) {
  const node: t.TypeParameterInstantiation = {
    type: "TypeParameterInstantiation",
    params,
  };
  validateNode(node);
  return node;
}
export function unionTypeAnnotation(types: Array<t.FlowType>) {
  const node: t.UnionTypeAnnotation = {
    type: "UnionTypeAnnotation",
    types,
  };
  validateNode(node);
  return node;
}
export function variance(kind: "minus" | "plus") {
  const node: t.Variance = {
    type: "Variance",
    kind,
  };
  validateNode(node);
  return node;
}
export function voidTypeAnnotation() {
  const node: t.VoidTypeAnnotation = {
    type: "VoidTypeAnnotation",
  };
  validateNode(node);
  return node;
}
export function enumDeclaration(
  id: t.Identifier,
  body:
    | t.EnumBooleanBody
    | t.EnumNumberBody
    | t.EnumStringBody
    | t.EnumSymbolBody,
) {
  const node: t.EnumDeclaration = {
    type: "EnumDeclaration",
    id,
    body,
  };
  validateNode(node);
  return node;
}
export function enumBooleanBody(members: Array<t.EnumBooleanMember>) {
  const node: t.EnumBooleanBody = {
    type: "EnumBooleanBody",
    members,
    explicitType: null,
    hasUnknownMembers: null,
  };
  validateNode(node);
  return node;
}
export function enumNumberBody(members: Array<t.EnumNumberMember>) {
  const node: t.EnumNumberBody = {
    type: "EnumNumberBody",
    members,
    explicitType: null,
    hasUnknownMembers: null,
  };
  validateNode(node);
  return node;
}
export function enumStringBody(
  members: Array<t.EnumStringMember | t.EnumDefaultedMember>,
) {
  const node: t.EnumStringBody = {
    type: "EnumStringBody",
    members,
    explicitType: null,
    hasUnknownMembers: null,
  };
  validateNode(node);
  return node;
}
export function enumSymbolBody(members: Array<t.EnumDefaultedMember>) {
  const node: t.EnumSymbolBody = {
    type: "EnumSymbolBody",
    members,
    hasUnknownMembers: null,
  };
  validateNode(node);
  return node;
}
export function enumBooleanMember(id: t.Identifier) {
  const node: t.EnumBooleanMember = {
    type: "EnumBooleanMember",
    id,
    init: null,
  };
  validateNode(node);
  return node;
}
export function enumNumberMember(id: t.Identifier, init: t.NumericLiteral) {
  const node: t.EnumNumberMember = {
    type: "EnumNumberMember",
    id,
    init,
  };
  validateNode(node);
  return node;
}
export function enumStringMember(id: t.Identifier, init: t.StringLiteral) {
  const node: t.EnumStringMember = {
    type: "EnumStringMember",
    id,
    init,
  };
  validateNode(node);
  return node;
}
export function enumDefaultedMember(id: t.Identifier) {
  const node: t.EnumDefaultedMember = {
    type: "EnumDefaultedMember",
    id,
  };
  validateNode(node);
  return node;
}
export function indexedAccessType(
  objectType: t.FlowType,
  indexType: t.FlowType,
) {
  const node: t.IndexedAccessType = {
    type: "IndexedAccessType",
    objectType,
    indexType,
  };
  validateNode(node);
  return node;
}
export function optionalIndexedAccessType(
  objectType: t.FlowType,
  indexType: t.FlowType,
) {
  const node: t.OptionalIndexedAccessType = {
    type: "OptionalIndexedAccessType",
    objectType,
    indexType,
    optional: null,
  };
  validateNode(node);
  return node;
}
export function jsxAttribute(
  name: t.JSXIdentifier | t.JSXNamespacedName,
  value:
    | t.JSXElement
    | t.JSXFragment
    | t.StringLiteral
    | t.JSXExpressionContainer
    | null = null,
) {
  const node: t.JSXAttribute = {
    type: "JSXAttribute",
    name,
    value,
  };
  validateNode(node);
  return node;
}
export { jsxAttribute as jSXAttribute };
export function jsxClosingElement(
  name: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName,
) {
  const node: t.JSXClosingElement = {
    type: "JSXClosingElement",
    name,
  };
  validateNode(node);
  return node;
}
export { jsxClosingElement as jSXClosingElement };
export function jsxElement(
  openingElement: t.JSXOpeningElement,
  closingElement: t.JSXClosingElement | null | undefined = null,
  children: Array<
    | t.JSXText
    | t.JSXExpressionContainer
    | t.JSXSpreadChild
    | t.JSXElement
    | t.JSXFragment
  >,
  selfClosing: boolean | null = null,
) {
  const node: t.JSXElement = {
    type: "JSXElement",
    openingElement,
    closingElement,
    children,
    selfClosing,
  };
  validateNode(node);
  return node;
}
export { jsxElement as jSXElement };
export function jsxEmptyExpression() {
  const node: t.JSXEmptyExpression = {
    type: "JSXEmptyExpression",
  };
  validateNode(node);
  return node;
}
export { jsxEmptyExpression as jSXEmptyExpression };
export function jsxExpressionContainer(
  expression: t.Expression | t.JSXEmptyExpression,
) {
  const node: t.JSXExpressionContainer = {
    type: "JSXExpressionContainer",
    expression,
  };
  validateNode(node);
  return node;
}
export { jsxExpressionContainer as jSXExpressionContainer };
export function jsxSpreadChild(expression: t.Expression) {
  const node: t.JSXSpreadChild = {
    type: "JSXSpreadChild",
    expression,
  };
  validateNode(node);
  return node;
}
export { jsxSpreadChild as jSXSpreadChild };
export function jsxIdentifier(name: string) {
  const node: t.JSXIdentifier = {
    type: "JSXIdentifier",
    name,
  };
  validateNode(node);
  return node;
}
export { jsxIdentifier as jSXIdentifier };
export function jsxMemberExpression(
  object: t.JSXMemberExpression | t.JSXIdentifier,
  property: t.JSXIdentifier,
) {
  const node: t.JSXMemberExpression = {
    type: "JSXMemberExpression",
    object,
    property,
  };
  validateNode(node);
  return node;
}
export { jsxMemberExpression as jSXMemberExpression };
export function jsxNamespacedName(
  namespace: t.JSXIdentifier,
  name: t.JSXIdentifier,
) {
  const node: t.JSXNamespacedName = {
    type: "JSXNamespacedName",
    namespace,
    name,
  };
  validateNode(node);
  return node;
}
export { jsxNamespacedName as jSXNamespacedName };
export function jsxOpeningElement(
  name: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName,
  attributes: Array<t.JSXAttribute | t.JSXSpreadAttribute>,
  selfClosing: boolean = false,
) {
  const node: t.JSXOpeningElement = {
    type: "JSXOpeningElement",
    name,
    attributes,
    selfClosing,
  };
  validateNode(node);
  return node;
}
export { jsxOpeningElement as jSXOpeningElement };
export function jsxSpreadAttribute(argument: t.Expression) {
  const node: t.JSXSpreadAttribute = {
    type: "JSXSpreadAttribute",
    argument,
  };
  validateNode(node);
  return node;
}
export { jsxSpreadAttribute as jSXSpreadAttribute };
export function jsxText(value: string) {
  const node: t.JSXText = {
    type: "JSXText",
    value,
  };
  validateNode(node);
  return node;
}
export { jsxText as jSXText };
export function jsxFragment(
  openingFragment: t.JSXOpeningFragment,
  closingFragment: t.JSXClosingFragment,
  children: Array<
    | t.JSXText
    | t.JSXExpressionContainer
    | t.JSXSpreadChild
    | t.JSXElement
    | t.JSXFragment
  >,
) {
  const node: t.JSXFragment = {
    type: "JSXFragment",
    openingFragment,
    closingFragment,
    children,
  };
  validateNode(node);
  return node;
}
export { jsxFragment as jSXFragment };
export function jsxOpeningFragment() {
  const node: t.JSXOpeningFragment = {
    type: "JSXOpeningFragment",
  };
  validateNode(node);
  return node;
}
export { jsxOpeningFragment as jSXOpeningFragment };
export function jsxClosingFragment() {
  const node: t.JSXClosingFragment = {
    type: "JSXClosingFragment",
  };
  validateNode(node);
  return node;
}
export { jsxClosingFragment as jSXClosingFragment };
export function noop() {
  const node: t.Noop = {
    type: "Noop",
  };
  validateNode(node);
  return node;
}
export function placeholder(
  expectedNode:
    | "Identifier"
    | "StringLiteral"
    | "Expression"
    | "Statement"
    | "Declaration"
    | "BlockStatement"
    | "ClassBody"
    | "Pattern",
  name: t.Identifier,
) {
  const node: t.Placeholder = {
    type: "Placeholder",
    expectedNode,
    name,
  };
  validateNode(node);
  return node;
}
export function v8IntrinsicIdentifier(name: string) {
  const node: t.V8IntrinsicIdentifier = {
    type: "V8IntrinsicIdentifier",
    name,
  };
  validateNode(node);
  return node;
}
export function argumentPlaceholder() {
  const node: t.ArgumentPlaceholder = {
    type: "ArgumentPlaceholder",
  };
  validateNode(node);
  return node;
}
export function bindExpression(object: t.Expression, callee: t.Expression) {
  const node: t.BindExpression = {
    type: "BindExpression",
    object,
    callee,
  };
  validateNode(node);
  return node;
}
export function importAttribute(
  key: t.Identifier | t.StringLiteral,
  value: t.StringLiteral,
) {
  const node: t.ImportAttribute = {
    type: "ImportAttribute",
    key,
    value,
  };
  validateNode(node);
  return node;
}
export function decorator(expression: t.Expression) {
  const node: t.Decorator = {
    type: "Decorator",
    expression,
  };
  validateNode(node);
  return node;
}
export function doExpression(body: t.BlockStatement, async: boolean = false) {
  const node: t.DoExpression = {
    type: "DoExpression",
    body,
    async,
  };
  validateNode(node);
  return node;
}
export function exportDefaultSpecifier(exported: t.Identifier) {
  const node: t.ExportDefaultSpecifier = {
    type: "ExportDefaultSpecifier",
    exported,
  };
  validateNode(node);
  return node;
}
export function recordExpression(
  properties: Array<t.ObjectProperty | t.SpreadElement>,
) {
  const node: t.RecordExpression = {
    type: "RecordExpression",
    properties,
  };
  validateNode(node);
  return node;
}
export function tupleExpression(
  elements: Array<t.Expression | t.SpreadElement> = [],
) {
  const node: t.TupleExpression = {
    type: "TupleExpression",
    elements,
  };
  validateNode(node);
  return node;
}
export function decimalLiteral(value: string) {
  const node: t.DecimalLiteral = {
    type: "DecimalLiteral",
    value,
  };
  validateNode(node);
  return node;
}
export function moduleExpression(body: t.Program) {
  const node: t.ModuleExpression = {
    type: "ModuleExpression",
    body,
  };
  validateNode(node);
  return node;
}
export function topicReference() {
  const node: t.TopicReference = {
    type: "TopicReference",
  };
  validateNode(node);
  return node;
}
export function pipelineTopicExpression(expression: t.Expression) {
  const node: t.PipelineTopicExpression = {
    type: "PipelineTopicExpression",
    expression,
  };
  validateNode(node);
  return node;
}
export function pipelineBareFunction(callee: t.Expression) {
  const node: t.PipelineBareFunction = {
    type: "PipelineBareFunction",
    callee,
  };
  validateNode(node);
  return node;
}
export function pipelinePrimaryTopicReference() {
  const node: t.PipelinePrimaryTopicReference = {
    type: "PipelinePrimaryTopicReference",
  };
  validateNode(node);
  return node;
}
export function tsParameterProperty(
  parameter: t.Identifier | t.AssignmentPattern,
) {
  const node: t.TSParameterProperty = {
    type: "TSParameterProperty",
    parameter,
  };
  validateNode(node);
  return node;
}
export { tsParameterProperty as tSParameterProperty };
export function tsDeclareFunction(
  id: t.Identifier | null | undefined = null,
  typeParameters:
    | t.TSTypeParameterDeclaration
    | t.Noop
    | null
    | undefined = null,
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  returnType: t.TSTypeAnnotation | t.Noop | null = null,
) {
  const node: t.TSDeclareFunction = {
    type: "TSDeclareFunction",
    id,
    typeParameters,
    params,
    returnType,
  };
  validateNode(node);
  return node;
}
export { tsDeclareFunction as tSDeclareFunction };
export function tsDeclareMethod(
  decorators: Array<t.Decorator> | null | undefined = null,
  key: t.Identifier | t.StringLiteral | t.NumericLiteral | t.Expression,
  typeParameters:
    | t.TSTypeParameterDeclaration
    | t.Noop
    | null
    | undefined = null,
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  returnType: t.TSTypeAnnotation | t.Noop | null = null,
) {
  const node: t.TSDeclareMethod = {
    type: "TSDeclareMethod",
    decorators,
    key,
    typeParameters,
    params,
    returnType,
  };
  validateNode(node);
  return node;
}
export { tsDeclareMethod as tSDeclareMethod };
export function tsQualifiedName(left: t.TSEntityName, right: t.Identifier) {
  const node: t.TSQualifiedName = {
    type: "TSQualifiedName",
    left,
    right,
  };
  validateNode(node);
  return node;
}
export { tsQualifiedName as tSQualifiedName };
export function tsCallSignatureDeclaration(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation: t.TSTypeAnnotation | null = null,
) {
  const node: t.TSCallSignatureDeclaration = {
    type: "TSCallSignatureDeclaration",
    typeParameters,
    parameters,
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export { tsCallSignatureDeclaration as tSCallSignatureDeclaration };
export function tsConstructSignatureDeclaration(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation: t.TSTypeAnnotation | null = null,
) {
  const node: t.TSConstructSignatureDeclaration = {
    type: "TSConstructSignatureDeclaration",
    typeParameters,
    parameters,
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export { tsConstructSignatureDeclaration as tSConstructSignatureDeclaration };
export function tsPropertySignature(
  key: t.Expression,
  typeAnnotation: t.TSTypeAnnotation | null = null,
  initializer: t.Expression | null = null,
) {
  const node: t.TSPropertySignature = {
    type: "TSPropertySignature",
    key,
    typeAnnotation,
    initializer,
    kind: null,
  };
  validateNode(node);
  return node;
}
export { tsPropertySignature as tSPropertySignature };
export function tsMethodSignature(
  key: t.Expression,
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation: t.TSTypeAnnotation | null = null,
) {
  const node: t.TSMethodSignature = {
    type: "TSMethodSignature",
    key,
    typeParameters,
    parameters,
    typeAnnotation,
    kind: null,
  };
  validateNode(node);
  return node;
}
export { tsMethodSignature as tSMethodSignature };
export function tsIndexSignature(
  parameters: Array<t.Identifier>,
  typeAnnotation: t.TSTypeAnnotation | null = null,
) {
  const node: t.TSIndexSignature = {
    type: "TSIndexSignature",
    parameters,
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export { tsIndexSignature as tSIndexSignature };
export function tsAnyKeyword() {
  const node: t.TSAnyKeyword = {
    type: "TSAnyKeyword",
  };
  validateNode(node);
  return node;
}
export { tsAnyKeyword as tSAnyKeyword };
export function tsBooleanKeyword() {
  const node: t.TSBooleanKeyword = {
    type: "TSBooleanKeyword",
  };
  validateNode(node);
  return node;
}
export { tsBooleanKeyword as tSBooleanKeyword };
export function tsBigIntKeyword() {
  const node: t.TSBigIntKeyword = {
    type: "TSBigIntKeyword",
  };
  validateNode(node);
  return node;
}
export { tsBigIntKeyword as tSBigIntKeyword };
export function tsIntrinsicKeyword() {
  const node: t.TSIntrinsicKeyword = {
    type: "TSIntrinsicKeyword",
  };
  validateNode(node);
  return node;
}
export { tsIntrinsicKeyword as tSIntrinsicKeyword };
export function tsNeverKeyword() {
  const node: t.TSNeverKeyword = {
    type: "TSNeverKeyword",
  };
  validateNode(node);
  return node;
}
export { tsNeverKeyword as tSNeverKeyword };
export function tsNullKeyword() {
  const node: t.TSNullKeyword = {
    type: "TSNullKeyword",
  };
  validateNode(node);
  return node;
}
export { tsNullKeyword as tSNullKeyword };
export function tsNumberKeyword() {
  const node: t.TSNumberKeyword = {
    type: "TSNumberKeyword",
  };
  validateNode(node);
  return node;
}
export { tsNumberKeyword as tSNumberKeyword };
export function tsObjectKeyword() {
  const node: t.TSObjectKeyword = {
    type: "TSObjectKeyword",
  };
  validateNode(node);
  return node;
}
export { tsObjectKeyword as tSObjectKeyword };
export function tsStringKeyword() {
  const node: t.TSStringKeyword = {
    type: "TSStringKeyword",
  };
  validateNode(node);
  return node;
}
export { tsStringKeyword as tSStringKeyword };
export function tsSymbolKeyword() {
  const node: t.TSSymbolKeyword = {
    type: "TSSymbolKeyword",
  };
  validateNode(node);
  return node;
}
export { tsSymbolKeyword as tSSymbolKeyword };
export function tsUndefinedKeyword() {
  const node: t.TSUndefinedKeyword = {
    type: "TSUndefinedKeyword",
  };
  validateNode(node);
  return node;
}
export { tsUndefinedKeyword as tSUndefinedKeyword };
export function tsUnknownKeyword() {
  const node: t.TSUnknownKeyword = {
    type: "TSUnknownKeyword",
  };
  validateNode(node);
  return node;
}
export { tsUnknownKeyword as tSUnknownKeyword };
export function tsVoidKeyword() {
  const node: t.TSVoidKeyword = {
    type: "TSVoidKeyword",
  };
  validateNode(node);
  return node;
}
export { tsVoidKeyword as tSVoidKeyword };
export function tsThisType() {
  const node: t.TSThisType = {
    type: "TSThisType",
  };
  validateNode(node);
  return node;
}
export { tsThisType as tSThisType };
export function tsFunctionType(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation: t.TSTypeAnnotation | null = null,
) {
  const node: t.TSFunctionType = {
    type: "TSFunctionType",
    typeParameters,
    parameters,
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export { tsFunctionType as tSFunctionType };
export function tsConstructorType(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation: t.TSTypeAnnotation | null = null,
) {
  const node: t.TSConstructorType = {
    type: "TSConstructorType",
    typeParameters,
    parameters,
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export { tsConstructorType as tSConstructorType };
export function tsTypeReference(
  typeName: t.TSEntityName,
  typeParameters: t.TSTypeParameterInstantiation | null = null,
) {
  const node: t.TSTypeReference = {
    type: "TSTypeReference",
    typeName,
    typeParameters,
  };
  validateNode(node);
  return node;
}
export { tsTypeReference as tSTypeReference };
export function tsTypePredicate(
  parameterName: t.Identifier | t.TSThisType,
  typeAnnotation: t.TSTypeAnnotation | null = null,
  asserts: boolean | null = null,
) {
  const node: t.TSTypePredicate = {
    type: "TSTypePredicate",
    parameterName,
    typeAnnotation,
    asserts,
  };
  validateNode(node);
  return node;
}
export { tsTypePredicate as tSTypePredicate };
export function tsTypeQuery(exprName: t.TSEntityName | t.TSImportType) {
  const node: t.TSTypeQuery = {
    type: "TSTypeQuery",
    exprName,
  };
  validateNode(node);
  return node;
}
export { tsTypeQuery as tSTypeQuery };
export function tsTypeLiteral(members: Array<t.TSTypeElement>) {
  const node: t.TSTypeLiteral = {
    type: "TSTypeLiteral",
    members,
  };
  validateNode(node);
  return node;
}
export { tsTypeLiteral as tSTypeLiteral };
export function tsArrayType(elementType: t.TSType) {
  const node: t.TSArrayType = {
    type: "TSArrayType",
    elementType,
  };
  validateNode(node);
  return node;
}
export { tsArrayType as tSArrayType };
export function tsTupleType(
  elementTypes: Array<t.TSType | t.TSNamedTupleMember>,
) {
  const node: t.TSTupleType = {
    type: "TSTupleType",
    elementTypes,
  };
  validateNode(node);
  return node;
}
export { tsTupleType as tSTupleType };
export function tsOptionalType(typeAnnotation: t.TSType) {
  const node: t.TSOptionalType = {
    type: "TSOptionalType",
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export { tsOptionalType as tSOptionalType };
export function tsRestType(typeAnnotation: t.TSType) {
  const node: t.TSRestType = {
    type: "TSRestType",
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export { tsRestType as tSRestType };
export function tsNamedTupleMember(
  label: t.Identifier,
  elementType: t.TSType,
  optional: boolean = false,
) {
  const node: t.TSNamedTupleMember = {
    type: "TSNamedTupleMember",
    label,
    elementType,
    optional,
  };
  validateNode(node);
  return node;
}
export { tsNamedTupleMember as tSNamedTupleMember };
export function tsUnionType(types: Array<t.TSType>) {
  const node: t.TSUnionType = {
    type: "TSUnionType",
    types,
  };
  validateNode(node);
  return node;
}
export { tsUnionType as tSUnionType };
export function tsIntersectionType(types: Array<t.TSType>) {
  const node: t.TSIntersectionType = {
    type: "TSIntersectionType",
    types,
  };
  validateNode(node);
  return node;
}
export { tsIntersectionType as tSIntersectionType };
export function tsConditionalType(
  checkType: t.TSType,
  extendsType: t.TSType,
  trueType: t.TSType,
  falseType: t.TSType,
) {
  const node: t.TSConditionalType = {
    type: "TSConditionalType",
    checkType,
    extendsType,
    trueType,
    falseType,
  };
  validateNode(node);
  return node;
}
export { tsConditionalType as tSConditionalType };
export function tsInferType(typeParameter: t.TSTypeParameter) {
  const node: t.TSInferType = {
    type: "TSInferType",
    typeParameter,
  };
  validateNode(node);
  return node;
}
export { tsInferType as tSInferType };
export function tsParenthesizedType(typeAnnotation: t.TSType) {
  const node: t.TSParenthesizedType = {
    type: "TSParenthesizedType",
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export { tsParenthesizedType as tSParenthesizedType };
export function tsTypeOperator(typeAnnotation: t.TSType) {
  const node: t.TSTypeOperator = {
    type: "TSTypeOperator",
    typeAnnotation,
    operator: null,
  };
  validateNode(node);
  return node;
}
export { tsTypeOperator as tSTypeOperator };
export function tsIndexedAccessType(objectType: t.TSType, indexType: t.TSType) {
  const node: t.TSIndexedAccessType = {
    type: "TSIndexedAccessType",
    objectType,
    indexType,
  };
  validateNode(node);
  return node;
}
export { tsIndexedAccessType as tSIndexedAccessType };
export function tsMappedType(
  typeParameter: t.TSTypeParameter,
  typeAnnotation: t.TSType | null = null,
  nameType: t.TSType | null = null,
) {
  const node: t.TSMappedType = {
    type: "TSMappedType",
    typeParameter,
    typeAnnotation,
    nameType,
  };
  validateNode(node);
  return node;
}
export { tsMappedType as tSMappedType };
export function tsLiteralType(
  literal:
    | t.NumericLiteral
    | t.StringLiteral
    | t.BooleanLiteral
    | t.BigIntLiteral
    | t.UnaryExpression,
) {
  const node: t.TSLiteralType = {
    type: "TSLiteralType",
    literal,
  };
  validateNode(node);
  return node;
}
export { tsLiteralType as tSLiteralType };
export function tsExpressionWithTypeArguments(
  expression: t.TSEntityName,
  typeParameters: t.TSTypeParameterInstantiation | null = null,
) {
  const node: t.TSExpressionWithTypeArguments = {
    type: "TSExpressionWithTypeArguments",
    expression,
    typeParameters,
  };
  validateNode(node);
  return node;
}
export { tsExpressionWithTypeArguments as tSExpressionWithTypeArguments };
export function tsInterfaceDeclaration(
  id: t.Identifier,
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  _extends: Array<t.TSExpressionWithTypeArguments> | null | undefined = null,
  body: t.TSInterfaceBody,
) {
  const node: t.TSInterfaceDeclaration = {
    type: "TSInterfaceDeclaration",
    id,
    typeParameters,
    extends: _extends,
    body,
  };
  validateNode(node);
  return node;
}
export { tsInterfaceDeclaration as tSInterfaceDeclaration };
export function tsInterfaceBody(body: Array<t.TSTypeElement>) {
  const node: t.TSInterfaceBody = {
    type: "TSInterfaceBody",
    body,
  };
  validateNode(node);
  return node;
}
export { tsInterfaceBody as tSInterfaceBody };
export function tsTypeAliasDeclaration(
  id: t.Identifier,
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  typeAnnotation: t.TSType,
) {
  const node: t.TSTypeAliasDeclaration = {
    type: "TSTypeAliasDeclaration",
    id,
    typeParameters,
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export { tsTypeAliasDeclaration as tSTypeAliasDeclaration };
export function tsAsExpression(
  expression: t.Expression,
  typeAnnotation: t.TSType,
) {
  const node: t.TSAsExpression = {
    type: "TSAsExpression",
    expression,
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export { tsAsExpression as tSAsExpression };
export function tsTypeAssertion(
  typeAnnotation: t.TSType,
  expression: t.Expression,
) {
  const node: t.TSTypeAssertion = {
    type: "TSTypeAssertion",
    typeAnnotation,
    expression,
  };
  validateNode(node);
  return node;
}
export { tsTypeAssertion as tSTypeAssertion };
export function tsEnumDeclaration(
  id: t.Identifier,
  members: Array<t.TSEnumMember>,
) {
  const node: t.TSEnumDeclaration = {
    type: "TSEnumDeclaration",
    id,
    members,
  };
  validateNode(node);
  return node;
}
export { tsEnumDeclaration as tSEnumDeclaration };
export function tsEnumMember(
  id: t.Identifier | t.StringLiteral,
  initializer: t.Expression | null = null,
) {
  const node: t.TSEnumMember = {
    type: "TSEnumMember",
    id,
    initializer,
  };
  validateNode(node);
  return node;
}
export { tsEnumMember as tSEnumMember };
export function tsModuleDeclaration(
  id: t.Identifier | t.StringLiteral,
  body: t.TSModuleBlock | t.TSModuleDeclaration,
) {
  const node: t.TSModuleDeclaration = {
    type: "TSModuleDeclaration",
    id,
    body,
  };
  validateNode(node);
  return node;
}
export { tsModuleDeclaration as tSModuleDeclaration };
export function tsModuleBlock(body: Array<t.Statement>) {
  const node: t.TSModuleBlock = {
    type: "TSModuleBlock",
    body,
  };
  validateNode(node);
  return node;
}
export { tsModuleBlock as tSModuleBlock };
export function tsImportType(
  argument: t.StringLiteral,
  qualifier: t.TSEntityName | null = null,
  typeParameters: t.TSTypeParameterInstantiation | null = null,
) {
  const node: t.TSImportType = {
    type: "TSImportType",
    argument,
    qualifier,
    typeParameters,
  };
  validateNode(node);
  return node;
}
export { tsImportType as tSImportType };
export function tsImportEqualsDeclaration(
  id: t.Identifier,
  moduleReference: t.TSEntityName | t.TSExternalModuleReference,
) {
  const node: t.TSImportEqualsDeclaration = {
    type: "TSImportEqualsDeclaration",
    id,
    moduleReference,
    isExport: null,
  };
  validateNode(node);
  return node;
}
export { tsImportEqualsDeclaration as tSImportEqualsDeclaration };
export function tsExternalModuleReference(expression: t.StringLiteral) {
  const node: t.TSExternalModuleReference = {
    type: "TSExternalModuleReference",
    expression,
  };
  validateNode(node);
  return node;
}
export { tsExternalModuleReference as tSExternalModuleReference };
export function tsNonNullExpression(expression: t.Expression) {
  const node: t.TSNonNullExpression = {
    type: "TSNonNullExpression",
    expression,
  };
  validateNode(node);
  return node;
}
export { tsNonNullExpression as tSNonNullExpression };
export function tsExportAssignment(expression: t.Expression) {
  const node: t.TSExportAssignment = {
    type: "TSExportAssignment",
    expression,
  };
  validateNode(node);
  return node;
}
export { tsExportAssignment as tSExportAssignment };
export function tsNamespaceExportDeclaration(id: t.Identifier) {
  const node: t.TSNamespaceExportDeclaration = {
    type: "TSNamespaceExportDeclaration",
    id,
  };
  validateNode(node);
  return node;
}
export { tsNamespaceExportDeclaration as tSNamespaceExportDeclaration };
export function tsTypeAnnotation(typeAnnotation: t.TSType) {
  const node: t.TSTypeAnnotation = {
    type: "TSTypeAnnotation",
    typeAnnotation,
  };
  validateNode(node);
  return node;
}
export { tsTypeAnnotation as tSTypeAnnotation };
export function tsTypeParameterInstantiation(params: Array<t.TSType>) {
  const node: t.TSTypeParameterInstantiation = {
    type: "TSTypeParameterInstantiation",
    params,
  };
  validateNode(node);
  return node;
}
export { tsTypeParameterInstantiation as tSTypeParameterInstantiation };
export function tsTypeParameterDeclaration(params: Array<t.TSTypeParameter>) {
  const node: t.TSTypeParameterDeclaration = {
    type: "TSTypeParameterDeclaration",
    params,
  };
  validateNode(node);
  return node;
}
export { tsTypeParameterDeclaration as tSTypeParameterDeclaration };
export function tsTypeParameter(
  constraint: t.TSType | null | undefined = null,
  _default: t.TSType | null | undefined = null,
  name: string,
) {
  const node: t.TSTypeParameter = {
    type: "TSTypeParameter",
    constraint,
    default: _default,
    name,
  };
  validateNode(node);
  return node;
}
export { tsTypeParameter as tSTypeParameter };
/** @deprecated */
function NumberLiteral(value: number): t.NumberLiteral {
  console.trace(
    "The node type NumberLiteral has been renamed to NumericLiteral",
  );
  return numericLiteral(value) as unknown as t.NumberLiteral;
}
export { NumberLiteral as numberLiteral };
/** @deprecated */
function RegexLiteral(pattern: string, flags: string = ""): t.RegexLiteral {
  console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
  return regExpLiteral(pattern, flags) as unknown as t.RegexLiteral;
}
export { RegexLiteral as regexLiteral };
/** @deprecated */
function RestProperty(argument: t.LVal): t.RestProperty {
  console.trace("The node type RestProperty has been renamed to RestElement");
  return restElement(argument) as unknown as t.RestProperty;
}
export { RestProperty as restProperty };
/** @deprecated */
function SpreadProperty(argument: t.Expression): t.SpreadProperty {
  console.trace(
    "The node type SpreadProperty has been renamed to SpreadElement",
  );
  return spreadElement(argument) as unknown as t.SpreadProperty;
}
export { SpreadProperty as spreadProperty };
