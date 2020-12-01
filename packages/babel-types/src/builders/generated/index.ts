/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import builder from "../builder";
import type * as t from "../../types";

export function arrayExpression(
  elements?: Array<null | t.Expression | t.SpreadElement>,
): t.ArrayExpression {
  return builder("ArrayExpression", elements);
}
export function assignmentExpression(
  operator: string,
  left: t.LVal,
  right: t.Expression,
): t.AssignmentExpression {
  return builder("AssignmentExpression", operator, left, right);
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
  return builder("BinaryExpression", operator, left, right);
}
export function interpreterDirective(value: string): t.InterpreterDirective {
  return builder("InterpreterDirective", value);
}
export function directive(value: t.DirectiveLiteral): t.Directive {
  return builder("Directive", value);
}
export function directiveLiteral(value: string): t.DirectiveLiteral {
  return builder("DirectiveLiteral", value);
}
export function blockStatement(
  body: Array<t.Statement>,
  directives?: Array<t.Directive>,
): t.BlockStatement {
  return builder("BlockStatement", body, directives);
}
export function breakStatement(label?: t.Identifier | null): t.BreakStatement {
  return builder("BreakStatement", label);
}
export function callExpression(
  callee: t.Expression | t.V8IntrinsicIdentifier,
  _arguments: Array<
    t.Expression | t.SpreadElement | t.JSXNamespacedName | t.ArgumentPlaceholder
  >,
): t.CallExpression {
  return builder("CallExpression", callee, _arguments);
}
export function catchClause(
  param: t.Identifier | t.ArrayPattern | t.ObjectPattern | null | undefined,
  body: t.BlockStatement,
): t.CatchClause {
  return builder("CatchClause", param, body);
}
export function conditionalExpression(
  test: t.Expression,
  consequent: t.Expression,
  alternate: t.Expression,
): t.ConditionalExpression {
  return builder("ConditionalExpression", test, consequent, alternate);
}
export function continueStatement(
  label?: t.Identifier | null,
): t.ContinueStatement {
  return builder("ContinueStatement", label);
}
export function debuggerStatement(): t.DebuggerStatement {
  return builder("DebuggerStatement");
}
export function doWhileStatement(
  test: t.Expression,
  body: t.Statement,
): t.DoWhileStatement {
  return builder("DoWhileStatement", test, body);
}
export function emptyStatement(): t.EmptyStatement {
  return builder("EmptyStatement");
}
export function expressionStatement(
  expression: t.Expression,
): t.ExpressionStatement {
  return builder("ExpressionStatement", expression);
}
export function file(
  program: t.Program,
  comments?: Array<t.CommentBlock | t.CommentLine> | null,
  tokens?: Array<any> | null,
): t.File {
  return builder("File", program, comments, tokens);
}
export function forInStatement(
  left: t.VariableDeclaration | t.LVal,
  right: t.Expression,
  body: t.Statement,
): t.ForInStatement {
  return builder("ForInStatement", left, right, body);
}
export function forStatement(
  init: t.VariableDeclaration | t.Expression | null | undefined,
  test: t.Expression | null | undefined,
  update: t.Expression | null | undefined,
  body: t.Statement,
): t.ForStatement {
  return builder("ForStatement", init, test, update, body);
}
export function functionDeclaration(
  id: t.Identifier | null | undefined,
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  body: t.BlockStatement,
  generator?: boolean,
  async?: boolean,
): t.FunctionDeclaration {
  return builder("FunctionDeclaration", id, params, body, generator, async);
}
export function functionExpression(
  id: t.Identifier | null | undefined,
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  body: t.BlockStatement,
  generator?: boolean,
  async?: boolean,
): t.FunctionExpression {
  return builder("FunctionExpression", id, params, body, generator, async);
}
export function identifier(name: string): t.Identifier {
  return builder("Identifier", name);
}
export function ifStatement(
  test: t.Expression,
  consequent: t.Statement,
  alternate?: t.Statement | null,
): t.IfStatement {
  return builder("IfStatement", test, consequent, alternate);
}
export function labeledStatement(
  label: t.Identifier,
  body: t.Statement,
): t.LabeledStatement {
  return builder("LabeledStatement", label, body);
}
export function stringLiteral(value: string): t.StringLiteral {
  return builder("StringLiteral", value);
}
export function numericLiteral(value: number): t.NumericLiteral {
  return builder("NumericLiteral", value);
}
export function nullLiteral(): t.NullLiteral {
  return builder("NullLiteral");
}
export function booleanLiteral(value: boolean): t.BooleanLiteral {
  return builder("BooleanLiteral", value);
}
export function regExpLiteral(
  pattern: string,
  flags?: string,
): t.RegExpLiteral {
  return builder("RegExpLiteral", pattern, flags);
}
export function logicalExpression(
  operator: "||" | "&&" | "??",
  left: t.Expression,
  right: t.Expression,
): t.LogicalExpression {
  return builder("LogicalExpression", operator, left, right);
}
export function memberExpression(
  object: t.Expression,
  property: t.Expression | t.Identifier | t.PrivateName,
  computed?: boolean,
  optional?: true | false | null,
): t.MemberExpression {
  return builder("MemberExpression", object, property, computed, optional);
}
export function newExpression(
  callee: t.Expression | t.V8IntrinsicIdentifier,
  _arguments: Array<
    t.Expression | t.SpreadElement | t.JSXNamespacedName | t.ArgumentPlaceholder
  >,
): t.NewExpression {
  return builder("NewExpression", callee, _arguments);
}
export function program(
  body: Array<t.Statement>,
  directives?: Array<t.Directive>,
  sourceType?: "script" | "module",
  interpreter?: t.InterpreterDirective | null,
): t.Program {
  return builder("Program", body, directives, sourceType, interpreter);
}
export function objectExpression(
  properties: Array<t.ObjectMethod | t.ObjectProperty | t.SpreadElement>,
): t.ObjectExpression {
  return builder("ObjectExpression", properties);
}
export function objectMethod(
  kind: "method" | "get" | "set" | undefined,
  key: t.Expression | t.Identifier | t.StringLiteral | t.NumericLiteral,
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  body: t.BlockStatement,
  computed?: boolean,
  generator?: boolean,
  async?: boolean,
): t.ObjectMethod {
  return builder(
    "ObjectMethod",
    kind,
    key,
    params,
    body,
    computed,
    generator,
    async,
  );
}
export function objectProperty(
  key: t.Expression | t.Identifier | t.StringLiteral | t.NumericLiteral,
  value: t.Expression | t.PatternLike,
  computed?: boolean,
  shorthand?: boolean,
  decorators?: Array<t.Decorator> | null,
): t.ObjectProperty {
  return builder("ObjectProperty", key, value, computed, shorthand, decorators);
}
export function restElement(argument: t.LVal): t.RestElement {
  return builder("RestElement", argument);
}
export function returnStatement(
  argument?: t.Expression | null,
): t.ReturnStatement {
  return builder("ReturnStatement", argument);
}
export function sequenceExpression(
  expressions: Array<t.Expression>,
): t.SequenceExpression {
  return builder("SequenceExpression", expressions);
}
export function parenthesizedExpression(
  expression: t.Expression,
): t.ParenthesizedExpression {
  return builder("ParenthesizedExpression", expression);
}
export function switchCase(
  test: t.Expression | null | undefined,
  consequent: Array<t.Statement>,
): t.SwitchCase {
  return builder("SwitchCase", test, consequent);
}
export function switchStatement(
  discriminant: t.Expression,
  cases: Array<t.SwitchCase>,
): t.SwitchStatement {
  return builder("SwitchStatement", discriminant, cases);
}
export function thisExpression(): t.ThisExpression {
  return builder("ThisExpression");
}
export function throwStatement(argument: t.Expression): t.ThrowStatement {
  return builder("ThrowStatement", argument);
}
export function tryStatement(
  block: t.BlockStatement,
  handler?: t.CatchClause | null,
  finalizer?: t.BlockStatement | null,
): t.TryStatement {
  return builder("TryStatement", block, handler, finalizer);
}
export function unaryExpression(
  operator: "void" | "throw" | "delete" | "!" | "+" | "-" | "~" | "typeof",
  argument: t.Expression,
  prefix?: boolean,
): t.UnaryExpression {
  return builder("UnaryExpression", operator, argument, prefix);
}
export function updateExpression(
  operator: "++" | "--",
  argument: t.Expression,
  prefix?: boolean,
): t.UpdateExpression {
  return builder("UpdateExpression", operator, argument, prefix);
}
export function variableDeclaration(
  kind: "var" | "let" | "const",
  declarations: Array<t.VariableDeclarator>,
): t.VariableDeclaration {
  return builder("VariableDeclaration", kind, declarations);
}
export function variableDeclarator(
  id: t.LVal,
  init?: t.Expression | null,
): t.VariableDeclarator {
  return builder("VariableDeclarator", id, init);
}
export function whileStatement(
  test: t.Expression,
  body: t.Statement,
): t.WhileStatement {
  return builder("WhileStatement", test, body);
}
export function withStatement(
  object: t.Expression,
  body: t.Statement,
): t.WithStatement {
  return builder("WithStatement", object, body);
}
export function assignmentPattern(
  left: t.Identifier | t.ObjectPattern | t.ArrayPattern | t.MemberExpression,
  right: t.Expression,
): t.AssignmentPattern {
  return builder("AssignmentPattern", left, right);
}
export function arrayPattern(
  elements: Array<null | t.PatternLike>,
): t.ArrayPattern {
  return builder("ArrayPattern", elements);
}
export function arrowFunctionExpression(
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  body: t.BlockStatement | t.Expression,
  async?: boolean,
): t.ArrowFunctionExpression {
  return builder("ArrowFunctionExpression", params, body, async);
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
  return builder("ClassBody", body);
}
export function classExpression(
  id: t.Identifier | null | undefined,
  superClass: t.Expression | null | undefined,
  body: t.ClassBody,
  decorators?: Array<t.Decorator> | null,
): t.ClassExpression {
  return builder("ClassExpression", id, superClass, body, decorators);
}
export function classDeclaration(
  id: t.Identifier,
  superClass: t.Expression | null | undefined,
  body: t.ClassBody,
  decorators?: Array<t.Decorator> | null,
): t.ClassDeclaration {
  return builder("ClassDeclaration", id, superClass, body, decorators);
}
export function exportAllDeclaration(
  source: t.StringLiteral,
): t.ExportAllDeclaration {
  return builder("ExportAllDeclaration", source);
}
export function exportDefaultDeclaration(
  declaration:
    | t.FunctionDeclaration
    | t.TSDeclareFunction
    | t.ClassDeclaration
    | t.Expression,
): t.ExportDefaultDeclaration {
  return builder("ExportDefaultDeclaration", declaration);
}
export function exportNamedDeclaration(
  declaration?: t.Declaration | null,
  specifiers?: Array<
    t.ExportSpecifier | t.ExportDefaultSpecifier | t.ExportNamespaceSpecifier
  >,
  source?: t.StringLiteral | null,
): t.ExportNamedDeclaration {
  return builder("ExportNamedDeclaration", declaration, specifiers, source);
}
export function exportSpecifier(
  local: t.Identifier,
  exported: t.Identifier | t.StringLiteral,
): t.ExportSpecifier {
  return builder("ExportSpecifier", local, exported);
}
export function forOfStatement(
  left: t.VariableDeclaration | t.LVal,
  right: t.Expression,
  body: t.Statement,
  _await?: boolean,
): t.ForOfStatement {
  return builder("ForOfStatement", left, right, body, _await);
}
export function importDeclaration(
  specifiers: Array<
    t.ImportSpecifier | t.ImportDefaultSpecifier | t.ImportNamespaceSpecifier
  >,
  source: t.StringLiteral,
): t.ImportDeclaration {
  return builder("ImportDeclaration", specifiers, source);
}
export function importDefaultSpecifier(
  local: t.Identifier,
): t.ImportDefaultSpecifier {
  return builder("ImportDefaultSpecifier", local);
}
export function importNamespaceSpecifier(
  local: t.Identifier,
): t.ImportNamespaceSpecifier {
  return builder("ImportNamespaceSpecifier", local);
}
export function importSpecifier(
  local: t.Identifier,
  imported: t.Identifier | t.StringLiteral,
): t.ImportSpecifier {
  return builder("ImportSpecifier", local, imported);
}
export function metaProperty(
  meta: t.Identifier,
  property: t.Identifier,
): t.MetaProperty {
  return builder("MetaProperty", meta, property);
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
  return builder(
    "ClassMethod",
    kind,
    key,
    params,
    body,
    computed,
    _static,
    generator,
    async,
  );
}
export function objectPattern(
  properties: Array<t.RestElement | t.ObjectProperty>,
): t.ObjectPattern {
  return builder("ObjectPattern", properties);
}
export function spreadElement(argument: t.Expression): t.SpreadElement {
  return builder("SpreadElement", argument);
}
function _super(): t.Super {
  return builder("Super");
}
export { _super as super };
export function taggedTemplateExpression(
  tag: t.Expression,
  quasi: t.TemplateLiteral,
): t.TaggedTemplateExpression {
  return builder("TaggedTemplateExpression", tag, quasi);
}
export function templateElement(
  value: { raw: string; cooked?: string },
  tail?: boolean,
): t.TemplateElement {
  return builder("TemplateElement", value, tail);
}
export function templateLiteral(
  quasis: Array<t.TemplateElement>,
  expressions: Array<t.Expression | t.TSType>,
): t.TemplateLiteral {
  return builder("TemplateLiteral", quasis, expressions);
}
export function yieldExpression(
  argument?: t.Expression | null,
  delegate?: boolean,
): t.YieldExpression {
  return builder("YieldExpression", argument, delegate);
}
export function awaitExpression(argument: t.Expression): t.AwaitExpression {
  return builder("AwaitExpression", argument);
}
function _import(): t.Import {
  return builder("Import");
}
export { _import as import };
export function bigIntLiteral(value: string): t.BigIntLiteral {
  return builder("BigIntLiteral", value);
}
export function exportNamespaceSpecifier(
  exported: t.Identifier,
): t.ExportNamespaceSpecifier {
  return builder("ExportNamespaceSpecifier", exported);
}
export function optionalMemberExpression(
  object: t.Expression,
  property: t.Expression | t.Identifier,
  computed: boolean | undefined,
  optional: boolean,
): t.OptionalMemberExpression {
  return builder(
    "OptionalMemberExpression",
    object,
    property,
    computed,
    optional,
  );
}
export function optionalCallExpression(
  callee: t.Expression,
  _arguments: Array<
    t.Expression | t.SpreadElement | t.JSXNamespacedName | t.ArgumentPlaceholder
  >,
  optional: boolean,
): t.OptionalCallExpression {
  return builder("OptionalCallExpression", callee, _arguments, optional);
}
export function anyTypeAnnotation(): t.AnyTypeAnnotation {
  return builder("AnyTypeAnnotation");
}
export function arrayTypeAnnotation(
  elementType: t.FlowType,
): t.ArrayTypeAnnotation {
  return builder("ArrayTypeAnnotation", elementType);
}
export function booleanTypeAnnotation(): t.BooleanTypeAnnotation {
  return builder("BooleanTypeAnnotation");
}
export function booleanLiteralTypeAnnotation(
  value: boolean,
): t.BooleanLiteralTypeAnnotation {
  return builder("BooleanLiteralTypeAnnotation", value);
}
export function nullLiteralTypeAnnotation(): t.NullLiteralTypeAnnotation {
  return builder("NullLiteralTypeAnnotation");
}
export function classImplements(
  id: t.Identifier,
  typeParameters?: t.TypeParameterInstantiation | null,
): t.ClassImplements {
  return builder("ClassImplements", id, typeParameters);
}
export function declareClass(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  _extends: Array<t.InterfaceExtends> | null | undefined,
  body: t.ObjectTypeAnnotation,
): t.DeclareClass {
  return builder("DeclareClass", id, typeParameters, _extends, body);
}
export function declareFunction(id: t.Identifier): t.DeclareFunction {
  return builder("DeclareFunction", id);
}
export function declareInterface(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  _extends: Array<t.InterfaceExtends> | null | undefined,
  body: t.ObjectTypeAnnotation,
): t.DeclareInterface {
  return builder("DeclareInterface", id, typeParameters, _extends, body);
}
export function declareModule(
  id: t.Identifier | t.StringLiteral,
  body: t.BlockStatement,
  kind?: "CommonJS" | "ES" | null,
): t.DeclareModule {
  return builder("DeclareModule", id, body, kind);
}
export function declareModuleExports(
  typeAnnotation: t.TypeAnnotation,
): t.DeclareModuleExports {
  return builder("DeclareModuleExports", typeAnnotation);
}
export function declareTypeAlias(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  right: t.FlowType,
): t.DeclareTypeAlias {
  return builder("DeclareTypeAlias", id, typeParameters, right);
}
export function declareOpaqueType(
  id: t.Identifier,
  typeParameters?: t.TypeParameterDeclaration | null,
  supertype?: t.FlowType | null,
): t.DeclareOpaqueType {
  return builder("DeclareOpaqueType", id, typeParameters, supertype);
}
export function declareVariable(id: t.Identifier): t.DeclareVariable {
  return builder("DeclareVariable", id);
}
export function declareExportDeclaration(
  declaration?: t.Flow | null,
  specifiers?: Array<t.ExportSpecifier | t.ExportNamespaceSpecifier> | null,
  source?: t.StringLiteral | null,
): t.DeclareExportDeclaration {
  return builder("DeclareExportDeclaration", declaration, specifiers, source);
}
export function declareExportAllDeclaration(
  source: t.StringLiteral,
): t.DeclareExportAllDeclaration {
  return builder("DeclareExportAllDeclaration", source);
}
export function declaredPredicate(value: t.Flow): t.DeclaredPredicate {
  return builder("DeclaredPredicate", value);
}
export function existsTypeAnnotation(): t.ExistsTypeAnnotation {
  return builder("ExistsTypeAnnotation");
}
export function functionTypeAnnotation(
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  params: Array<t.FunctionTypeParam>,
  rest: t.FunctionTypeParam | null | undefined,
  returnType: t.FlowType,
): t.FunctionTypeAnnotation {
  return builder(
    "FunctionTypeAnnotation",
    typeParameters,
    params,
    rest,
    returnType,
  );
}
export function functionTypeParam(
  name: t.Identifier | null | undefined,
  typeAnnotation: t.FlowType,
): t.FunctionTypeParam {
  return builder("FunctionTypeParam", name, typeAnnotation);
}
export function genericTypeAnnotation(
  id: t.Identifier | t.QualifiedTypeIdentifier,
  typeParameters?: t.TypeParameterInstantiation | null,
): t.GenericTypeAnnotation {
  return builder("GenericTypeAnnotation", id, typeParameters);
}
export function inferredPredicate(): t.InferredPredicate {
  return builder("InferredPredicate");
}
export function interfaceExtends(
  id: t.Identifier | t.QualifiedTypeIdentifier,
  typeParameters?: t.TypeParameterInstantiation | null,
): t.InterfaceExtends {
  return builder("InterfaceExtends", id, typeParameters);
}
export function interfaceDeclaration(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  _extends: Array<t.InterfaceExtends> | null | undefined,
  body: t.ObjectTypeAnnotation,
): t.InterfaceDeclaration {
  return builder("InterfaceDeclaration", id, typeParameters, _extends, body);
}
export function interfaceTypeAnnotation(
  _extends: Array<t.InterfaceExtends> | null | undefined,
  body: t.ObjectTypeAnnotation,
): t.InterfaceTypeAnnotation {
  return builder("InterfaceTypeAnnotation", _extends, body);
}
export function intersectionTypeAnnotation(
  types: Array<t.FlowType>,
): t.IntersectionTypeAnnotation {
  return builder("IntersectionTypeAnnotation", types);
}
export function mixedTypeAnnotation(): t.MixedTypeAnnotation {
  return builder("MixedTypeAnnotation");
}
export function emptyTypeAnnotation(): t.EmptyTypeAnnotation {
  return builder("EmptyTypeAnnotation");
}
export function nullableTypeAnnotation(
  typeAnnotation: t.FlowType,
): t.NullableTypeAnnotation {
  return builder("NullableTypeAnnotation", typeAnnotation);
}
export function numberLiteralTypeAnnotation(
  value: number,
): t.NumberLiteralTypeAnnotation {
  return builder("NumberLiteralTypeAnnotation", value);
}
export function numberTypeAnnotation(): t.NumberTypeAnnotation {
  return builder("NumberTypeAnnotation");
}
export function objectTypeAnnotation(
  properties: Array<t.ObjectTypeProperty | t.ObjectTypeSpreadProperty>,
  indexers?: Array<t.ObjectTypeIndexer> | null,
  callProperties?: Array<t.ObjectTypeCallProperty> | null,
  internalSlots?: Array<t.ObjectTypeInternalSlot> | null,
  exact?: boolean,
): t.ObjectTypeAnnotation {
  return builder(
    "ObjectTypeAnnotation",
    properties,
    indexers,
    callProperties,
    internalSlots,
    exact,
  );
}
export function objectTypeInternalSlot(
  id: t.Identifier,
  value: t.FlowType,
  optional: boolean,
  _static: boolean,
  method: boolean,
): t.ObjectTypeInternalSlot {
  return builder(
    "ObjectTypeInternalSlot",
    id,
    value,
    optional,
    _static,
    method,
  );
}
export function objectTypeCallProperty(
  value: t.FlowType,
): t.ObjectTypeCallProperty {
  return builder("ObjectTypeCallProperty", value);
}
export function objectTypeIndexer(
  id: t.Identifier | null | undefined,
  key: t.FlowType,
  value: t.FlowType,
  variance?: t.Variance | null,
): t.ObjectTypeIndexer {
  return builder("ObjectTypeIndexer", id, key, value, variance);
}
export function objectTypeProperty(
  key: t.Identifier | t.StringLiteral,
  value: t.FlowType,
  variance?: t.Variance | null,
): t.ObjectTypeProperty {
  return builder("ObjectTypeProperty", key, value, variance);
}
export function objectTypeSpreadProperty(
  argument: t.FlowType,
): t.ObjectTypeSpreadProperty {
  return builder("ObjectTypeSpreadProperty", argument);
}
export function opaqueType(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  supertype: t.FlowType | null | undefined,
  impltype: t.FlowType,
): t.OpaqueType {
  return builder("OpaqueType", id, typeParameters, supertype, impltype);
}
export function qualifiedTypeIdentifier(
  id: t.Identifier,
  qualification: t.Identifier | t.QualifiedTypeIdentifier,
): t.QualifiedTypeIdentifier {
  return builder("QualifiedTypeIdentifier", id, qualification);
}
export function stringLiteralTypeAnnotation(
  value: string,
): t.StringLiteralTypeAnnotation {
  return builder("StringLiteralTypeAnnotation", value);
}
export function stringTypeAnnotation(): t.StringTypeAnnotation {
  return builder("StringTypeAnnotation");
}
export function symbolTypeAnnotation(): t.SymbolTypeAnnotation {
  return builder("SymbolTypeAnnotation");
}
export function thisTypeAnnotation(): t.ThisTypeAnnotation {
  return builder("ThisTypeAnnotation");
}
export function tupleTypeAnnotation(
  types: Array<t.FlowType>,
): t.TupleTypeAnnotation {
  return builder("TupleTypeAnnotation", types);
}
export function typeofTypeAnnotation(
  argument: t.FlowType,
): t.TypeofTypeAnnotation {
  return builder("TypeofTypeAnnotation", argument);
}
export function typeAlias(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined,
  right: t.FlowType,
): t.TypeAlias {
  return builder("TypeAlias", id, typeParameters, right);
}
export function typeAnnotation(typeAnnotation: t.FlowType): t.TypeAnnotation {
  return builder("TypeAnnotation", typeAnnotation);
}
export function typeCastExpression(
  expression: t.Expression,
  typeAnnotation: t.TypeAnnotation,
): t.TypeCastExpression {
  return builder("TypeCastExpression", expression, typeAnnotation);
}
export function typeParameter(
  bound?: t.TypeAnnotation | null,
  _default?: t.FlowType | null,
  variance?: t.Variance | null,
): t.TypeParameter {
  return builder("TypeParameter", bound, _default, variance);
}
export function typeParameterDeclaration(
  params: Array<t.TypeParameter>,
): t.TypeParameterDeclaration {
  return builder("TypeParameterDeclaration", params);
}
export function typeParameterInstantiation(
  params: Array<t.FlowType>,
): t.TypeParameterInstantiation {
  return builder("TypeParameterInstantiation", params);
}
export function unionTypeAnnotation(
  types: Array<t.FlowType>,
): t.UnionTypeAnnotation {
  return builder("UnionTypeAnnotation", types);
}
export function variance(kind: "minus" | "plus"): t.Variance {
  return builder("Variance", kind);
}
export function voidTypeAnnotation(): t.VoidTypeAnnotation {
  return builder("VoidTypeAnnotation");
}
export function enumDeclaration(
  id: t.Identifier,
  body:
    | t.EnumBooleanBody
    | t.EnumNumberBody
    | t.EnumStringBody
    | t.EnumSymbolBody,
): t.EnumDeclaration {
  return builder("EnumDeclaration", id, body);
}
export function enumBooleanBody(
  members: Array<t.EnumBooleanMember>,
): t.EnumBooleanBody {
  return builder("EnumBooleanBody", members);
}
export function enumNumberBody(
  members: Array<t.EnumNumberMember>,
): t.EnumNumberBody {
  return builder("EnumNumberBody", members);
}
export function enumStringBody(
  members: Array<t.EnumStringMember | t.EnumDefaultedMember>,
): t.EnumStringBody {
  return builder("EnumStringBody", members);
}
export function enumSymbolBody(
  members: Array<t.EnumDefaultedMember>,
): t.EnumSymbolBody {
  return builder("EnumSymbolBody", members);
}
export function enumBooleanMember(id: t.Identifier): t.EnumBooleanMember {
  return builder("EnumBooleanMember", id);
}
export function enumNumberMember(
  id: t.Identifier,
  init: t.NumericLiteral,
): t.EnumNumberMember {
  return builder("EnumNumberMember", id, init);
}
export function enumStringMember(
  id: t.Identifier,
  init: t.StringLiteral,
): t.EnumStringMember {
  return builder("EnumStringMember", id, init);
}
export function enumDefaultedMember(id: t.Identifier): t.EnumDefaultedMember {
  return builder("EnumDefaultedMember", id);
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
  return builder("JSXAttribute", name, value);
}
export { jsxAttribute as jSXAttribute };
export function jsxClosingElement(
  name: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName,
): t.JSXClosingElement {
  return builder("JSXClosingElement", name);
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
  return builder(
    "JSXElement",
    openingElement,
    closingElement,
    children,
    selfClosing,
  );
}
export { jsxElement as jSXElement };
export function jsxEmptyExpression(): t.JSXEmptyExpression {
  return builder("JSXEmptyExpression");
}
export { jsxEmptyExpression as jSXEmptyExpression };
export function jsxExpressionContainer(
  expression: t.Expression | t.JSXEmptyExpression,
): t.JSXExpressionContainer {
  return builder("JSXExpressionContainer", expression);
}
export { jsxExpressionContainer as jSXExpressionContainer };
export function jsxSpreadChild(expression: t.Expression): t.JSXSpreadChild {
  return builder("JSXSpreadChild", expression);
}
export { jsxSpreadChild as jSXSpreadChild };
export function jsxIdentifier(name: string): t.JSXIdentifier {
  return builder("JSXIdentifier", name);
}
export { jsxIdentifier as jSXIdentifier };
export function jsxMemberExpression(
  object: t.JSXMemberExpression | t.JSXIdentifier,
  property: t.JSXIdentifier,
): t.JSXMemberExpression {
  return builder("JSXMemberExpression", object, property);
}
export { jsxMemberExpression as jSXMemberExpression };
export function jsxNamespacedName(
  namespace: t.JSXIdentifier,
  name: t.JSXIdentifier,
): t.JSXNamespacedName {
  return builder("JSXNamespacedName", namespace, name);
}
export { jsxNamespacedName as jSXNamespacedName };
export function jsxOpeningElement(
  name: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName,
  attributes: Array<t.JSXAttribute | t.JSXSpreadAttribute>,
  selfClosing?: boolean,
): t.JSXOpeningElement {
  return builder("JSXOpeningElement", name, attributes, selfClosing);
}
export { jsxOpeningElement as jSXOpeningElement };
export function jsxSpreadAttribute(
  argument: t.Expression,
): t.JSXSpreadAttribute {
  return builder("JSXSpreadAttribute", argument);
}
export { jsxSpreadAttribute as jSXSpreadAttribute };
export function jsxText(value: string): t.JSXText {
  return builder("JSXText", value);
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
  return builder("JSXFragment", openingFragment, closingFragment, children);
}
export { jsxFragment as jSXFragment };
export function jsxOpeningFragment(): t.JSXOpeningFragment {
  return builder("JSXOpeningFragment");
}
export { jsxOpeningFragment as jSXOpeningFragment };
export function jsxClosingFragment(): t.JSXClosingFragment {
  return builder("JSXClosingFragment");
}
export { jsxClosingFragment as jSXClosingFragment };
export function noop(): t.Noop {
  return builder("Noop");
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
  return builder("Placeholder", expectedNode, name);
}
export function v8IntrinsicIdentifier(name: string): t.V8IntrinsicIdentifier {
  return builder("V8IntrinsicIdentifier", name);
}
export function argumentPlaceholder(): t.ArgumentPlaceholder {
  return builder("ArgumentPlaceholder");
}
export function bindExpression(
  object: t.Expression,
  callee: t.Expression,
): t.BindExpression {
  return builder("BindExpression", object, callee);
}
export function classProperty(
  key: t.Identifier | t.StringLiteral | t.NumericLiteral | t.Expression,
  value?: t.Expression | null,
  typeAnnotation?: t.TypeAnnotation | t.TSTypeAnnotation | t.Noop | null,
  decorators?: Array<t.Decorator> | null,
  computed?: boolean,
  _static?: boolean,
): t.ClassProperty {
  return builder(
    "ClassProperty",
    key,
    value,
    typeAnnotation,
    decorators,
    computed,
    _static,
  );
}
export function pipelineTopicExpression(
  expression: t.Expression,
): t.PipelineTopicExpression {
  return builder("PipelineTopicExpression", expression);
}
export function pipelineBareFunction(
  callee: t.Expression,
): t.PipelineBareFunction {
  return builder("PipelineBareFunction", callee);
}
export function pipelinePrimaryTopicReference(): t.PipelinePrimaryTopicReference {
  return builder("PipelinePrimaryTopicReference");
}
export function classPrivateProperty(
  key: t.PrivateName,
  value: t.Expression | null | undefined,
  decorators: Array<t.Decorator> | null | undefined,
  _static: any,
): t.ClassPrivateProperty {
  return builder("ClassPrivateProperty", key, value, decorators, _static);
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
  return builder("ClassPrivateMethod", kind, key, params, body, _static);
}
export function importAttribute(
  key: t.Identifier | t.StringLiteral,
  value: t.StringLiteral,
): t.ImportAttribute {
  return builder("ImportAttribute", key, value);
}
export function decorator(expression: t.Expression): t.Decorator {
  return builder("Decorator", expression);
}
export function doExpression(body: t.BlockStatement): t.DoExpression {
  return builder("DoExpression", body);
}
export function exportDefaultSpecifier(
  exported: t.Identifier,
): t.ExportDefaultSpecifier {
  return builder("ExportDefaultSpecifier", exported);
}
export function privateName(id: t.Identifier): t.PrivateName {
  return builder("PrivateName", id);
}
export function recordExpression(
  properties: Array<t.ObjectProperty | t.SpreadElement>,
): t.RecordExpression {
  return builder("RecordExpression", properties);
}
export function tupleExpression(
  elements?: Array<t.Expression | t.SpreadElement>,
): t.TupleExpression {
  return builder("TupleExpression", elements);
}
export function decimalLiteral(value: string): t.DecimalLiteral {
  return builder("DecimalLiteral", value);
}
export function staticBlock(body: Array<t.Statement>): t.StaticBlock {
  return builder("StaticBlock", body);
}
export function tsParameterProperty(
  parameter: t.Identifier | t.AssignmentPattern,
): t.TSParameterProperty {
  return builder("TSParameterProperty", parameter);
}
export { tsParameterProperty as tSParameterProperty };
export function tsDeclareFunction(
  id: t.Identifier | null | undefined,
  typeParameters: t.TSTypeParameterDeclaration | t.Noop | null | undefined,
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  returnType?: t.TSTypeAnnotation | t.Noop | null,
): t.TSDeclareFunction {
  return builder("TSDeclareFunction", id, typeParameters, params, returnType);
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
  return builder(
    "TSDeclareMethod",
    decorators,
    key,
    typeParameters,
    params,
    returnType,
  );
}
export { tsDeclareMethod as tSDeclareMethod };
export function tsQualifiedName(
  left: t.TSEntityName,
  right: t.Identifier,
): t.TSQualifiedName {
  return builder("TSQualifiedName", left, right);
}
export { tsQualifiedName as tSQualifiedName };
export function tsCallSignatureDeclaration(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation?: t.TSTypeAnnotation | null,
): t.TSCallSignatureDeclaration {
  return builder(
    "TSCallSignatureDeclaration",
    typeParameters,
    parameters,
    typeAnnotation,
  );
}
export { tsCallSignatureDeclaration as tSCallSignatureDeclaration };
export function tsConstructSignatureDeclaration(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation?: t.TSTypeAnnotation | null,
): t.TSConstructSignatureDeclaration {
  return builder(
    "TSConstructSignatureDeclaration",
    typeParameters,
    parameters,
    typeAnnotation,
  );
}
export { tsConstructSignatureDeclaration as tSConstructSignatureDeclaration };
export function tsPropertySignature(
  key: t.Expression,
  typeAnnotation?: t.TSTypeAnnotation | null,
  initializer?: t.Expression | null,
): t.TSPropertySignature {
  return builder("TSPropertySignature", key, typeAnnotation, initializer);
}
export { tsPropertySignature as tSPropertySignature };
export function tsMethodSignature(
  key: t.Expression,
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation?: t.TSTypeAnnotation | null,
): t.TSMethodSignature {
  return builder(
    "TSMethodSignature",
    key,
    typeParameters,
    parameters,
    typeAnnotation,
  );
}
export { tsMethodSignature as tSMethodSignature };
export function tsIndexSignature(
  parameters: Array<t.Identifier>,
  typeAnnotation?: t.TSTypeAnnotation | null,
): t.TSIndexSignature {
  return builder("TSIndexSignature", parameters, typeAnnotation);
}
export { tsIndexSignature as tSIndexSignature };
export function tsAnyKeyword(): t.TSAnyKeyword {
  return builder("TSAnyKeyword");
}
export { tsAnyKeyword as tSAnyKeyword };
export function tsBooleanKeyword(): t.TSBooleanKeyword {
  return builder("TSBooleanKeyword");
}
export { tsBooleanKeyword as tSBooleanKeyword };
export function tsBigIntKeyword(): t.TSBigIntKeyword {
  return builder("TSBigIntKeyword");
}
export { tsBigIntKeyword as tSBigIntKeyword };
export function tsIntrinsicKeyword(): t.TSIntrinsicKeyword {
  return builder("TSIntrinsicKeyword");
}
export { tsIntrinsicKeyword as tSIntrinsicKeyword };
export function tsNeverKeyword(): t.TSNeverKeyword {
  return builder("TSNeverKeyword");
}
export { tsNeverKeyword as tSNeverKeyword };
export function tsNullKeyword(): t.TSNullKeyword {
  return builder("TSNullKeyword");
}
export { tsNullKeyword as tSNullKeyword };
export function tsNumberKeyword(): t.TSNumberKeyword {
  return builder("TSNumberKeyword");
}
export { tsNumberKeyword as tSNumberKeyword };
export function tsObjectKeyword(): t.TSObjectKeyword {
  return builder("TSObjectKeyword");
}
export { tsObjectKeyword as tSObjectKeyword };
export function tsStringKeyword(): t.TSStringKeyword {
  return builder("TSStringKeyword");
}
export { tsStringKeyword as tSStringKeyword };
export function tsSymbolKeyword(): t.TSSymbolKeyword {
  return builder("TSSymbolKeyword");
}
export { tsSymbolKeyword as tSSymbolKeyword };
export function tsUndefinedKeyword(): t.TSUndefinedKeyword {
  return builder("TSUndefinedKeyword");
}
export { tsUndefinedKeyword as tSUndefinedKeyword };
export function tsUnknownKeyword(): t.TSUnknownKeyword {
  return builder("TSUnknownKeyword");
}
export { tsUnknownKeyword as tSUnknownKeyword };
export function tsVoidKeyword(): t.TSVoidKeyword {
  return builder("TSVoidKeyword");
}
export { tsVoidKeyword as tSVoidKeyword };
export function tsThisType(): t.TSThisType {
  return builder("TSThisType");
}
export { tsThisType as tSThisType };
export function tsFunctionType(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation?: t.TSTypeAnnotation | null,
): t.TSFunctionType {
  return builder("TSFunctionType", typeParameters, parameters, typeAnnotation);
}
export { tsFunctionType as tSFunctionType };
export function tsConstructorType(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<t.Identifier | t.RestElement>,
  typeAnnotation?: t.TSTypeAnnotation | null,
): t.TSConstructorType {
  return builder(
    "TSConstructorType",
    typeParameters,
    parameters,
    typeAnnotation,
  );
}
export { tsConstructorType as tSConstructorType };
export function tsTypeReference(
  typeName: t.TSEntityName,
  typeParameters?: t.TSTypeParameterInstantiation | null,
): t.TSTypeReference {
  return builder("TSTypeReference", typeName, typeParameters);
}
export { tsTypeReference as tSTypeReference };
export function tsTypePredicate(
  parameterName: t.Identifier | t.TSThisType,
  typeAnnotation?: t.TSTypeAnnotation | null,
  asserts?: boolean | null,
): t.TSTypePredicate {
  return builder("TSTypePredicate", parameterName, typeAnnotation, asserts);
}
export { tsTypePredicate as tSTypePredicate };
export function tsTypeQuery(
  exprName: t.TSEntityName | t.TSImportType,
): t.TSTypeQuery {
  return builder("TSTypeQuery", exprName);
}
export { tsTypeQuery as tSTypeQuery };
export function tsTypeLiteral(
  members: Array<t.TSTypeElement>,
): t.TSTypeLiteral {
  return builder("TSTypeLiteral", members);
}
export { tsTypeLiteral as tSTypeLiteral };
export function tsArrayType(elementType: t.TSType): t.TSArrayType {
  return builder("TSArrayType", elementType);
}
export { tsArrayType as tSArrayType };
export function tsTupleType(
  elementTypes: Array<t.TSType | t.TSNamedTupleMember>,
): t.TSTupleType {
  return builder("TSTupleType", elementTypes);
}
export { tsTupleType as tSTupleType };
export function tsOptionalType(typeAnnotation: t.TSType): t.TSOptionalType {
  return builder("TSOptionalType", typeAnnotation);
}
export { tsOptionalType as tSOptionalType };
export function tsRestType(typeAnnotation: t.TSType): t.TSRestType {
  return builder("TSRestType", typeAnnotation);
}
export { tsRestType as tSRestType };
export function tsNamedTupleMember(
  label: t.Identifier,
  elementType: t.TSType,
  optional?: boolean,
): t.TSNamedTupleMember {
  return builder("TSNamedTupleMember", label, elementType, optional);
}
export { tsNamedTupleMember as tSNamedTupleMember };
export function tsUnionType(types: Array<t.TSType>): t.TSUnionType {
  return builder("TSUnionType", types);
}
export { tsUnionType as tSUnionType };
export function tsIntersectionType(
  types: Array<t.TSType>,
): t.TSIntersectionType {
  return builder("TSIntersectionType", types);
}
export { tsIntersectionType as tSIntersectionType };
export function tsConditionalType(
  checkType: t.TSType,
  extendsType: t.TSType,
  trueType: t.TSType,
  falseType: t.TSType,
): t.TSConditionalType {
  return builder(
    "TSConditionalType",
    checkType,
    extendsType,
    trueType,
    falseType,
  );
}
export { tsConditionalType as tSConditionalType };
export function tsInferType(typeParameter: t.TSTypeParameter): t.TSInferType {
  return builder("TSInferType", typeParameter);
}
export { tsInferType as tSInferType };
export function tsParenthesizedType(
  typeAnnotation: t.TSType,
): t.TSParenthesizedType {
  return builder("TSParenthesizedType", typeAnnotation);
}
export { tsParenthesizedType as tSParenthesizedType };
export function tsTypeOperator(typeAnnotation: t.TSType): t.TSTypeOperator {
  return builder("TSTypeOperator", typeAnnotation);
}
export { tsTypeOperator as tSTypeOperator };
export function tsIndexedAccessType(
  objectType: t.TSType,
  indexType: t.TSType,
): t.TSIndexedAccessType {
  return builder("TSIndexedAccessType", objectType, indexType);
}
export { tsIndexedAccessType as tSIndexedAccessType };
export function tsMappedType(
  typeParameter: t.TSTypeParameter,
  typeAnnotation?: t.TSType | null,
  nameType?: t.TSType | null,
): t.TSMappedType {
  return builder("TSMappedType", typeParameter, typeAnnotation, nameType);
}
export { tsMappedType as tSMappedType };
export function tsLiteralType(
  literal:
    | t.NumericLiteral
    | t.StringLiteral
    | t.BooleanLiteral
    | t.BigIntLiteral,
): t.TSLiteralType {
  return builder("TSLiteralType", literal);
}
export { tsLiteralType as tSLiteralType };
export function tsExpressionWithTypeArguments(
  expression: t.TSEntityName,
  typeParameters?: t.TSTypeParameterInstantiation | null,
): t.TSExpressionWithTypeArguments {
  return builder("TSExpressionWithTypeArguments", expression, typeParameters);
}
export { tsExpressionWithTypeArguments as tSExpressionWithTypeArguments };
export function tsInterfaceDeclaration(
  id: t.Identifier,
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  _extends: Array<t.TSExpressionWithTypeArguments> | null | undefined,
  body: t.TSInterfaceBody,
): t.TSInterfaceDeclaration {
  return builder("TSInterfaceDeclaration", id, typeParameters, _extends, body);
}
export { tsInterfaceDeclaration as tSInterfaceDeclaration };
export function tsInterfaceBody(
  body: Array<t.TSTypeElement>,
): t.TSInterfaceBody {
  return builder("TSInterfaceBody", body);
}
export { tsInterfaceBody as tSInterfaceBody };
export function tsTypeAliasDeclaration(
  id: t.Identifier,
  typeParameters: t.TSTypeParameterDeclaration | null | undefined,
  typeAnnotation: t.TSType,
): t.TSTypeAliasDeclaration {
  return builder("TSTypeAliasDeclaration", id, typeParameters, typeAnnotation);
}
export { tsTypeAliasDeclaration as tSTypeAliasDeclaration };
export function tsAsExpression(
  expression: t.Expression,
  typeAnnotation: t.TSType,
): t.TSAsExpression {
  return builder("TSAsExpression", expression, typeAnnotation);
}
export { tsAsExpression as tSAsExpression };
export function tsTypeAssertion(
  typeAnnotation: t.TSType,
  expression: t.Expression,
): t.TSTypeAssertion {
  return builder("TSTypeAssertion", typeAnnotation, expression);
}
export { tsTypeAssertion as tSTypeAssertion };
export function tsEnumDeclaration(
  id: t.Identifier,
  members: Array<t.TSEnumMember>,
): t.TSEnumDeclaration {
  return builder("TSEnumDeclaration", id, members);
}
export { tsEnumDeclaration as tSEnumDeclaration };
export function tsEnumMember(
  id: t.Identifier | t.StringLiteral,
  initializer?: t.Expression | null,
): t.TSEnumMember {
  return builder("TSEnumMember", id, initializer);
}
export { tsEnumMember as tSEnumMember };
export function tsModuleDeclaration(
  id: t.Identifier | t.StringLiteral,
  body: t.TSModuleBlock | t.TSModuleDeclaration,
): t.TSModuleDeclaration {
  return builder("TSModuleDeclaration", id, body);
}
export { tsModuleDeclaration as tSModuleDeclaration };
export function tsModuleBlock(body: Array<t.Statement>): t.TSModuleBlock {
  return builder("TSModuleBlock", body);
}
export { tsModuleBlock as tSModuleBlock };
export function tsImportType(
  argument: t.StringLiteral,
  qualifier?: t.TSEntityName | null,
  typeParameters?: t.TSTypeParameterInstantiation | null,
): t.TSImportType {
  return builder("TSImportType", argument, qualifier, typeParameters);
}
export { tsImportType as tSImportType };
export function tsImportEqualsDeclaration(
  id: t.Identifier,
  moduleReference: t.TSEntityName | t.TSExternalModuleReference,
): t.TSImportEqualsDeclaration {
  return builder("TSImportEqualsDeclaration", id, moduleReference);
}
export { tsImportEqualsDeclaration as tSImportEqualsDeclaration };
export function tsExternalModuleReference(
  expression: t.StringLiteral,
): t.TSExternalModuleReference {
  return builder("TSExternalModuleReference", expression);
}
export { tsExternalModuleReference as tSExternalModuleReference };
export function tsNonNullExpression(
  expression: t.Expression,
): t.TSNonNullExpression {
  return builder("TSNonNullExpression", expression);
}
export { tsNonNullExpression as tSNonNullExpression };
export function tsExportAssignment(
  expression: t.Expression,
): t.TSExportAssignment {
  return builder("TSExportAssignment", expression);
}
export { tsExportAssignment as tSExportAssignment };
export function tsNamespaceExportDeclaration(
  id: t.Identifier,
): t.TSNamespaceExportDeclaration {
  return builder("TSNamespaceExportDeclaration", id);
}
export { tsNamespaceExportDeclaration as tSNamespaceExportDeclaration };
export function tsTypeAnnotation(typeAnnotation: t.TSType): t.TSTypeAnnotation {
  return builder("TSTypeAnnotation", typeAnnotation);
}
export { tsTypeAnnotation as tSTypeAnnotation };
export function tsTypeParameterInstantiation(
  params: Array<t.TSType>,
): t.TSTypeParameterInstantiation {
  return builder("TSTypeParameterInstantiation", params);
}
export { tsTypeParameterInstantiation as tSTypeParameterInstantiation };
export function tsTypeParameterDeclaration(
  params: Array<t.TSTypeParameter>,
): t.TSTypeParameterDeclaration {
  return builder("TSTypeParameterDeclaration", params);
}
export { tsTypeParameterDeclaration as tSTypeParameterDeclaration };
export function tsTypeParameter(
  constraint: t.TSType | null | undefined,
  _default: t.TSType | null | undefined,
  name: string,
): t.TSTypeParameter {
  return builder("TSTypeParameter", constraint, _default, name);
}
export { tsTypeParameter as tSTypeParameter };
/** @deprecated */
function NumberLiteral(...args: Array<any>): any {
  console.trace(
    "The node type NumberLiteral has been renamed to NumericLiteral",
  );
  return builder("NumberLiteral", ...args);
}
export { NumberLiteral as numberLiteral };
/** @deprecated */
function RegexLiteral(...args: Array<any>): any {
  console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
  return builder("RegexLiteral", ...args);
}
export { RegexLiteral as regexLiteral };
/** @deprecated */
function RestProperty(...args: Array<any>): any {
  console.trace("The node type RestProperty has been renamed to RestElement");
  return builder("RestProperty", ...args);
}
export { RestProperty as restProperty };
/** @deprecated */
function SpreadProperty(...args: Array<any>): any {
  console.trace(
    "The node type SpreadProperty has been renamed to SpreadElement",
  );
  return builder("SpreadProperty", ...args);
}
export { SpreadProperty as spreadProperty };
