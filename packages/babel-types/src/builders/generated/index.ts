/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import builder from "../builder";
import type * as t from "../..";

/* eslint-disable @typescript-eslint/no-unused-vars */

export function arrayExpression(
  elements?: Array<null | t.Expression | t.SpreadElement>,
): t.ArrayExpression {
  return builder.apply("ArrayExpression", arguments);
}
export function assignmentExpression(
  operator: string,
  left: t.LVal,
  right: t.Expression,
): t.AssignmentExpression {
  return builder.apply("AssignmentExpression", arguments);
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
    | "<=",
  left: t.Expression | t.PrivateName,
  right: t.Expression,
): t.BinaryExpression {
  return builder.apply("BinaryExpression", arguments);
}
export function interpreterDirective(value: string): t.InterpreterDirective {
  return builder.apply("InterpreterDirective", arguments);
}
export function directive(value: t.DirectiveLiteral): t.Directive {
  return builder.apply("Directive", arguments);
}
export function directiveLiteral(value: string): t.DirectiveLiteral {
  return builder.apply("DirectiveLiteral", arguments);
}
export function blockStatement(
  body: Array<t.Statement>,
  directives?: Array<t.Directive>,
): t.BlockStatement {
  return builder.apply("BlockStatement", arguments);
}
export function breakStatement(label?: t.Identifier | null): t.BreakStatement {
  return builder.apply("BreakStatement", arguments);
}
export function callExpression(
  callee: t.Expression | t.V8IntrinsicIdentifier,
  _arguments: Array<
    t.Expression | t.SpreadElement | t.JSXNamespacedName | t.ArgumentPlaceholder
  >,
): t.CallExpression {
  return builder.apply("CallExpression", arguments);
}
export function catchClause(
  param: t.Identifier | t.ArrayPattern | t.ObjectPattern | null | undefined,
  body: t.BlockStatement,
): t.CatchClause {
  return builder.apply("CatchClause", arguments);
}
export function conditionalExpression(
  test: t.Expression,
  consequent: t.Expression,
  alternate: t.Expression,
): t.ConditionalExpression {
  return builder.apply("ConditionalExpression", arguments);
}
export function continueStatement(
  label?: t.Identifier | null,
): t.ContinueStatement {
  return builder.apply("ContinueStatement", arguments);
}
export function debuggerStatement(): t.DebuggerStatement {
  return builder.apply("DebuggerStatement", arguments);
}
export function doWhileStatement(
  test: t.Expression,
  body: t.Statement,
): t.DoWhileStatement {
  return builder.apply("DoWhileStatement", arguments);
}
export function emptyStatement(): t.EmptyStatement {
  return builder.apply("EmptyStatement", arguments);
}
export function expressionStatement(
  expression: t.Expression,
): t.ExpressionStatement {
  return builder.apply("ExpressionStatement", arguments);
}
export function file(
  program: t.Program,
  comments?: Array<t.CommentBlock | t.CommentLine> | null,
  tokens?: Array<any> | null,
): t.File {
  return builder.apply("File", arguments);
}
export function forInStatement(
  left: t.VariableDeclaration | t.LVal,
  right: t.Expression,
  body: t.Statement,
): t.ForInStatement {
  return builder.apply("ForInStatement", arguments);
}
export function forStatement(
  init: t.VariableDeclaration | t.Expression | null | undefined,
  test: t.Expression | null | undefined,
  update: t.Expression | null | undefined,
  body: t.Statement,
): t.ForStatement {
  return builder.apply("ForStatement", arguments);
}
export function functionDeclaration(
  id: t.Identifier | null | undefined,
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  body: t.BlockStatement,
  generator?: boolean,
  async?: boolean,
): t.FunctionDeclaration {
  return builder.apply("FunctionDeclaration", arguments);
}
export function functionExpression(
  id: t.Identifier | null | undefined,
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  body: t.BlockStatement,
  generator?: boolean,
  async?: boolean,
): t.FunctionExpression {
  return builder.apply("FunctionExpression", arguments);
}
export function identifier(name: string): t.Identifier {
  return builder.apply("Identifier", arguments);
}
export function ifStatement(
  test: t.Expression,
  consequent: t.Statement,
  alternate?: t.Statement | null,
): t.IfStatement {
  return builder.apply("IfStatement", arguments);
}
export function labeledStatement(
  label: t.Identifier,
  body: t.Statement,
): t.LabeledStatement {
  return builder.apply("LabeledStatement", arguments);
}
export function stringLiteral(value: string): t.StringLiteral {
  return builder.apply("StringLiteral", arguments);
}
export function numericLiteral(value: number): t.NumericLiteral {
  return builder.apply("NumericLiteral", arguments);
}
export function nullLiteral(): t.NullLiteral {
  return builder.apply("NullLiteral", arguments);
}
export function booleanLiteral(value: boolean): t.BooleanLiteral {
  return builder.apply("BooleanLiteral", arguments);
}
export function regExpLiteral(
  pattern: string,
  flags?: string,
): t.RegExpLiteral {
  return builder.apply("RegExpLiteral", arguments);
}
export function logicalExpression(
  operator: "||" | "&&" | "??",
  left: t.Expression,
  right: t.Expression,
): t.LogicalExpression {
  return builder.apply("LogicalExpression", arguments);
}
export function memberExpression(
  object: t.Expression,
  property: t.Expression | t.Identifier | t.PrivateName,
  computed?: boolean,
  optional?: true | false | null,
): t.MemberExpression {
  return builder.apply("MemberExpression", arguments);
}
export function newExpression(
  callee: t.Expression | t.V8IntrinsicIdentifier,
  _arguments: Array<
    t.Expression | t.SpreadElement | t.JSXNamespacedName | t.ArgumentPlaceholder
  >,
): t.NewExpression {
  return builder.apply("NewExpression", arguments);
}
export function program(
  body: Array<t.Statement>,
  directives?: Array<t.Directive>,
  sourceType?: "script" | "module",
  interpreter?: t.InterpreterDirective | null,
): t.Program {
  return builder.apply("Program", arguments);
}
export function objectExpression(
  properties: Array<t.ObjectMethod | t.ObjectProperty | t.SpreadElement>,
): t.ObjectExpression {
  return builder.apply("ObjectExpression", arguments);
}
export function objectMethod(
  kind: "method" | "get" | "set" | undefined,
  key: t.Expression | t.Identifier | t.StringLiteral | t.NumericLiteral,
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  body: t.BlockStatement,
  computed?: boolean,
  generator?: boolean,
  async?: boolean,
): t.ObjectMethod {
  return builder.apply("ObjectMethod", arguments);
}
export function objectProperty(
  key: t.Expression | t.Identifier | t.StringLiteral | t.NumericLiteral,
  value: t.Expression | t.PatternLike,
  computed?: boolean,
  shorthand?: boolean,
  decorators?: Array<t.Decorator> | null,
): t.ObjectProperty {
  return builder.apply("ObjectProperty", arguments);
}
export function restElement(argument: t.LVal): t.RestElement {
  return builder.apply("RestElement", arguments);
}
export function returnStatement(
  argument?: t.Expression | null,
): t.ReturnStatement {
  return builder.apply("ReturnStatement", arguments);
}
export function sequenceExpression(
  expressions: Array<t.Expression>,
): t.SequenceExpression {
  return builder.apply("SequenceExpression", arguments);
}
export function parenthesizedExpression(
  expression: t.Expression,
): t.ParenthesizedExpression {
  return builder.apply("ParenthesizedExpression", arguments);
}
export function switchCase(
  test: t.Expression | null | undefined,
  consequent: Array<t.Statement>,
): t.SwitchCase {
  return builder.apply("SwitchCase", arguments);
}
export function switchStatement(
  discriminant: t.Expression,
  cases: Array<t.SwitchCase>,
): t.SwitchStatement {
  return builder.apply("SwitchStatement", arguments);
}
export function thisExpression(): t.ThisExpression {
  return builder.apply("ThisExpression", arguments);
}
export function throwStatement(argument: t.Expression): t.ThrowStatement {
  return builder.apply("ThrowStatement", arguments);
}
export function tryStatement(
  block: t.BlockStatement,
  handler?: t.CatchClause | null,
  finalizer?: t.BlockStatement | null,
): t.TryStatement {
  return builder.apply("TryStatement", arguments);
}
export function unaryExpression(
  operator: "void" | "throw" | "delete" | "!" | "+" | "-" | "~" | "typeof",
  argument: t.Expression,
  prefix?: boolean,
): t.UnaryExpression {
  return builder.apply("UnaryExpression", arguments);
}
export function updateExpression(
  operator: "++" | "--",
  argument: t.Expression,
  prefix?: boolean,
): t.UpdateExpression {
  return builder.apply("UpdateExpression", arguments);
}
export function variableDeclaration(
  kind: "var" | "let" | "const",
  declarations: Array<t.VariableDeclarator>,
): t.VariableDeclaration {
  return builder.apply("VariableDeclaration", arguments);
}
export function variableDeclarator(
  id: t.LVal,
  init?: t.Expression | null,
): t.VariableDeclarator {
  return builder.apply("VariableDeclarator", arguments);
}
export function whileStatement(
  test: t.Expression,
  body: t.Statement,
): t.WhileStatement {
  return builder.apply("WhileStatement", arguments);
}
export function withStatement(
  object: t.Expression,
  body: t.Statement,
): t.WithStatement {
  return builder.apply("WithStatement", arguments);
}
export function assignmentPattern(
  left: t.Identifier | t.ObjectPattern | t.ArrayPattern | t.MemberExpression,
  right: t.Expression,
): t.AssignmentPattern {
  return builder.apply("AssignmentPattern", arguments);
}
export function arrayPattern(
  elements: Array<null | t.PatternLike>,
): t.ArrayPattern {
  return builder.apply("ArrayPattern", arguments);
}
export function arrowFunctionExpression(
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  body: t.BlockStatement | t.Expression,
  async?: boolean,
): t.ArrowFunctionExpression {
  return builder.apply("ArrowFunctionExpression", arguments);
}
export function classBody(
  body: Array<
    | t.ClassMethod
    | t.ClassPrivateMethod
    | t.ClassProperty
    | t.ClassPrivateProperty
    | t.TSDeclareMethod
    | t.TSIndexSignature
  >,
): t.ClassBody {
  return builder.apply("ClassBody", arguments);
}
export function classExpression(
  id: t.Identifier | null | undefined,
  superClass: t.Expression | null | undefined,
  body: t.ClassBody,
  decorators?: Array<t.Decorator> | null,
): t.ClassExpression {
  return builder.apply("ClassExpression", arguments);
}
export function classDeclaration(
  id: t.Identifier,
  superClass: t.Expression | null | undefined,
  body: t.ClassBody,
  decorators?: Array<t.Decorator> | null,
): t.ClassDeclaration {
  return builder.apply("ClassDeclaration", arguments);
}
export function exportAllDeclaration(
  source: t.StringLiteral,
): t.ExportAllDeclaration {
  return builder.apply("ExportAllDeclaration", arguments);
}
export function exportDefaultDeclaration(
  declaration:
    | t.FunctionDeclaration
    | t.TSDeclareFunction
    | t.ClassDeclaration
    | t.Expression,
): t.ExportDefaultDeclaration {
  return builder.apply("ExportDefaultDeclaration", arguments);
}
export function exportNamedDeclaration(
  declaration?: t.Declaration | null,
  specifiers?: Array<
    t.ExportSpecifier | t.ExportDefaultSpecifier | t.ExportNamespaceSpecifier
  >,
  source?: t.StringLiteral | null,
): t.ExportNamedDeclaration {
  return builder.apply("ExportNamedDeclaration", arguments);
}
export function exportSpecifier(
  local: t.Identifier,
  exported: t.Identifier | t.StringLiteral,
): t.ExportSpecifier {
  return builder.apply("ExportSpecifier", arguments);
}
export function forOfStatement(
  left: t.VariableDeclaration | t.LVal,
  right: t.Expression,
  body: t.Statement,
  _await?: boolean,
): t.ForOfStatement {
  return builder.apply("ForOfStatement", arguments);
}
export function importDeclaration(
  specifiers: Array<
    t.ImportSpecifier | t.ImportDefaultSpecifier | t.ImportNamespaceSpecifier
  >,
  source: t.StringLiteral,
): t.ImportDeclaration {
  return builder.apply("ImportDeclaration", arguments);
}
export function importDefaultSpecifier(
  local: t.Identifier,
): t.ImportDefaultSpecifier {
  return builder.apply("ImportDefaultSpecifier", arguments);
}
export function importNamespaceSpecifier(
  local: t.Identifier,
): t.ImportNamespaceSpecifier {
  return builder.apply("ImportNamespaceSpecifier", arguments);
}
export function importSpecifier(
  local: t.Identifier,
  imported: t.Identifier | t.StringLiteral,
): t.ImportSpecifier {
  return builder.apply("ImportSpecifier", arguments);
}
export function metaProperty(
  meta: t.Identifier,
  property: t.Identifier,
): t.MetaProperty {
  return builder.apply("MetaProperty", arguments);
}
export function classMethod(
  kind: "get" | "set" | "method" | "constructor" | undefined,
  key: t.Identifier | t.StringLiteral | t.NumericLiteral | t.Expression,
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  body: t.BlockStatement,
  computed?: boolean,
  _static?: boolean,
  generator?: boolean,
  async?: boolean,
): t.ClassMethod {
  return builder.apply("ClassMethod", arguments);
}
export function objectPattern(
  properties: Array<t.RestElement | t.ObjectProperty>,
): t.ObjectPattern {
  return builder.apply("ObjectPattern", arguments);
}
export function spreadElement(argument: t.Expression): t.SpreadElement {
  return builder.apply("SpreadElement", arguments);
}
function _super(): t.Super {
  return builder.apply("Super", arguments);
}
export { _super as super };
export function taggedTemplateExpression(
  tag: t.Expression,
  quasi: t.TemplateLiteral,
): t.TaggedTemplateExpression {
  return builder.apply("TaggedTemplateExpression", arguments);
}
export function templateElement(
  value: { raw: string; cooked?: string },
  tail?: boolean,
): t.TemplateElement {
  return builder.apply("TemplateElement", arguments);
}
export function templateLiteral(
  quasis: Array<t.TemplateElement>,
  expressions: Array<t.Expression | t.TSType>,
): t.TemplateLiteral {
  return builder.apply("TemplateLiteral", arguments);
}
export function yieldExpression(
  argument?: t.Expression | null,
  delegate?: boolean,
): t.YieldExpression {
  return builder.apply("YieldExpression", arguments);
}
export function awaitExpression(argument: t.Expression): t.AwaitExpression {
  return builder.apply("AwaitExpression", arguments);
}
function _import(): t.Import {
  return builder.apply("Import", arguments);
}
export { _import as import };
export function bigIntLiteral(value: string): t.BigIntLiteral {
  return builder.apply("BigIntLiteral", arguments);
}
export function exportNamespaceSpecifier(
  exported: t.Identifier,
): t.ExportNamespaceSpecifier {
  return builder.apply("ExportNamespaceSpecifier", arguments);
}
export function optionalMemberExpression(
  object: t.Expression,
  property: t.Expression | t.Identifier,
  computed: boolean | undefined,
  optional: boolean,
): t.OptionalMemberExpression {
  return builder.apply("OptionalMemberExpression", arguments);
}
export function optionalCallExpression(
  callee: t.Expression,
  _arguments: Array<
    t.Expression | t.SpreadElement | t.JSXNamespacedName | t.ArgumentPlaceholder
  >,
  optional: boolean,
): t.OptionalCallExpression {
  return builder.apply("OptionalCallExpression", arguments);
}
export function classProperty(
  key: t.Identifier | t.StringLiteral | t.NumericLiteral | t.Expression,
  value?: t.Expression | null,
  typeAnnotation?: t.TypeAnnotation | t.TSTypeAnnotation | t.Noop | null,
  decorators?: Array<t.Decorator> | null,
  computed?: boolean,
  _static?: boolean,
): t.ClassProperty {
  return builder.apply("ClassProperty", arguments);
}
export function classAccessorProperty(
  key:
    | t.Identifier
    | t.StringLiteral
    | t.NumericLiteral
    | t.Expression
    | t.PrivateName,
  value?: t.Expression | null,
  typeAnnotation?: t.TypeAnnotation | t.TSTypeAnnotation | t.Noop | null,
  decorators?: Array<t.Decorator> | null,
  computed?: boolean,
  _static?: boolean,
): t.ClassAccessorProperty {
  return builder.apply("ClassAccessorProperty", arguments);
}
export function classPrivateProperty(
  key: t.PrivateName,
  value: t.Expression | null | undefined,
  decorators: Array<t.Decorator> | null | undefined,
  _static: any,
): t.ClassPrivateProperty {
  return builder.apply("ClassPrivateProperty", arguments);
}
export function classPrivateMethod(
  kind: "get" | "set" | "method" | "constructor" | undefined,
  key: t.PrivateName,
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  body: t.BlockStatement,
  _static?: boolean,
): t.ClassPrivateMethod {
  return builder.apply("ClassPrivateMethod", arguments);
}
export function privateName(id: t.Identifier): t.PrivateName {
  return builder.apply("PrivateName", arguments);
}
export function staticBlock(body: Array<t.Statement>): t.StaticBlock {
  return builder.apply("StaticBlock", arguments);
}
export function anyTypeAnnotation(): t.AnyTypeAnnotation {
  return builder.apply("AnyTypeAnnotation", arguments);
}
export function arrayTypeAnnotation(
  elementType: t.FlowType,
): t.ArrayTypeAnnotation {
  return builder.apply("ArrayTypeAnnotation", arguments);
}
export function booleanTypeAnnotation(): t.BooleanTypeAnnotation {
  return builder.apply("BooleanTypeAnnotation", arguments);
}
export function booleanLiteralTypeAnnotation(
  value: boolean,
): t.BooleanLiteralTypeAnnotation {
  return builder.apply("BooleanLiteralTypeAnnotation", arguments);
}
export function nullLiteralTypeAnnotation(): t.NullLiteralTypeAnnotation {
  return builder.apply("NullLiteralTypeAnnotation", arguments);
}
export function classImplements(
  id: t.Identifier,
  typeParameters?: t.TypeParameterInstantiation | null,
): t.ClassImplements {
  return builder.apply("ClassImplements", arguments);
}
export function declareClass(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  _extends: Array<t.InterfaceExtends> | null | undefined,
  body: t.ObjectTypeAnnotation,
): t.DeclareClass {
  return builder.apply("DeclareClass", arguments);
}
export function declareFunction(id: t.Identifier): t.DeclareFunction {
  return builder.apply("DeclareFunction", arguments);
}
export function declareInterface(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  _extends: Array<t.InterfaceExtends> | null | undefined,
  body: t.ObjectTypeAnnotation,
): t.DeclareInterface {
  return builder.apply("DeclareInterface", arguments);
}
export function declareModule(
  id: t.Identifier | t.StringLiteral,
  body: t.BlockStatement,
  kind?: "CommonJS" | "ES" | null,
): t.DeclareModule {
  return builder.apply("DeclareModule", arguments);
}
export function declareModuleExports(
  typeAnnotation: t.TypeAnnotation,
): t.DeclareModuleExports {
  return builder.apply("DeclareModuleExports", arguments);
}
export function declareTypeAlias(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  right: t.FlowType,
): t.DeclareTypeAlias {
  return builder.apply("DeclareTypeAlias", arguments);
}
export function declareOpaqueType(
  id: t.Identifier,
  typeParameters?: t.TypeParameterDeclaration | null,
  supertype?: t.FlowType | null,
): t.DeclareOpaqueType {
  return builder.apply("DeclareOpaqueType", arguments);
}
export function declareVariable(id: t.Identifier): t.DeclareVariable {
  return builder.apply("DeclareVariable", arguments);
}
export function declareExportDeclaration(
  declaration?: t.Flow | null,
  specifiers?: Array<t.ExportSpecifier | t.ExportNamespaceSpecifier> | null,
  source?: t.StringLiteral | null,
): t.DeclareExportDeclaration {
  return builder.apply("DeclareExportDeclaration", arguments);
}
export function declareExportAllDeclaration(
  source: t.StringLiteral,
): t.DeclareExportAllDeclaration {
  return builder.apply("DeclareExportAllDeclaration", arguments);
}
export function declaredPredicate(value: t.Flow): t.DeclaredPredicate {
  return builder.apply("DeclaredPredicate", arguments);
}
export function existsTypeAnnotation(): t.ExistsTypeAnnotation {
  return builder.apply("ExistsTypeAnnotation", arguments);
}
export function functionTypeAnnotation(
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  params: Array<t.FunctionTypeParam>,
  rest: t.FunctionTypeParam | null | undefined,
  returnType: t.FlowType,
): t.FunctionTypeAnnotation {
  return builder.apply("FunctionTypeAnnotation", arguments);
}
export function functionTypeParam(
  name: t.Identifier | null | undefined,
  typeAnnotation: t.FlowType,
): t.FunctionTypeParam {
  return builder.apply("FunctionTypeParam", arguments);
}
export function genericTypeAnnotation(
  id: t.Identifier | t.QualifiedTypeIdentifier,
  typeParameters?: t.TypeParameterInstantiation | null,
): t.GenericTypeAnnotation {
  return builder.apply("GenericTypeAnnotation", arguments);
}
export function inferredPredicate(): t.InferredPredicate {
  return builder.apply("InferredPredicate", arguments);
}
export function interfaceExtends(
  id: t.Identifier | t.QualifiedTypeIdentifier,
  typeParameters?: t.TypeParameterInstantiation | null,
): t.InterfaceExtends {
  return builder.apply("InterfaceExtends", arguments);
}
export function interfaceDeclaration(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  _extends: Array<t.InterfaceExtends> | null | undefined,
  body: t.ObjectTypeAnnotation,
): t.InterfaceDeclaration {
  return builder.apply("InterfaceDeclaration", arguments);
}
export function interfaceTypeAnnotation(
  _extends: Array<t.InterfaceExtends> | null | undefined,
  body: t.ObjectTypeAnnotation,
): t.InterfaceTypeAnnotation {
  return builder.apply("InterfaceTypeAnnotation", arguments);
}
export function intersectionTypeAnnotation(
  types: Array<t.FlowType>,
): t.IntersectionTypeAnnotation {
  return builder.apply("IntersectionTypeAnnotation", arguments);
}
export function mixedTypeAnnotation(): t.MixedTypeAnnotation {
  return builder.apply("MixedTypeAnnotation", arguments);
}
export function emptyTypeAnnotation(): t.EmptyTypeAnnotation {
  return builder.apply("EmptyTypeAnnotation", arguments);
}
export function nullableTypeAnnotation(
  typeAnnotation: t.FlowType,
): t.NullableTypeAnnotation {
  return builder.apply("NullableTypeAnnotation", arguments);
}
export function numberLiteralTypeAnnotation(
  value: number,
): t.NumberLiteralTypeAnnotation {
  return builder.apply("NumberLiteralTypeAnnotation", arguments);
}
export function numberTypeAnnotation(): t.NumberTypeAnnotation {
  return builder.apply("NumberTypeAnnotation", arguments);
}
export function objectTypeAnnotation(
  properties: Array<t.ObjectTypeProperty | t.ObjectTypeSpreadProperty>,
  indexers?: Array<t.ObjectTypeIndexer> | null,
  callProperties?: Array<t.ObjectTypeCallProperty> | null,
  internalSlots?: Array<t.ObjectTypeInternalSlot> | null,
  exact?: boolean,
): t.ObjectTypeAnnotation {
  return builder.apply("ObjectTypeAnnotation", arguments);
}
export function objectTypeInternalSlot(
  id: t.Identifier,
  value: t.FlowType,
  optional: boolean,
  _static: boolean,
  method: boolean,
): t.ObjectTypeInternalSlot {
  return builder.apply("ObjectTypeInternalSlot", arguments);
}
export function objectTypeCallProperty(
  value: t.FlowType,
): t.ObjectTypeCallProperty {
  return builder.apply("ObjectTypeCallProperty", arguments);
}
export function objectTypeIndexer(
  id: t.Identifier | null | undefined,
  key: t.FlowType,
  value: t.FlowType,
  variance?: t.Variance | null,
): t.ObjectTypeIndexer {
  return builder.apply("ObjectTypeIndexer", arguments);
}
export function objectTypeProperty(
  key: t.Identifier | t.StringLiteral,
  value: t.FlowType,
  variance?: t.Variance | null,
): t.ObjectTypeProperty {
  return builder.apply("ObjectTypeProperty", arguments);
}
export function objectTypeSpreadProperty(
  argument: t.FlowType,
): t.ObjectTypeSpreadProperty {
  return builder.apply("ObjectTypeSpreadProperty", arguments);
}
export function opaqueType(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  supertype: t.FlowType | null | undefined,
  impltype: t.FlowType,
): t.OpaqueType {
  return builder.apply("OpaqueType", arguments);
}
export function qualifiedTypeIdentifier(
  id: t.Identifier,
  qualification: t.Identifier | t.QualifiedTypeIdentifier,
): t.QualifiedTypeIdentifier {
  return builder.apply("QualifiedTypeIdentifier", arguments);
}
export function stringLiteralTypeAnnotation(
  value: string,
): t.StringLiteralTypeAnnotation {
  return builder.apply("StringLiteralTypeAnnotation", arguments);
}
export function stringTypeAnnotation(): t.StringTypeAnnotation {
  return builder.apply("StringTypeAnnotation", arguments);
}
export function symbolTypeAnnotation(): t.SymbolTypeAnnotation {
  return builder.apply("SymbolTypeAnnotation", arguments);
}
export function thisTypeAnnotation(): t.ThisTypeAnnotation {
  return builder.apply("ThisTypeAnnotation", arguments);
}
export function tupleTypeAnnotation(
  types: Array<t.FlowType>,
): t.TupleTypeAnnotation {
  return builder.apply("TupleTypeAnnotation", arguments);
}
export function typeofTypeAnnotation(
  argument: t.FlowType,
): t.TypeofTypeAnnotation {
  return builder.apply("TypeofTypeAnnotation", arguments);
}
export function typeAlias(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  right: t.FlowType,
): t.TypeAlias {
  return builder.apply("TypeAlias", arguments);
}
export function typeAnnotation(typeAnnotation: t.FlowType): t.TypeAnnotation {
  return builder.apply("TypeAnnotation", arguments);
}
export function typeCastExpression(
  expression: t.Expression,
  typeAnnotation: t.TypeAnnotation,
): t.TypeCastExpression {
  return builder.apply("TypeCastExpression", arguments);
}
export function typeParameter(
  bound?: t.TypeAnnotation | null,
  _default?: t.FlowType | null,
  variance?: t.Variance | null,
): t.TypeParameter {
  return builder.apply("TypeParameter", arguments);
}
export function typeParameterDeclaration(
  params: Array<t.TypeParameter>,
): t.TypeParameterDeclaration {
  return builder.apply("TypeParameterDeclaration", arguments);
}
export function typeParameterInstantiation(
  params: Array<t.FlowType>,
): t.TypeParameterInstantiation {
  return builder.apply("TypeParameterInstantiation", arguments);
}
export function unionTypeAnnotation(
  types: Array<t.FlowType>,
): t.UnionTypeAnnotation {
  return builder.apply("UnionTypeAnnotation", arguments);
}
export function variance(kind: "minus" | "plus"): t.Variance {
  return builder.apply("Variance", arguments);
}
export function voidTypeAnnotation(): t.VoidTypeAnnotation {
  return builder.apply("VoidTypeAnnotation", arguments);
}
export function enumDeclaration(
  id: t.Identifier,
  body:
    | t.EnumBooleanBody
    | t.EnumNumberBody
    | t.EnumStringBody
    | t.EnumSymbolBody,
): t.EnumDeclaration {
  return builder.apply("EnumDeclaration", arguments);
}
export function enumBooleanBody(
  members: Array<t.EnumBooleanMember>,
): t.EnumBooleanBody {
  return builder.apply("EnumBooleanBody", arguments);
}
export function enumNumberBody(
  members: Array<t.EnumNumberMember>,
): t.EnumNumberBody {
  return builder.apply("EnumNumberBody", arguments);
}
export function enumStringBody(
  members: Array<t.EnumStringMember | t.EnumDefaultedMember>,
): t.EnumStringBody {
  return builder.apply("EnumStringBody", arguments);
}
export function enumSymbolBody(
  members: Array<t.EnumDefaultedMember>,
): t.EnumSymbolBody {
  return builder.apply("EnumSymbolBody", arguments);
}
export function enumBooleanMember(id: t.Identifier): t.EnumBooleanMember {
  return builder.apply("EnumBooleanMember", arguments);
}
export function enumNumberMember(
  id: t.Identifier,
  init: t.NumericLiteral,
): t.EnumNumberMember {
  return builder.apply("EnumNumberMember", arguments);
}
export function enumStringMember(
  id: t.Identifier,
  init: t.StringLiteral,
): t.EnumStringMember {
  return builder.apply("EnumStringMember", arguments);
}
export function enumDefaultedMember(id: t.Identifier): t.EnumDefaultedMember {
  return builder.apply("EnumDefaultedMember", arguments);
}
export function indexedAccessType(
  objectType: t.FlowType,
  indexType: t.FlowType,
): t.IndexedAccessType {
  return builder.apply("IndexedAccessType", arguments);
}
export function optionalIndexedAccessType(
  objectType: t.FlowType,
  indexType: t.FlowType,
): t.OptionalIndexedAccessType {
  return builder.apply("OptionalIndexedAccessType", arguments);
}
export function jsxAttribute(
  name: t.JSXIdentifier | t.JSXNamespacedName,
  value?:
    | t.JSXElement
    | t.JSXFragment
    | t.StringLiteral
    | t.JSXExpressionContainer
    | null,
): t.JSXAttribute {
  return builder.apply("JSXAttribute", arguments);
}
export { jsxAttribute as jSXAttribute };
export function jsxClosingElement(
  name: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName,
): t.JSXClosingElement {
  return builder.apply("JSXClosingElement", arguments);
}
export { jsxClosingElement as jSXClosingElement };
export function jsxElement(
  openingElement: t.JSXOpeningElement,
  closingElement: t.JSXClosingElement | null | undefined,
  children: Array<
    | t.JSXText
    | t.JSXExpressionContainer
    | t.JSXSpreadChild
    | t.JSXElement
    | t.JSXFragment
  >,
  selfClosing?: boolean | null,
): t.JSXElement {
  return builder.apply("JSXElement", arguments);
}
export { jsxElement as jSXElement };
export function jsxEmptyExpression(): t.JSXEmptyExpression {
  return builder.apply("JSXEmptyExpression", arguments);
}
export { jsxEmptyExpression as jSXEmptyExpression };
export function jsxExpressionContainer(
  expression: t.Expression | t.JSXEmptyExpression,
): t.JSXExpressionContainer {
  return builder.apply("JSXExpressionContainer", arguments);
}
export { jsxExpressionContainer as jSXExpressionContainer };
export function jsxSpreadChild(expression: t.Expression): t.JSXSpreadChild {
  return builder.apply("JSXSpreadChild", arguments);
}
export { jsxSpreadChild as jSXSpreadChild };
export function jsxIdentifier(name: string): t.JSXIdentifier {
  return builder.apply("JSXIdentifier", arguments);
}
export { jsxIdentifier as jSXIdentifier };
export function jsxMemberExpression(
  object: t.JSXMemberExpression | t.JSXIdentifier,
  property: t.JSXIdentifier,
): t.JSXMemberExpression {
  return builder.apply("JSXMemberExpression", arguments);
}
export { jsxMemberExpression as jSXMemberExpression };
export function jsxNamespacedName(
  namespace: t.JSXIdentifier,
  name: t.JSXIdentifier,
): t.JSXNamespacedName {
  return builder.apply("JSXNamespacedName", arguments);
}
export { jsxNamespacedName as jSXNamespacedName };
export function jsxOpeningElement(
  name: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName,
  attributes: Array<t.JSXAttribute | t.JSXSpreadAttribute>,
  selfClosing?: boolean,
): t.JSXOpeningElement {
  return builder.apply("JSXOpeningElement", arguments);
}
export { jsxOpeningElement as jSXOpeningElement };
export function jsxSpreadAttribute(
  argument: t.Expression,
): t.JSXSpreadAttribute {
  return builder.apply("JSXSpreadAttribute", arguments);
}
export { jsxSpreadAttribute as jSXSpreadAttribute };
export function jsxText(value: string): t.JSXText {
  return builder.apply("JSXText", arguments);
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
): t.JSXFragment {
  return builder.apply("JSXFragment", arguments);
}
export { jsxFragment as jSXFragment };
export function jsxOpeningFragment(): t.JSXOpeningFragment {
  return builder.apply("JSXOpeningFragment", arguments);
}
export { jsxOpeningFragment as jSXOpeningFragment };
export function jsxClosingFragment(): t.JSXClosingFragment {
  return builder.apply("JSXClosingFragment", arguments);
}
export { jsxClosingFragment as jSXClosingFragment };
export function noop(): t.Noop {
  return builder.apply("Noop", arguments);
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
): t.Placeholder {
  return builder.apply("Placeholder", arguments);
}
export function v8IntrinsicIdentifier(name: string): t.V8IntrinsicIdentifier {
  return builder.apply("V8IntrinsicIdentifier", arguments);
}
export function argumentPlaceholder(): t.ArgumentPlaceholder {
  return builder.apply("ArgumentPlaceholder", arguments);
}
export function bindExpression(
  object: t.Expression,
  callee: t.Expression,
): t.BindExpression {
  return builder.apply("BindExpression", arguments);
}
export function importAttribute(
  key: t.Identifier | t.StringLiteral,
  value: t.StringLiteral,
): t.ImportAttribute {
  return builder.apply("ImportAttribute", arguments);
}
export function decorator(expression: t.Expression): t.Decorator {
  return builder.apply("Decorator", arguments);
}
export function doExpression(
  body: t.BlockStatement,
  async?: boolean,
): t.DoExpression {
  return builder.apply("DoExpression", arguments);
}
export function exportDefaultSpecifier(
  exported: t.Identifier,
): t.ExportDefaultSpecifier {
  return builder.apply("ExportDefaultSpecifier", arguments);
}
export function recordExpression(
  properties: Array<t.ObjectProperty | t.SpreadElement>,
): t.RecordExpression {
  return builder.apply("RecordExpression", arguments);
}
export function tupleExpression(
  elements?: Array<t.Expression | t.SpreadElement>,
): t.TupleExpression {
  return builder.apply("TupleExpression", arguments);
}
export function decimalLiteral(value: string): t.DecimalLiteral {
  return builder.apply("DecimalLiteral", arguments);
}
export function moduleExpression(body: t.Program): t.ModuleExpression {
  return builder.apply("ModuleExpression", arguments);
}
export function topicReference(): t.TopicReference {
  return builder.apply("TopicReference", arguments);
}
export function pipelineTopicExpression(
  expression: t.Expression,
): t.PipelineTopicExpression {
  return builder.apply("PipelineTopicExpression", arguments);
}
export function pipelineBareFunction(
  callee: t.Expression,
): t.PipelineBareFunction {
  return builder.apply("PipelineBareFunction", arguments);
}
export function pipelinePrimaryTopicReference(): t.PipelinePrimaryTopicReference {
  return builder.apply("PipelinePrimaryTopicReference", arguments);
}
export function tsParameterProperty(
  parameter: t.Identifier | t.AssignmentPattern,
): t.TSParameterProperty {
  return builder.apply("TSParameterProperty", arguments);
}
export { tsParameterProperty as tSParameterProperty };
export function tsDeclareFunction(
  id: t.Identifier | null | undefined,
  typeParameters: t.TSTypeParameterDeclaration | t.Noop | null | undefined,
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  returnType?: t.TSTypeAnnotation | t.Noop | null,
): t.TSDeclareFunction {
  return builder.apply("TSDeclareFunction", arguments);
}
export { tsDeclareFunction as tSDeclareFunction };
export function tsDeclareMethod(
  decorators: Array<t.Decorator> | null | undefined,
  key: t.Identifier | t.StringLiteral | t.NumericLiteral | t.Expression,
  typeParameters: t.TSTypeParameterDeclaration | t.Noop | null | undefined,
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  returnType?: t.TSTypeAnnotation | t.Noop | null,
): t.TSDeclareMethod {
  return builder.apply("TSDeclareMethod", arguments);
}
export { tsDeclareMethod as tSDeclareMethod };
export function tsQualifiedName(
  left: t.TSEntityName,
  right: t.Identifier,
): t.TSQualifiedName {
  return builder.apply("TSQualifiedName", arguments);
}
export { tsQualifiedName as tSQualifiedName };
export function tsCallSignatureDeclaration(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation?: t.TSTypeAnnotation | null,
): t.TSCallSignatureDeclaration {
  return builder.apply("TSCallSignatureDeclaration", arguments);
}
export { tsCallSignatureDeclaration as tSCallSignatureDeclaration };
export function tsConstructSignatureDeclaration(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation?: t.TSTypeAnnotation | null,
): t.TSConstructSignatureDeclaration {
  return builder.apply("TSConstructSignatureDeclaration", arguments);
}
export { tsConstructSignatureDeclaration as tSConstructSignatureDeclaration };
export function tsPropertySignature(
  key: t.Expression,
  typeAnnotation?: t.TSTypeAnnotation | null,
  initializer?: t.Expression | null,
): t.TSPropertySignature {
  return builder.apply("TSPropertySignature", arguments);
}
export { tsPropertySignature as tSPropertySignature };
export function tsMethodSignature(
  key: t.Expression,
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation?: t.TSTypeAnnotation | null,
): t.TSMethodSignature {
  return builder.apply("TSMethodSignature", arguments);
}
export { tsMethodSignature as tSMethodSignature };
export function tsIndexSignature(
  parameters: Array<t.Identifier>,
  typeAnnotation?: t.TSTypeAnnotation | null,
): t.TSIndexSignature {
  return builder.apply("TSIndexSignature", arguments);
}
export { tsIndexSignature as tSIndexSignature };
export function tsAnyKeyword(): t.TSAnyKeyword {
  return builder.apply("TSAnyKeyword", arguments);
}
export { tsAnyKeyword as tSAnyKeyword };
export function tsBooleanKeyword(): t.TSBooleanKeyword {
  return builder.apply("TSBooleanKeyword", arguments);
}
export { tsBooleanKeyword as tSBooleanKeyword };
export function tsBigIntKeyword(): t.TSBigIntKeyword {
  return builder.apply("TSBigIntKeyword", arguments);
}
export { tsBigIntKeyword as tSBigIntKeyword };
export function tsIntrinsicKeyword(): t.TSIntrinsicKeyword {
  return builder.apply("TSIntrinsicKeyword", arguments);
}
export { tsIntrinsicKeyword as tSIntrinsicKeyword };
export function tsNeverKeyword(): t.TSNeverKeyword {
  return builder.apply("TSNeverKeyword", arguments);
}
export { tsNeverKeyword as tSNeverKeyword };
export function tsNullKeyword(): t.TSNullKeyword {
  return builder.apply("TSNullKeyword", arguments);
}
export { tsNullKeyword as tSNullKeyword };
export function tsNumberKeyword(): t.TSNumberKeyword {
  return builder.apply("TSNumberKeyword", arguments);
}
export { tsNumberKeyword as tSNumberKeyword };
export function tsObjectKeyword(): t.TSObjectKeyword {
  return builder.apply("TSObjectKeyword", arguments);
}
export { tsObjectKeyword as tSObjectKeyword };
export function tsStringKeyword(): t.TSStringKeyword {
  return builder.apply("TSStringKeyword", arguments);
}
export { tsStringKeyword as tSStringKeyword };
export function tsSymbolKeyword(): t.TSSymbolKeyword {
  return builder.apply("TSSymbolKeyword", arguments);
}
export { tsSymbolKeyword as tSSymbolKeyword };
export function tsUndefinedKeyword(): t.TSUndefinedKeyword {
  return builder.apply("TSUndefinedKeyword", arguments);
}
export { tsUndefinedKeyword as tSUndefinedKeyword };
export function tsUnknownKeyword(): t.TSUnknownKeyword {
  return builder.apply("TSUnknownKeyword", arguments);
}
export { tsUnknownKeyword as tSUnknownKeyword };
export function tsVoidKeyword(): t.TSVoidKeyword {
  return builder.apply("TSVoidKeyword", arguments);
}
export { tsVoidKeyword as tSVoidKeyword };
export function tsThisType(): t.TSThisType {
  return builder.apply("TSThisType", arguments);
}
export { tsThisType as tSThisType };
export function tsFunctionType(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation?: t.TSTypeAnnotation | null,
): t.TSFunctionType {
  return builder.apply("TSFunctionType", arguments);
}
export { tsFunctionType as tSFunctionType };
export function tsConstructorType(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation?: t.TSTypeAnnotation | null,
): t.TSConstructorType {
  return builder.apply("TSConstructorType", arguments);
}
export { tsConstructorType as tSConstructorType };
export function tsTypeReference(
  typeName: t.TSEntityName,
  typeParameters?: t.TSTypeParameterInstantiation | null,
): t.TSTypeReference {
  return builder.apply("TSTypeReference", arguments);
}
export { tsTypeReference as tSTypeReference };
export function tsTypePredicate(
  parameterName: t.Identifier | t.TSThisType,
  typeAnnotation?: t.TSTypeAnnotation | null,
  asserts?: boolean | null,
): t.TSTypePredicate {
  return builder.apply("TSTypePredicate", arguments);
}
export { tsTypePredicate as tSTypePredicate };
export function tsTypeQuery(
  exprName: t.TSEntityName | t.TSImportType,
): t.TSTypeQuery {
  return builder.apply("TSTypeQuery", arguments);
}
export { tsTypeQuery as tSTypeQuery };
export function tsTypeLiteral(
  members: Array<t.TSTypeElement>,
): t.TSTypeLiteral {
  return builder.apply("TSTypeLiteral", arguments);
}
export { tsTypeLiteral as tSTypeLiteral };
export function tsArrayType(elementType: t.TSType): t.TSArrayType {
  return builder.apply("TSArrayType", arguments);
}
export { tsArrayType as tSArrayType };
export function tsTupleType(
  elementTypes: Array<t.TSType | t.TSNamedTupleMember>,
): t.TSTupleType {
  return builder.apply("TSTupleType", arguments);
}
export { tsTupleType as tSTupleType };
export function tsOptionalType(typeAnnotation: t.TSType): t.TSOptionalType {
  return builder.apply("TSOptionalType", arguments);
}
export { tsOptionalType as tSOptionalType };
export function tsRestType(typeAnnotation: t.TSType): t.TSRestType {
  return builder.apply("TSRestType", arguments);
}
export { tsRestType as tSRestType };
export function tsNamedTupleMember(
  label: t.Identifier,
  elementType: t.TSType,
  optional?: boolean,
): t.TSNamedTupleMember {
  return builder.apply("TSNamedTupleMember", arguments);
}
export { tsNamedTupleMember as tSNamedTupleMember };
export function tsUnionType(types: Array<t.TSType>): t.TSUnionType {
  return builder.apply("TSUnionType", arguments);
}
export { tsUnionType as tSUnionType };
export function tsIntersectionType(
  types: Array<t.TSType>,
): t.TSIntersectionType {
  return builder.apply("TSIntersectionType", arguments);
}
export { tsIntersectionType as tSIntersectionType };
export function tsConditionalType(
  checkType: t.TSType,
  extendsType: t.TSType,
  trueType: t.TSType,
  falseType: t.TSType,
): t.TSConditionalType {
  return builder.apply("TSConditionalType", arguments);
}
export { tsConditionalType as tSConditionalType };
export function tsInferType(typeParameter: t.TSTypeParameter): t.TSInferType {
  return builder.apply("TSInferType", arguments);
}
export { tsInferType as tSInferType };
export function tsParenthesizedType(
  typeAnnotation: t.TSType,
): t.TSParenthesizedType {
  return builder.apply("TSParenthesizedType", arguments);
}
export { tsParenthesizedType as tSParenthesizedType };
export function tsTypeOperator(typeAnnotation: t.TSType): t.TSTypeOperator {
  return builder.apply("TSTypeOperator", arguments);
}
export { tsTypeOperator as tSTypeOperator };
export function tsIndexedAccessType(
  objectType: t.TSType,
  indexType: t.TSType,
): t.TSIndexedAccessType {
  return builder.apply("TSIndexedAccessType", arguments);
}
export { tsIndexedAccessType as tSIndexedAccessType };
export function tsMappedType(
  typeParameter: t.TSTypeParameter,
  typeAnnotation?: t.TSType | null,
  nameType?: t.TSType | null,
): t.TSMappedType {
  return builder.apply("TSMappedType", arguments);
}
export { tsMappedType as tSMappedType };
export function tsLiteralType(
  literal:
    | t.NumericLiteral
    | t.StringLiteral
    | t.BooleanLiteral
    | t.BigIntLiteral
    | t.UnaryExpression,
): t.TSLiteralType {
  return builder.apply("TSLiteralType", arguments);
}
export { tsLiteralType as tSLiteralType };
export function tsExpressionWithTypeArguments(
  expression: t.TSEntityName,
  typeParameters?: t.TSTypeParameterInstantiation | null,
): t.TSExpressionWithTypeArguments {
  return builder.apply("TSExpressionWithTypeArguments", arguments);
}
export { tsExpressionWithTypeArguments as tSExpressionWithTypeArguments };
export function tsInterfaceDeclaration(
  id: t.Identifier,
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  _extends: Array<t.TSExpressionWithTypeArguments> | null | undefined,
  body: t.TSInterfaceBody,
): t.TSInterfaceDeclaration {
  return builder.apply("TSInterfaceDeclaration", arguments);
}
export { tsInterfaceDeclaration as tSInterfaceDeclaration };
export function tsInterfaceBody(
  body: Array<t.TSTypeElement>,
): t.TSInterfaceBody {
  return builder.apply("TSInterfaceBody", arguments);
}
export { tsInterfaceBody as tSInterfaceBody };
export function tsTypeAliasDeclaration(
  id: t.Identifier,
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  typeAnnotation: t.TSType,
): t.TSTypeAliasDeclaration {
  return builder.apply("TSTypeAliasDeclaration", arguments);
}
export { tsTypeAliasDeclaration as tSTypeAliasDeclaration };
export function tsAsExpression(
  expression: t.Expression,
  typeAnnotation: t.TSType,
): t.TSAsExpression {
  return builder.apply("TSAsExpression", arguments);
}
export { tsAsExpression as tSAsExpression };
export function tsTypeAssertion(
  typeAnnotation: t.TSType,
  expression: t.Expression,
): t.TSTypeAssertion {
  return builder.apply("TSTypeAssertion", arguments);
}
export { tsTypeAssertion as tSTypeAssertion };
export function tsEnumDeclaration(
  id: t.Identifier,
  members: Array<t.TSEnumMember>,
): t.TSEnumDeclaration {
  return builder.apply("TSEnumDeclaration", arguments);
}
export { tsEnumDeclaration as tSEnumDeclaration };
export function tsEnumMember(
  id: t.Identifier | t.StringLiteral,
  initializer?: t.Expression | null,
): t.TSEnumMember {
  return builder.apply("TSEnumMember", arguments);
}
export { tsEnumMember as tSEnumMember };
export function tsModuleDeclaration(
  id: t.Identifier | t.StringLiteral,
  body: t.TSModuleBlock | t.TSModuleDeclaration,
): t.TSModuleDeclaration {
  return builder.apply("TSModuleDeclaration", arguments);
}
export { tsModuleDeclaration as tSModuleDeclaration };
export function tsModuleBlock(body: Array<t.Statement>): t.TSModuleBlock {
  return builder.apply("TSModuleBlock", arguments);
}
export { tsModuleBlock as tSModuleBlock };
export function tsImportType(
  argument: t.StringLiteral,
  qualifier?: t.TSEntityName | null,
  typeParameters?: t.TSTypeParameterInstantiation | null,
): t.TSImportType {
  return builder.apply("TSImportType", arguments);
}
export { tsImportType as tSImportType };
export function tsImportEqualsDeclaration(
  id: t.Identifier,
  moduleReference: t.TSEntityName | t.TSExternalModuleReference,
): t.TSImportEqualsDeclaration {
  return builder.apply("TSImportEqualsDeclaration", arguments);
}
export { tsImportEqualsDeclaration as tSImportEqualsDeclaration };
export function tsExternalModuleReference(
  expression: t.StringLiteral,
): t.TSExternalModuleReference {
  return builder.apply("TSExternalModuleReference", arguments);
}
export { tsExternalModuleReference as tSExternalModuleReference };
export function tsNonNullExpression(
  expression: t.Expression,
): t.TSNonNullExpression {
  return builder.apply("TSNonNullExpression", arguments);
}
export { tsNonNullExpression as tSNonNullExpression };
export function tsExportAssignment(
  expression: t.Expression,
): t.TSExportAssignment {
  return builder.apply("TSExportAssignment", arguments);
}
export { tsExportAssignment as tSExportAssignment };
export function tsNamespaceExportDeclaration(
  id: t.Identifier,
): t.TSNamespaceExportDeclaration {
  return builder.apply("TSNamespaceExportDeclaration", arguments);
}
export { tsNamespaceExportDeclaration as tSNamespaceExportDeclaration };
export function tsTypeAnnotation(typeAnnotation: t.TSType): t.TSTypeAnnotation {
  return builder.apply("TSTypeAnnotation", arguments);
}
export { tsTypeAnnotation as tSTypeAnnotation };
export function tsTypeParameterInstantiation(
  params: Array<t.TSType>,
): t.TSTypeParameterInstantiation {
  return builder.apply("TSTypeParameterInstantiation", arguments);
}
export { tsTypeParameterInstantiation as tSTypeParameterInstantiation };
export function tsTypeParameterDeclaration(
  params: Array<t.TSTypeParameter>,
): t.TSTypeParameterDeclaration {
  return builder.apply("TSTypeParameterDeclaration", arguments);
}
export { tsTypeParameterDeclaration as tSTypeParameterDeclaration };
export function tsTypeParameter(
  constraint: t.TSType | null | undefined,
  _default: t.TSType | null | undefined,
  name: string,
): t.TSTypeParameter {
  return builder.apply("TSTypeParameter", arguments);
}
export { tsTypeParameter as tSTypeParameter };
/** @deprecated */
function NumberLiteral(value: number): t.NumberLiteral {
  console.trace(
    "The node type NumberLiteral has been renamed to NumericLiteral",
  );
  return builder.apply("NumberLiteral", arguments);
}
export { NumberLiteral as numberLiteral };
/** @deprecated */
function RegexLiteral(pattern: string, flags?: string): t.RegexLiteral {
  console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
  return builder.apply("RegexLiteral", arguments);
}
export { RegexLiteral as regexLiteral };
/** @deprecated */
function RestProperty(argument: t.LVal): t.RestProperty {
  console.trace("The node type RestProperty has been renamed to RestElement");
  return builder.apply("RestProperty", arguments);
}
export { RestProperty as restProperty };
/** @deprecated */
function SpreadProperty(argument: t.Expression): t.SpreadProperty {
  console.trace(
    "The node type SpreadProperty has been renamed to SpreadElement",
  );
  return builder.apply("SpreadProperty", arguments);
}
export { SpreadProperty as spreadProperty };
