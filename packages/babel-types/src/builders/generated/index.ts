/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import builder from "../builder";
import type * as types from "../../types";

export function arrayExpression(
  elements?: Array<null | types.Expression | types.SpreadElement>,
): types.ArrayExpression {
  return builder("ArrayExpression", elements);
}
export { arrayExpression as ArrayExpression };
export function assignmentExpression(
  operator: string,
  left: types.LVal,
  right: types.Expression,
): types.AssignmentExpression {
  return builder("AssignmentExpression", operator, left, right);
}
export { assignmentExpression as AssignmentExpression };
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
  left: types.Expression | types.PrivateName,
  right: types.Expression,
): types.BinaryExpression {
  return builder("BinaryExpression", operator, left, right);
}
export { binaryExpression as BinaryExpression };
export function interpreterDirective(
  value: string,
): types.InterpreterDirective {
  return builder("InterpreterDirective", value);
}
export { interpreterDirective as InterpreterDirective };
export function directive(value: types.DirectiveLiteral): types.Directive {
  return builder("Directive", value);
}
export { directive as Directive };
export function directiveLiteral(value: string): types.DirectiveLiteral {
  return builder("DirectiveLiteral", value);
}
export { directiveLiteral as DirectiveLiteral };
export function blockStatement(
  body: Array<types.Statement>,
  directives?: Array<types.Directive>,
): types.BlockStatement {
  return builder("BlockStatement", body, directives);
}
export { blockStatement as BlockStatement };
export function breakStatement(
  label?: types.Identifier | null,
): types.BreakStatement {
  return builder("BreakStatement", label);
}
export { breakStatement as BreakStatement };
export function callExpression(
  callee: types.Expression | types.V8IntrinsicIdentifier,
  _arguments: Array<
    | types.Expression
    | types.SpreadElement
    | types.JSXNamespacedName
    | types.ArgumentPlaceholder
  >,
): types.CallExpression {
  return builder("CallExpression", callee, _arguments);
}
export { callExpression as CallExpression };
export function catchClause(
  param:
    | types.Identifier
    | types.ArrayPattern
    | types.ObjectPattern
    | null
    | undefined,
  body: types.BlockStatement,
): types.CatchClause {
  return builder("CatchClause", param, body);
}
export { catchClause as CatchClause };
export function conditionalExpression(
  test: types.Expression,
  consequent: types.Expression,
  alternate: types.Expression,
): types.ConditionalExpression {
  return builder("ConditionalExpression", test, consequent, alternate);
}
export { conditionalExpression as ConditionalExpression };
export function continueStatement(
  label?: types.Identifier | null,
): types.ContinueStatement {
  return builder("ContinueStatement", label);
}
export { continueStatement as ContinueStatement };
export function debuggerStatement(): types.DebuggerStatement {
  return builder("DebuggerStatement");
}
export { debuggerStatement as DebuggerStatement };
export function doWhileStatement(
  test: types.Expression,
  body: types.Statement,
): types.DoWhileStatement {
  return builder("DoWhileStatement", test, body);
}
export { doWhileStatement as DoWhileStatement };
export function emptyStatement(): types.EmptyStatement {
  return builder("EmptyStatement");
}
export { emptyStatement as EmptyStatement };
export function expressionStatement(
  expression: types.Expression,
): types.ExpressionStatement {
  return builder("ExpressionStatement", expression);
}
export { expressionStatement as ExpressionStatement };
export function file(
  program: types.Program,
  comments?: Array<types.CommentBlock | types.CommentLine> | null,
  tokens?: Array<any> | null,
): types.File {
  return builder("File", program, comments, tokens);
}
export { file as File };
export function forInStatement(
  left: types.VariableDeclaration | types.LVal,
  right: types.Expression,
  body: types.Statement,
): types.ForInStatement {
  return builder("ForInStatement", left, right, body);
}
export { forInStatement as ForInStatement };
export function forStatement(
  init: types.VariableDeclaration | types.Expression | null | undefined,
  test: types.Expression | null | undefined,
  update: types.Expression | null | undefined,
  body: types.Statement,
): types.ForStatement {
  return builder("ForStatement", init, test, update, body);
}
export { forStatement as ForStatement };
export function functionDeclaration(
  id: types.Identifier | null | undefined,
  params: Array<
    | types.Identifier
    | types.Pattern
    | types.RestElement
    | types.TSParameterProperty
  >,
  body: types.BlockStatement,
  generator?: boolean,
  async?: boolean,
): types.FunctionDeclaration {
  return builder("FunctionDeclaration", id, params, body, generator, async);
}
export { functionDeclaration as FunctionDeclaration };
export function functionExpression(
  id: types.Identifier | null | undefined,
  params: Array<
    | types.Identifier
    | types.Pattern
    | types.RestElement
    | types.TSParameterProperty
  >,
  body: types.BlockStatement,
  generator?: boolean,
  async?: boolean,
): types.FunctionExpression {
  return builder("FunctionExpression", id, params, body, generator, async);
}
export { functionExpression as FunctionExpression };
export function identifier(name: string): types.Identifier {
  return builder("Identifier", name);
}
export { identifier as Identifier };
export function ifStatement(
  test: types.Expression,
  consequent: types.Statement,
  alternate?: types.Statement | null,
): types.IfStatement {
  return builder("IfStatement", test, consequent, alternate);
}
export { ifStatement as IfStatement };
export function labeledStatement(
  label: types.Identifier,
  body: types.Statement,
): types.LabeledStatement {
  return builder("LabeledStatement", label, body);
}
export { labeledStatement as LabeledStatement };
export function stringLiteral(value: string): types.StringLiteral {
  return builder("StringLiteral", value);
}
export { stringLiteral as StringLiteral };
export function numericLiteral(value: number): types.NumericLiteral {
  return builder("NumericLiteral", value);
}
export { numericLiteral as NumericLiteral };
export function nullLiteral(): types.NullLiteral {
  return builder("NullLiteral");
}
export { nullLiteral as NullLiteral };
export function booleanLiteral(value: boolean): types.BooleanLiteral {
  return builder("BooleanLiteral", value);
}
export { booleanLiteral as BooleanLiteral };
export function regExpLiteral(
  pattern: string,
  flags?: string,
): types.RegExpLiteral {
  return builder("RegExpLiteral", pattern, flags);
}
export { regExpLiteral as RegExpLiteral };
export function logicalExpression(
  operator: "||" | "&&" | "??",
  left: types.Expression,
  right: types.Expression,
): types.LogicalExpression {
  return builder("LogicalExpression", operator, left, right);
}
export { logicalExpression as LogicalExpression };
export function memberExpression(
  object: types.Expression,
  property: types.Expression | types.Identifier | types.PrivateName,
  computed?: boolean,
  optional?: true | false | null,
): types.MemberExpression {
  return builder("MemberExpression", object, property, computed, optional);
}
export { memberExpression as MemberExpression };
export function newExpression(
  callee: types.Expression | types.V8IntrinsicIdentifier,
  _arguments: Array<
    | types.Expression
    | types.SpreadElement
    | types.JSXNamespacedName
    | types.ArgumentPlaceholder
  >,
): types.NewExpression {
  return builder("NewExpression", callee, _arguments);
}
export { newExpression as NewExpression };
export function program(
  body: Array<types.Statement>,
  directives?: Array<types.Directive>,
  sourceType?: "script" | "module",
  interpreter?: types.InterpreterDirective | null,
): types.Program {
  return builder("Program", body, directives, sourceType, interpreter);
}
export { program as Program };
export function objectExpression(
  properties: Array<
    types.ObjectMethod | types.ObjectProperty | types.SpreadElement
  >,
): types.ObjectExpression {
  return builder("ObjectExpression", properties);
}
export { objectExpression as ObjectExpression };
export function objectMethod(
  kind: "method" | "get" | "set" | undefined,
  key:
    | types.Expression
    | types.Identifier
    | types.StringLiteral
    | types.NumericLiteral,
  params: Array<
    | types.Identifier
    | types.Pattern
    | types.RestElement
    | types.TSParameterProperty
  >,
  body: types.BlockStatement,
  computed?: boolean,
  generator?: boolean,
  async?: boolean,
): types.ObjectMethod {
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
export { objectMethod as ObjectMethod };
export function objectProperty(
  key:
    | types.Expression
    | types.Identifier
    | types.StringLiteral
    | types.NumericLiteral,
  value: types.Expression | types.PatternLike,
  computed?: boolean,
  shorthand?: boolean,
  decorators?: Array<types.Decorator> | null,
): types.ObjectProperty {
  return builder("ObjectProperty", key, value, computed, shorthand, decorators);
}
export { objectProperty as ObjectProperty };
export function restElement(argument: types.LVal): types.RestElement {
  return builder("RestElement", argument);
}
export { restElement as RestElement };
export function returnStatement(
  argument?: types.Expression | null,
): types.ReturnStatement {
  return builder("ReturnStatement", argument);
}
export { returnStatement as ReturnStatement };
export function sequenceExpression(
  expressions: Array<types.Expression>,
): types.SequenceExpression {
  return builder("SequenceExpression", expressions);
}
export { sequenceExpression as SequenceExpression };
export function parenthesizedExpression(
  expression: types.Expression,
): types.ParenthesizedExpression {
  return builder("ParenthesizedExpression", expression);
}
export { parenthesizedExpression as ParenthesizedExpression };
export function switchCase(
  test: types.Expression | null | undefined,
  consequent: Array<types.Statement>,
): types.SwitchCase {
  return builder("SwitchCase", test, consequent);
}
export { switchCase as SwitchCase };
export function switchStatement(
  discriminant: types.Expression,
  cases: Array<types.SwitchCase>,
): types.SwitchStatement {
  return builder("SwitchStatement", discriminant, cases);
}
export { switchStatement as SwitchStatement };
export function thisExpression(): types.ThisExpression {
  return builder("ThisExpression");
}
export { thisExpression as ThisExpression };
export function throwStatement(
  argument: types.Expression,
): types.ThrowStatement {
  return builder("ThrowStatement", argument);
}
export { throwStatement as ThrowStatement };
export function tryStatement(
  block: types.BlockStatement,
  handler?: types.CatchClause | null,
  finalizer?: types.BlockStatement | null,
): types.TryStatement {
  return builder("TryStatement", block, handler, finalizer);
}
export { tryStatement as TryStatement };
export function unaryExpression(
  operator: "void" | "throw" | "delete" | "!" | "+" | "-" | "~" | "typeof",
  argument: types.Expression,
  prefix?: boolean,
): types.UnaryExpression {
  return builder("UnaryExpression", operator, argument, prefix);
}
export { unaryExpression as UnaryExpression };
export function updateExpression(
  operator: "++" | "--",
  argument: types.Expression,
  prefix?: boolean,
): types.UpdateExpression {
  return builder("UpdateExpression", operator, argument, prefix);
}
export { updateExpression as UpdateExpression };
export function variableDeclaration(
  kind: "var" | "let" | "const",
  declarations: Array<types.VariableDeclarator>,
): types.VariableDeclaration {
  return builder("VariableDeclaration", kind, declarations);
}
export { variableDeclaration as VariableDeclaration };
export function variableDeclarator(
  id: types.LVal,
  init?: types.Expression | null,
): types.VariableDeclarator {
  return builder("VariableDeclarator", id, init);
}
export { variableDeclarator as VariableDeclarator };
export function whileStatement(
  test: types.Expression,
  body: types.Statement,
): types.WhileStatement {
  return builder("WhileStatement", test, body);
}
export { whileStatement as WhileStatement };
export function withStatement(
  object: types.Expression,
  body: types.Statement,
): types.WithStatement {
  return builder("WithStatement", object, body);
}
export { withStatement as WithStatement };
export function assignmentPattern(
  left:
    | types.Identifier
    | types.ObjectPattern
    | types.ArrayPattern
    | types.MemberExpression,
  right: types.Expression,
): types.AssignmentPattern {
  return builder("AssignmentPattern", left, right);
}
export { assignmentPattern as AssignmentPattern };
export function arrayPattern(
  elements: Array<null | types.PatternLike>,
): types.ArrayPattern {
  return builder("ArrayPattern", elements);
}
export { arrayPattern as ArrayPattern };
export function arrowFunctionExpression(
  params: Array<
    | types.Identifier
    | types.Pattern
    | types.RestElement
    | types.TSParameterProperty
  >,
  body: types.BlockStatement | types.Expression,
  async?: boolean,
): types.ArrowFunctionExpression {
  return builder("ArrowFunctionExpression", params, body, async);
}
export { arrowFunctionExpression as ArrowFunctionExpression };
export function classBody(
  body: Array<
    | types.ClassMethod
    | types.ClassPrivateMethod
    | types.ClassProperty
    | types.ClassPrivateProperty
    | types.TSDeclareMethod
    | types.TSIndexSignature
  >,
): types.ClassBody {
  return builder("ClassBody", body);
}
export { classBody as ClassBody };
export function classExpression(
  id: types.Identifier | null | undefined,
  superClass: types.Expression | null | undefined,
  body: types.ClassBody,
  decorators?: Array<types.Decorator> | null,
): types.ClassExpression {
  return builder("ClassExpression", id, superClass, body, decorators);
}
export { classExpression as ClassExpression };
export function classDeclaration(
  id: types.Identifier,
  superClass: types.Expression | null | undefined,
  body: types.ClassBody,
  decorators?: Array<types.Decorator> | null,
): types.ClassDeclaration {
  return builder("ClassDeclaration", id, superClass, body, decorators);
}
export { classDeclaration as ClassDeclaration };
export function exportAllDeclaration(
  source: types.StringLiteral,
): types.ExportAllDeclaration {
  return builder("ExportAllDeclaration", source);
}
export { exportAllDeclaration as ExportAllDeclaration };
export function exportDefaultDeclaration(
  declaration:
    | types.FunctionDeclaration
    | types.TSDeclareFunction
    | types.ClassDeclaration
    | types.Expression,
): types.ExportDefaultDeclaration {
  return builder("ExportDefaultDeclaration", declaration);
}
export { exportDefaultDeclaration as ExportDefaultDeclaration };
export function exportNamedDeclaration(
  declaration?: types.Declaration | null,
  specifiers?: Array<
    | types.ExportSpecifier
    | types.ExportDefaultSpecifier
    | types.ExportNamespaceSpecifier
  >,
  source?: types.StringLiteral | null,
): types.ExportNamedDeclaration {
  return builder("ExportNamedDeclaration", declaration, specifiers, source);
}
export { exportNamedDeclaration as ExportNamedDeclaration };
export function exportSpecifier(
  local: types.Identifier,
  exported: types.Identifier | types.StringLiteral,
): types.ExportSpecifier {
  return builder("ExportSpecifier", local, exported);
}
export { exportSpecifier as ExportSpecifier };
export function forOfStatement(
  left: types.VariableDeclaration | types.LVal,
  right: types.Expression,
  body: types.Statement,
  _await?: boolean,
): types.ForOfStatement {
  return builder("ForOfStatement", left, right, body, _await);
}
export { forOfStatement as ForOfStatement };
export function importDeclaration(
  specifiers: Array<
    | types.ImportSpecifier
    | types.ImportDefaultSpecifier
    | types.ImportNamespaceSpecifier
  >,
  source: types.StringLiteral,
): types.ImportDeclaration {
  return builder("ImportDeclaration", specifiers, source);
}
export { importDeclaration as ImportDeclaration };
export function importDefaultSpecifier(
  local: types.Identifier,
): types.ImportDefaultSpecifier {
  return builder("ImportDefaultSpecifier", local);
}
export { importDefaultSpecifier as ImportDefaultSpecifier };
export function importNamespaceSpecifier(
  local: types.Identifier,
): types.ImportNamespaceSpecifier {
  return builder("ImportNamespaceSpecifier", local);
}
export { importNamespaceSpecifier as ImportNamespaceSpecifier };
export function importSpecifier(
  local: types.Identifier,
  imported: types.Identifier | types.StringLiteral,
): types.ImportSpecifier {
  return builder("ImportSpecifier", local, imported);
}
export { importSpecifier as ImportSpecifier };
export function metaProperty(
  meta: types.Identifier,
  property: types.Identifier,
): types.MetaProperty {
  return builder("MetaProperty", meta, property);
}
export { metaProperty as MetaProperty };
export function classMethod(
  kind: "get" | "set" | "method" | "constructor" | undefined,
  key:
    | types.Identifier
    | types.StringLiteral
    | types.NumericLiteral
    | types.Expression,
  params: Array<
    | types.Identifier
    | types.Pattern
    | types.RestElement
    | types.TSParameterProperty
  >,
  body: types.BlockStatement,
  computed?: boolean,
  _static?: boolean,
  generator?: boolean,
  async?: boolean,
): types.ClassMethod {
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
export { classMethod as ClassMethod };
export function objectPattern(
  properties: Array<types.RestElement | types.ObjectProperty>,
): types.ObjectPattern {
  return builder("ObjectPattern", properties);
}
export { objectPattern as ObjectPattern };
export function spreadElement(argument: types.Expression): types.SpreadElement {
  return builder("SpreadElement", argument);
}
export { spreadElement as SpreadElement };
function _super(): types.Super {
  return builder("Super");
}
export { _super as Super };
export { _super as super };
export function taggedTemplateExpression(
  tag: types.Expression,
  quasi: types.TemplateLiteral,
): types.TaggedTemplateExpression {
  return builder("TaggedTemplateExpression", tag, quasi);
}
export { taggedTemplateExpression as TaggedTemplateExpression };
export function templateElement(
  value: { raw: string; cooked?: string },
  tail?: boolean,
): types.TemplateElement {
  return builder("TemplateElement", value, tail);
}
export { templateElement as TemplateElement };
export function templateLiteral(
  quasis: Array<types.TemplateElement>,
  expressions: Array<types.Expression | types.TSType>,
): types.TemplateLiteral {
  return builder("TemplateLiteral", quasis, expressions);
}
export { templateLiteral as TemplateLiteral };
export function yieldExpression(
  argument?: types.Expression | null,
  delegate?: boolean,
): types.YieldExpression {
  return builder("YieldExpression", argument, delegate);
}
export { yieldExpression as YieldExpression };
export function awaitExpression(
  argument: types.Expression,
): types.AwaitExpression {
  return builder("AwaitExpression", argument);
}
export { awaitExpression as AwaitExpression };
function _import(): types.Import {
  return builder("Import");
}
export { _import as Import };
export { _import as import };
export function bigIntLiteral(value: string): types.BigIntLiteral {
  return builder("BigIntLiteral", value);
}
export { bigIntLiteral as BigIntLiteral };
export function exportNamespaceSpecifier(
  exported: types.Identifier,
): types.ExportNamespaceSpecifier {
  return builder("ExportNamespaceSpecifier", exported);
}
export { exportNamespaceSpecifier as ExportNamespaceSpecifier };
export function optionalMemberExpression(
  object: types.Expression,
  property: types.Expression | types.Identifier,
  computed: boolean | undefined,
  optional: boolean,
): types.OptionalMemberExpression {
  return builder(
    "OptionalMemberExpression",
    object,
    property,
    computed,
    optional,
  );
}
export { optionalMemberExpression as OptionalMemberExpression };
export function optionalCallExpression(
  callee: types.Expression,
  _arguments: Array<
    types.Expression | types.SpreadElement | types.JSXNamespacedName
  >,
  optional: boolean,
): types.OptionalCallExpression {
  return builder("OptionalCallExpression", callee, _arguments, optional);
}
export { optionalCallExpression as OptionalCallExpression };
export function anyTypeAnnotation(): types.AnyTypeAnnotation {
  return builder("AnyTypeAnnotation");
}
export { anyTypeAnnotation as AnyTypeAnnotation };
export function arrayTypeAnnotation(
  elementType: types.FlowType,
): types.ArrayTypeAnnotation {
  return builder("ArrayTypeAnnotation", elementType);
}
export { arrayTypeAnnotation as ArrayTypeAnnotation };
export function booleanTypeAnnotation(): types.BooleanTypeAnnotation {
  return builder("BooleanTypeAnnotation");
}
export { booleanTypeAnnotation as BooleanTypeAnnotation };
export function booleanLiteralTypeAnnotation(
  value: boolean,
): types.BooleanLiteralTypeAnnotation {
  return builder("BooleanLiteralTypeAnnotation", value);
}
export { booleanLiteralTypeAnnotation as BooleanLiteralTypeAnnotation };
export function nullLiteralTypeAnnotation(): types.NullLiteralTypeAnnotation {
  return builder("NullLiteralTypeAnnotation");
}
export { nullLiteralTypeAnnotation as NullLiteralTypeAnnotation };
export function classImplements(
  id: types.Identifier,
  typeParameters?: types.TypeParameterInstantiation | null,
): types.ClassImplements {
  return builder("ClassImplements", id, typeParameters);
}
export { classImplements as ClassImplements };
export function declareClass(
  id: types.Identifier,
  typeParameters: types.TypeParameterDeclaration | null | undefined,
  _extends: Array<types.InterfaceExtends> | null | undefined,
  body: types.ObjectTypeAnnotation,
): types.DeclareClass {
  return builder("DeclareClass", id, typeParameters, _extends, body);
}
export { declareClass as DeclareClass };
export function declareFunction(id: types.Identifier): types.DeclareFunction {
  return builder("DeclareFunction", id);
}
export { declareFunction as DeclareFunction };
export function declareInterface(
  id: types.Identifier,
  typeParameters: types.TypeParameterDeclaration | null | undefined,
  _extends: Array<types.InterfaceExtends> | null | undefined,
  body: types.ObjectTypeAnnotation,
): types.DeclareInterface {
  return builder("DeclareInterface", id, typeParameters, _extends, body);
}
export { declareInterface as DeclareInterface };
export function declareModule(
  id: types.Identifier | types.StringLiteral,
  body: types.BlockStatement,
  kind?: "CommonJS" | "ES" | null,
): types.DeclareModule {
  return builder("DeclareModule", id, body, kind);
}
export { declareModule as DeclareModule };
export function declareModuleExports(
  typeAnnotation: types.TypeAnnotation,
): types.DeclareModuleExports {
  return builder("DeclareModuleExports", typeAnnotation);
}
export { declareModuleExports as DeclareModuleExports };
export function declareTypeAlias(
  id: types.Identifier,
  typeParameters: types.TypeParameterDeclaration | null | undefined,
  right: types.FlowType,
): types.DeclareTypeAlias {
  return builder("DeclareTypeAlias", id, typeParameters, right);
}
export { declareTypeAlias as DeclareTypeAlias };
export function declareOpaqueType(
  id: types.Identifier,
  typeParameters?: types.TypeParameterDeclaration | null,
  supertype?: types.FlowType | null,
): types.DeclareOpaqueType {
  return builder("DeclareOpaqueType", id, typeParameters, supertype);
}
export { declareOpaqueType as DeclareOpaqueType };
export function declareVariable(id: types.Identifier): types.DeclareVariable {
  return builder("DeclareVariable", id);
}
export { declareVariable as DeclareVariable };
export function declareExportDeclaration(
  declaration?: types.Flow | null,
  specifiers?: Array<
    types.ExportSpecifier | types.ExportNamespaceSpecifier
  > | null,
  source?: types.StringLiteral | null,
): types.DeclareExportDeclaration {
  return builder("DeclareExportDeclaration", declaration, specifiers, source);
}
export { declareExportDeclaration as DeclareExportDeclaration };
export function declareExportAllDeclaration(
  source: types.StringLiteral,
): types.DeclareExportAllDeclaration {
  return builder("DeclareExportAllDeclaration", source);
}
export { declareExportAllDeclaration as DeclareExportAllDeclaration };
export function declaredPredicate(value: types.Flow): types.DeclaredPredicate {
  return builder("DeclaredPredicate", value);
}
export { declaredPredicate as DeclaredPredicate };
export function existsTypeAnnotation(): types.ExistsTypeAnnotation {
  return builder("ExistsTypeAnnotation");
}
export { existsTypeAnnotation as ExistsTypeAnnotation };
export function functionTypeAnnotation(
  typeParameters: types.TypeParameterDeclaration | null | undefined,
  params: Array<types.FunctionTypeParam>,
  rest: types.FunctionTypeParam | null | undefined,
  returnType: types.FlowType,
): types.FunctionTypeAnnotation {
  return builder(
    "FunctionTypeAnnotation",
    typeParameters,
    params,
    rest,
    returnType,
  );
}
export { functionTypeAnnotation as FunctionTypeAnnotation };
export function functionTypeParam(
  name: types.Identifier | null | undefined,
  typeAnnotation: types.FlowType,
): types.FunctionTypeParam {
  return builder("FunctionTypeParam", name, typeAnnotation);
}
export { functionTypeParam as FunctionTypeParam };
export function genericTypeAnnotation(
  id: types.Identifier | types.QualifiedTypeIdentifier,
  typeParameters?: types.TypeParameterInstantiation | null,
): types.GenericTypeAnnotation {
  return builder("GenericTypeAnnotation", id, typeParameters);
}
export { genericTypeAnnotation as GenericTypeAnnotation };
export function inferredPredicate(): types.InferredPredicate {
  return builder("InferredPredicate");
}
export { inferredPredicate as InferredPredicate };
export function interfaceExtends(
  id: types.Identifier | types.QualifiedTypeIdentifier,
  typeParameters?: types.TypeParameterInstantiation | null,
): types.InterfaceExtends {
  return builder("InterfaceExtends", id, typeParameters);
}
export { interfaceExtends as InterfaceExtends };
export function interfaceDeclaration(
  id: types.Identifier,
  typeParameters: types.TypeParameterDeclaration | null | undefined,
  _extends: Array<types.InterfaceExtends> | null | undefined,
  body: types.ObjectTypeAnnotation,
): types.InterfaceDeclaration {
  return builder("InterfaceDeclaration", id, typeParameters, _extends, body);
}
export { interfaceDeclaration as InterfaceDeclaration };
export function interfaceTypeAnnotation(
  _extends: Array<types.InterfaceExtends> | null | undefined,
  body: types.ObjectTypeAnnotation,
): types.InterfaceTypeAnnotation {
  return builder("InterfaceTypeAnnotation", _extends, body);
}
export { interfaceTypeAnnotation as InterfaceTypeAnnotation };
export function intersectionTypeAnnotation(
  types: Array<types.FlowType>,
): types.IntersectionTypeAnnotation {
  return builder("IntersectionTypeAnnotation", types);
}
export { intersectionTypeAnnotation as IntersectionTypeAnnotation };
export function mixedTypeAnnotation(): types.MixedTypeAnnotation {
  return builder("MixedTypeAnnotation");
}
export { mixedTypeAnnotation as MixedTypeAnnotation };
export function emptyTypeAnnotation(): types.EmptyTypeAnnotation {
  return builder("EmptyTypeAnnotation");
}
export { emptyTypeAnnotation as EmptyTypeAnnotation };
export function nullableTypeAnnotation(
  typeAnnotation: types.FlowType,
): types.NullableTypeAnnotation {
  return builder("NullableTypeAnnotation", typeAnnotation);
}
export { nullableTypeAnnotation as NullableTypeAnnotation };
export function numberLiteralTypeAnnotation(
  value: number,
): types.NumberLiteralTypeAnnotation {
  return builder("NumberLiteralTypeAnnotation", value);
}
export { numberLiteralTypeAnnotation as NumberLiteralTypeAnnotation };
export function numberTypeAnnotation(): types.NumberTypeAnnotation {
  return builder("NumberTypeAnnotation");
}
export { numberTypeAnnotation as NumberTypeAnnotation };
export function objectTypeAnnotation(
  properties: Array<types.ObjectTypeProperty | types.ObjectTypeSpreadProperty>,
  indexers?: Array<types.ObjectTypeIndexer> | null,
  callProperties?: Array<types.ObjectTypeCallProperty> | null,
  internalSlots?: Array<types.ObjectTypeInternalSlot> | null,
  exact?: boolean,
): types.ObjectTypeAnnotation {
  return builder(
    "ObjectTypeAnnotation",
    properties,
    indexers,
    callProperties,
    internalSlots,
    exact,
  );
}
export { objectTypeAnnotation as ObjectTypeAnnotation };
export function objectTypeInternalSlot(
  id: types.Identifier,
  value: types.FlowType,
  optional: boolean,
  _static: boolean,
  method: boolean,
): types.ObjectTypeInternalSlot {
  return builder(
    "ObjectTypeInternalSlot",
    id,
    value,
    optional,
    _static,
    method,
  );
}
export { objectTypeInternalSlot as ObjectTypeInternalSlot };
export function objectTypeCallProperty(
  value: types.FlowType,
): types.ObjectTypeCallProperty {
  return builder("ObjectTypeCallProperty", value);
}
export { objectTypeCallProperty as ObjectTypeCallProperty };
export function objectTypeIndexer(
  id: types.Identifier | null | undefined,
  key: types.FlowType,
  value: types.FlowType,
  variance?: types.Variance | null,
): types.ObjectTypeIndexer {
  return builder("ObjectTypeIndexer", id, key, value, variance);
}
export { objectTypeIndexer as ObjectTypeIndexer };
export function objectTypeProperty(
  key: types.Identifier | types.StringLiteral,
  value: types.FlowType,
  variance?: types.Variance | null,
): types.ObjectTypeProperty {
  return builder("ObjectTypeProperty", key, value, variance);
}
export { objectTypeProperty as ObjectTypeProperty };
export function objectTypeSpreadProperty(
  argument: types.FlowType,
): types.ObjectTypeSpreadProperty {
  return builder("ObjectTypeSpreadProperty", argument);
}
export { objectTypeSpreadProperty as ObjectTypeSpreadProperty };
export function opaqueType(
  id: types.Identifier,
  typeParameters: types.TypeParameterDeclaration | null | undefined,
  supertype: types.FlowType | null | undefined,
  impltype: types.FlowType,
): types.OpaqueType {
  return builder("OpaqueType", id, typeParameters, supertype, impltype);
}
export { opaqueType as OpaqueType };
export function qualifiedTypeIdentifier(
  id: types.Identifier,
  qualification: types.Identifier | types.QualifiedTypeIdentifier,
): types.QualifiedTypeIdentifier {
  return builder("QualifiedTypeIdentifier", id, qualification);
}
export { qualifiedTypeIdentifier as QualifiedTypeIdentifier };
export function stringLiteralTypeAnnotation(
  value: string,
): types.StringLiteralTypeAnnotation {
  return builder("StringLiteralTypeAnnotation", value);
}
export { stringLiteralTypeAnnotation as StringLiteralTypeAnnotation };
export function stringTypeAnnotation(): types.StringTypeAnnotation {
  return builder("StringTypeAnnotation");
}
export { stringTypeAnnotation as StringTypeAnnotation };
export function symbolTypeAnnotation(): types.SymbolTypeAnnotation {
  return builder("SymbolTypeAnnotation");
}
export { symbolTypeAnnotation as SymbolTypeAnnotation };
export function thisTypeAnnotation(): types.ThisTypeAnnotation {
  return builder("ThisTypeAnnotation");
}
export { thisTypeAnnotation as ThisTypeAnnotation };
export function tupleTypeAnnotation(
  types: Array<types.FlowType>,
): types.TupleTypeAnnotation {
  return builder("TupleTypeAnnotation", types);
}
export { tupleTypeAnnotation as TupleTypeAnnotation };
export function typeofTypeAnnotation(
  argument: types.FlowType,
): types.TypeofTypeAnnotation {
  return builder("TypeofTypeAnnotation", argument);
}
export { typeofTypeAnnotation as TypeofTypeAnnotation };
export function typeAlias(
  id: types.Identifier,
  typeParameters: types.TypeParameterDeclaration | null | undefined,
  right: types.FlowType,
): types.TypeAlias {
  return builder("TypeAlias", id, typeParameters, right);
}
export { typeAlias as TypeAlias };
export function typeAnnotation(
  typeAnnotation: types.FlowType,
): types.TypeAnnotation {
  return builder("TypeAnnotation", typeAnnotation);
}
export { typeAnnotation as TypeAnnotation };
export function typeCastExpression(
  expression: types.Expression,
  typeAnnotation: types.TypeAnnotation,
): types.TypeCastExpression {
  return builder("TypeCastExpression", expression, typeAnnotation);
}
export { typeCastExpression as TypeCastExpression };
export function typeParameter(
  bound?: types.TypeAnnotation | null,
  _default?: types.FlowType | null,
  variance?: types.Variance | null,
): types.TypeParameter {
  return builder("TypeParameter", bound, _default, variance);
}
export { typeParameter as TypeParameter };
export function typeParameterDeclaration(
  params: Array<types.TypeParameter>,
): types.TypeParameterDeclaration {
  return builder("TypeParameterDeclaration", params);
}
export { typeParameterDeclaration as TypeParameterDeclaration };
export function typeParameterInstantiation(
  params: Array<types.FlowType>,
): types.TypeParameterInstantiation {
  return builder("TypeParameterInstantiation", params);
}
export { typeParameterInstantiation as TypeParameterInstantiation };
export function unionTypeAnnotation(
  types: Array<types.FlowType>,
): types.UnionTypeAnnotation {
  return builder("UnionTypeAnnotation", types);
}
export { unionTypeAnnotation as UnionTypeAnnotation };
export function variance(kind: "minus" | "plus"): types.Variance {
  return builder("Variance", kind);
}
export { variance as Variance };
export function voidTypeAnnotation(): types.VoidTypeAnnotation {
  return builder("VoidTypeAnnotation");
}
export { voidTypeAnnotation as VoidTypeAnnotation };
export function enumDeclaration(
  id: types.Identifier,
  body:
    | types.EnumBooleanBody
    | types.EnumNumberBody
    | types.EnumStringBody
    | types.EnumSymbolBody,
): types.EnumDeclaration {
  return builder("EnumDeclaration", id, body);
}
export { enumDeclaration as EnumDeclaration };
export function enumBooleanBody(
  members: Array<types.EnumBooleanMember>,
): types.EnumBooleanBody {
  return builder("EnumBooleanBody", members);
}
export { enumBooleanBody as EnumBooleanBody };
export function enumNumberBody(
  members: Array<types.EnumNumberMember>,
): types.EnumNumberBody {
  return builder("EnumNumberBody", members);
}
export { enumNumberBody as EnumNumberBody };
export function enumStringBody(
  members: Array<types.EnumStringMember | types.EnumDefaultedMember>,
): types.EnumStringBody {
  return builder("EnumStringBody", members);
}
export { enumStringBody as EnumStringBody };
export function enumSymbolBody(
  members: Array<types.EnumDefaultedMember>,
): types.EnumSymbolBody {
  return builder("EnumSymbolBody", members);
}
export { enumSymbolBody as EnumSymbolBody };
export function enumBooleanMember(
  id: types.Identifier,
): types.EnumBooleanMember {
  return builder("EnumBooleanMember", id);
}
export { enumBooleanMember as EnumBooleanMember };
export function enumNumberMember(
  id: types.Identifier,
  init: types.NumericLiteral,
): types.EnumNumberMember {
  return builder("EnumNumberMember", id, init);
}
export { enumNumberMember as EnumNumberMember };
export function enumStringMember(
  id: types.Identifier,
  init: types.StringLiteral,
): types.EnumStringMember {
  return builder("EnumStringMember", id, init);
}
export { enumStringMember as EnumStringMember };
export function enumDefaultedMember(
  id: types.Identifier,
): types.EnumDefaultedMember {
  return builder("EnumDefaultedMember", id);
}
export { enumDefaultedMember as EnumDefaultedMember };
export function jsxAttribute(
  name: types.JSXIdentifier | types.JSXNamespacedName,
  value?:
    | types.JSXElement
    | types.JSXFragment
    | types.StringLiteral
    | types.JSXExpressionContainer
    | null,
): types.JSXAttribute {
  return builder("JSXAttribute", name, value);
}
export { jsxAttribute as JSXAttribute };
export { jsxAttribute as jSXAttribute };
export function jsxClosingElement(
  name:
    | types.JSXIdentifier
    | types.JSXMemberExpression
    | types.JSXNamespacedName,
): types.JSXClosingElement {
  return builder("JSXClosingElement", name);
}
export { jsxClosingElement as JSXClosingElement };
export { jsxClosingElement as jSXClosingElement };
export function jsxElement(
  openingElement: types.JSXOpeningElement,
  closingElement: types.JSXClosingElement | null | undefined,
  children: Array<
    | types.JSXText
    | types.JSXExpressionContainer
    | types.JSXSpreadChild
    | types.JSXElement
    | types.JSXFragment
  >,
  selfClosing?: boolean | null,
): types.JSXElement {
  return builder(
    "JSXElement",
    openingElement,
    closingElement,
    children,
    selfClosing,
  );
}
export { jsxElement as JSXElement };
export { jsxElement as jSXElement };
export function jsxEmptyExpression(): types.JSXEmptyExpression {
  return builder("JSXEmptyExpression");
}
export { jsxEmptyExpression as JSXEmptyExpression };
export { jsxEmptyExpression as jSXEmptyExpression };
export function jsxExpressionContainer(
  expression: types.Expression | types.JSXEmptyExpression,
): types.JSXExpressionContainer {
  return builder("JSXExpressionContainer", expression);
}
export { jsxExpressionContainer as JSXExpressionContainer };
export { jsxExpressionContainer as jSXExpressionContainer };
export function jsxSpreadChild(
  expression: types.Expression,
): types.JSXSpreadChild {
  return builder("JSXSpreadChild", expression);
}
export { jsxSpreadChild as JSXSpreadChild };
export { jsxSpreadChild as jSXSpreadChild };
export function jsxIdentifier(name: string): types.JSXIdentifier {
  return builder("JSXIdentifier", name);
}
export { jsxIdentifier as JSXIdentifier };
export { jsxIdentifier as jSXIdentifier };
export function jsxMemberExpression(
  object: types.JSXMemberExpression | types.JSXIdentifier,
  property: types.JSXIdentifier,
): types.JSXMemberExpression {
  return builder("JSXMemberExpression", object, property);
}
export { jsxMemberExpression as JSXMemberExpression };
export { jsxMemberExpression as jSXMemberExpression };
export function jsxNamespacedName(
  namespace: types.JSXIdentifier,
  name: types.JSXIdentifier,
): types.JSXNamespacedName {
  return builder("JSXNamespacedName", namespace, name);
}
export { jsxNamespacedName as JSXNamespacedName };
export { jsxNamespacedName as jSXNamespacedName };
export function jsxOpeningElement(
  name:
    | types.JSXIdentifier
    | types.JSXMemberExpression
    | types.JSXNamespacedName,
  attributes: Array<types.JSXAttribute | types.JSXSpreadAttribute>,
  selfClosing?: boolean,
): types.JSXOpeningElement {
  return builder("JSXOpeningElement", name, attributes, selfClosing);
}
export { jsxOpeningElement as JSXOpeningElement };
export { jsxOpeningElement as jSXOpeningElement };
export function jsxSpreadAttribute(
  argument: types.Expression,
): types.JSXSpreadAttribute {
  return builder("JSXSpreadAttribute", argument);
}
export { jsxSpreadAttribute as JSXSpreadAttribute };
export { jsxSpreadAttribute as jSXSpreadAttribute };
export function jsxText(value: string): types.JSXText {
  return builder("JSXText", value);
}
export { jsxText as JSXText };
export { jsxText as jSXText };
export function jsxFragment(
  openingFragment: types.JSXOpeningFragment,
  closingFragment: types.JSXClosingFragment,
  children: Array<
    | types.JSXText
    | types.JSXExpressionContainer
    | types.JSXSpreadChild
    | types.JSXElement
    | types.JSXFragment
  >,
): types.JSXFragment {
  return builder("JSXFragment", openingFragment, closingFragment, children);
}
export { jsxFragment as JSXFragment };
export { jsxFragment as jSXFragment };
export function jsxOpeningFragment(): types.JSXOpeningFragment {
  return builder("JSXOpeningFragment");
}
export { jsxOpeningFragment as JSXOpeningFragment };
export { jsxOpeningFragment as jSXOpeningFragment };
export function jsxClosingFragment(): types.JSXClosingFragment {
  return builder("JSXClosingFragment");
}
export { jsxClosingFragment as JSXClosingFragment };
export { jsxClosingFragment as jSXClosingFragment };
export function noop(): types.Noop {
  return builder("Noop");
}
export { noop as Noop };
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
  name: types.Identifier,
): types.Placeholder {
  return builder("Placeholder", expectedNode, name);
}
export { placeholder as Placeholder };
export function v8IntrinsicIdentifier(
  name: string,
): types.V8IntrinsicIdentifier {
  return builder("V8IntrinsicIdentifier", name);
}
export { v8IntrinsicIdentifier as V8IntrinsicIdentifier };
export function argumentPlaceholder(): types.ArgumentPlaceholder {
  return builder("ArgumentPlaceholder");
}
export { argumentPlaceholder as ArgumentPlaceholder };
export function bindExpression(
  object: types.Expression,
  callee: types.Expression,
): types.BindExpression {
  return builder("BindExpression", object, callee);
}
export { bindExpression as BindExpression };
export function classProperty(
  key:
    | types.Identifier
    | types.StringLiteral
    | types.NumericLiteral
    | types.Expression,
  value?: types.Expression | null,
  typeAnnotation?:
    | types.TypeAnnotation
    | types.TSTypeAnnotation
    | types.Noop
    | null,
  decorators?: Array<types.Decorator> | null,
  computed?: boolean,
  _static?: boolean,
): types.ClassProperty {
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
export { classProperty as ClassProperty };
export function pipelineTopicExpression(
  expression: types.Expression,
): types.PipelineTopicExpression {
  return builder("PipelineTopicExpression", expression);
}
export { pipelineTopicExpression as PipelineTopicExpression };
export function pipelineBareFunction(
  callee: types.Expression,
): types.PipelineBareFunction {
  return builder("PipelineBareFunction", callee);
}
export { pipelineBareFunction as PipelineBareFunction };
export function pipelinePrimaryTopicReference(): types.PipelinePrimaryTopicReference {
  return builder("PipelinePrimaryTopicReference");
}
export { pipelinePrimaryTopicReference as PipelinePrimaryTopicReference };
export function classPrivateProperty(
  key: types.PrivateName,
  value: types.Expression | null | undefined,
  decorators: Array<types.Decorator> | null | undefined,
  _static: any,
): types.ClassPrivateProperty {
  return builder("ClassPrivateProperty", key, value, decorators, _static);
}
export { classPrivateProperty as ClassPrivateProperty };
export function classPrivateMethod(
  kind: "get" | "set" | "method" | "constructor" | undefined,
  key: types.PrivateName,
  params: Array<
    | types.Identifier
    | types.Pattern
    | types.RestElement
    | types.TSParameterProperty
  >,
  body: types.BlockStatement,
  _static?: boolean,
): types.ClassPrivateMethod {
  return builder("ClassPrivateMethod", kind, key, params, body, _static);
}
export { classPrivateMethod as ClassPrivateMethod };
export function importAttribute(
  key: types.Identifier | types.StringLiteral,
  value: types.StringLiteral,
): types.ImportAttribute {
  return builder("ImportAttribute", key, value);
}
export { importAttribute as ImportAttribute };
export function decorator(expression: types.Expression): types.Decorator {
  return builder("Decorator", expression);
}
export { decorator as Decorator };
export function doExpression(body: types.BlockStatement): types.DoExpression {
  return builder("DoExpression", body);
}
export { doExpression as DoExpression };
export function exportDefaultSpecifier(
  exported: types.Identifier,
): types.ExportDefaultSpecifier {
  return builder("ExportDefaultSpecifier", exported);
}
export { exportDefaultSpecifier as ExportDefaultSpecifier };
export function privateName(id: types.Identifier): types.PrivateName {
  return builder("PrivateName", id);
}
export { privateName as PrivateName };
export function recordExpression(
  properties: Array<types.ObjectProperty | types.SpreadElement>,
): types.RecordExpression {
  return builder("RecordExpression", properties);
}
export { recordExpression as RecordExpression };
export function tupleExpression(
  elements?: Array<types.Expression | types.SpreadElement>,
): types.TupleExpression {
  return builder("TupleExpression", elements);
}
export { tupleExpression as TupleExpression };
export function decimalLiteral(value: string): types.DecimalLiteral {
  return builder("DecimalLiteral", value);
}
export { decimalLiteral as DecimalLiteral };
export function staticBlock(body: Array<types.Statement>): types.StaticBlock {
  return builder("StaticBlock", body);
}
export { staticBlock as StaticBlock };
export function tsParameterProperty(
  parameter: types.Identifier | types.AssignmentPattern,
): types.TSParameterProperty {
  return builder("TSParameterProperty", parameter);
}
export { tsParameterProperty as TSParameterProperty };
export { tsParameterProperty as tSParameterProperty };
export function tsDeclareFunction(
  id: types.Identifier | null | undefined,
  typeParameters:
    | types.TSTypeParameterDeclaration
    | types.Noop
    | null
    | undefined,
  params: Array<
    | types.Identifier
    | types.Pattern
    | types.RestElement
    | types.TSParameterProperty
  >,
  returnType?: types.TSTypeAnnotation | types.Noop | null,
): types.TSDeclareFunction {
  return builder("TSDeclareFunction", id, typeParameters, params, returnType);
}
export { tsDeclareFunction as TSDeclareFunction };
export { tsDeclareFunction as tSDeclareFunction };
export function tsDeclareMethod(
  decorators: Array<types.Decorator> | null | undefined,
  key:
    | types.Identifier
    | types.StringLiteral
    | types.NumericLiteral
    | types.Expression,
  typeParameters:
    | types.TSTypeParameterDeclaration
    | types.Noop
    | null
    | undefined,
  params: Array<
    | types.Identifier
    | types.Pattern
    | types.RestElement
    | types.TSParameterProperty
  >,
  returnType?: types.TSTypeAnnotation | types.Noop | null,
): types.TSDeclareMethod {
  return builder(
    "TSDeclareMethod",
    decorators,
    key,
    typeParameters,
    params,
    returnType,
  );
}
export { tsDeclareMethod as TSDeclareMethod };
export { tsDeclareMethod as tSDeclareMethod };
export function tsQualifiedName(
  left: types.TSEntityName,
  right: types.Identifier,
): types.TSQualifiedName {
  return builder("TSQualifiedName", left, right);
}
export { tsQualifiedName as TSQualifiedName };
export { tsQualifiedName as tSQualifiedName };
export function tsCallSignatureDeclaration(
  typeParameters: types.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<types.Identifier | types.RestElement>,
  typeAnnotation?: types.TSTypeAnnotation | null,
): types.TSCallSignatureDeclaration {
  return builder(
    "TSCallSignatureDeclaration",
    typeParameters,
    parameters,
    typeAnnotation,
  );
}
export { tsCallSignatureDeclaration as TSCallSignatureDeclaration };
export { tsCallSignatureDeclaration as tSCallSignatureDeclaration };
export function tsConstructSignatureDeclaration(
  typeParameters: types.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<types.Identifier | types.RestElement>,
  typeAnnotation?: types.TSTypeAnnotation | null,
): types.TSConstructSignatureDeclaration {
  return builder(
    "TSConstructSignatureDeclaration",
    typeParameters,
    parameters,
    typeAnnotation,
  );
}
export { tsConstructSignatureDeclaration as TSConstructSignatureDeclaration };
export { tsConstructSignatureDeclaration as tSConstructSignatureDeclaration };
export function tsPropertySignature(
  key: types.Expression,
  typeAnnotation?: types.TSTypeAnnotation | null,
  initializer?: types.Expression | null,
): types.TSPropertySignature {
  return builder("TSPropertySignature", key, typeAnnotation, initializer);
}
export { tsPropertySignature as TSPropertySignature };
export { tsPropertySignature as tSPropertySignature };
export function tsMethodSignature(
  key: types.Expression,
  typeParameters: types.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<types.Identifier | types.RestElement>,
  typeAnnotation?: types.TSTypeAnnotation | null,
): types.TSMethodSignature {
  return builder(
    "TSMethodSignature",
    key,
    typeParameters,
    parameters,
    typeAnnotation,
  );
}
export { tsMethodSignature as TSMethodSignature };
export { tsMethodSignature as tSMethodSignature };
export function tsIndexSignature(
  parameters: Array<types.Identifier>,
  typeAnnotation?: types.TSTypeAnnotation | null,
): types.TSIndexSignature {
  return builder("TSIndexSignature", parameters, typeAnnotation);
}
export { tsIndexSignature as TSIndexSignature };
export { tsIndexSignature as tSIndexSignature };
export function tsAnyKeyword(): types.TSAnyKeyword {
  return builder("TSAnyKeyword");
}
export { tsAnyKeyword as TSAnyKeyword };
export { tsAnyKeyword as tSAnyKeyword };
export function tsBooleanKeyword(): types.TSBooleanKeyword {
  return builder("TSBooleanKeyword");
}
export { tsBooleanKeyword as TSBooleanKeyword };
export { tsBooleanKeyword as tSBooleanKeyword };
export function tsBigIntKeyword(): types.TSBigIntKeyword {
  return builder("TSBigIntKeyword");
}
export { tsBigIntKeyword as TSBigIntKeyword };
export { tsBigIntKeyword as tSBigIntKeyword };
export function tsIntrinsicKeyword(): types.TSIntrinsicKeyword {
  return builder("TSIntrinsicKeyword");
}
export { tsIntrinsicKeyword as TSIntrinsicKeyword };
export { tsIntrinsicKeyword as tSIntrinsicKeyword };
export function tsNeverKeyword(): types.TSNeverKeyword {
  return builder("TSNeverKeyword");
}
export { tsNeverKeyword as TSNeverKeyword };
export { tsNeverKeyword as tSNeverKeyword };
export function tsNullKeyword(): types.TSNullKeyword {
  return builder("TSNullKeyword");
}
export { tsNullKeyword as TSNullKeyword };
export { tsNullKeyword as tSNullKeyword };
export function tsNumberKeyword(): types.TSNumberKeyword {
  return builder("TSNumberKeyword");
}
export { tsNumberKeyword as TSNumberKeyword };
export { tsNumberKeyword as tSNumberKeyword };
export function tsObjectKeyword(): types.TSObjectKeyword {
  return builder("TSObjectKeyword");
}
export { tsObjectKeyword as TSObjectKeyword };
export { tsObjectKeyword as tSObjectKeyword };
export function tsStringKeyword(): types.TSStringKeyword {
  return builder("TSStringKeyword");
}
export { tsStringKeyword as TSStringKeyword };
export { tsStringKeyword as tSStringKeyword };
export function tsSymbolKeyword(): types.TSSymbolKeyword {
  return builder("TSSymbolKeyword");
}
export { tsSymbolKeyword as TSSymbolKeyword };
export { tsSymbolKeyword as tSSymbolKeyword };
export function tsUndefinedKeyword(): types.TSUndefinedKeyword {
  return builder("TSUndefinedKeyword");
}
export { tsUndefinedKeyword as TSUndefinedKeyword };
export { tsUndefinedKeyword as tSUndefinedKeyword };
export function tsUnknownKeyword(): types.TSUnknownKeyword {
  return builder("TSUnknownKeyword");
}
export { tsUnknownKeyword as TSUnknownKeyword };
export { tsUnknownKeyword as tSUnknownKeyword };
export function tsVoidKeyword(): types.TSVoidKeyword {
  return builder("TSVoidKeyword");
}
export { tsVoidKeyword as TSVoidKeyword };
export { tsVoidKeyword as tSVoidKeyword };
export function tsThisType(): types.TSThisType {
  return builder("TSThisType");
}
export { tsThisType as TSThisType };
export { tsThisType as tSThisType };
export function tsFunctionType(
  typeParameters: types.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<types.Identifier | types.RestElement>,
  typeAnnotation?: types.TSTypeAnnotation | null,
): types.TSFunctionType {
  return builder("TSFunctionType", typeParameters, parameters, typeAnnotation);
}
export { tsFunctionType as TSFunctionType };
export { tsFunctionType as tSFunctionType };
export function tsConstructorType(
  typeParameters: types.TSTypeParameterDeclaration | null | undefined,
  parameters: Array<types.Identifier | types.RestElement>,
  typeAnnotation?: types.TSTypeAnnotation | null,
): types.TSConstructorType {
  return builder(
    "TSConstructorType",
    typeParameters,
    parameters,
    typeAnnotation,
  );
}
export { tsConstructorType as TSConstructorType };
export { tsConstructorType as tSConstructorType };
export function tsTypeReference(
  typeName: types.TSEntityName,
  typeParameters?: types.TSTypeParameterInstantiation | null,
): types.TSTypeReference {
  return builder("TSTypeReference", typeName, typeParameters);
}
export { tsTypeReference as TSTypeReference };
export { tsTypeReference as tSTypeReference };
export function tsTypePredicate(
  parameterName: types.Identifier | types.TSThisType,
  typeAnnotation?: types.TSTypeAnnotation | null,
  asserts?: boolean | null,
): types.TSTypePredicate {
  return builder("TSTypePredicate", parameterName, typeAnnotation, asserts);
}
export { tsTypePredicate as TSTypePredicate };
export { tsTypePredicate as tSTypePredicate };
export function tsTypeQuery(
  exprName: types.TSEntityName | types.TSImportType,
): types.TSTypeQuery {
  return builder("TSTypeQuery", exprName);
}
export { tsTypeQuery as TSTypeQuery };
export { tsTypeQuery as tSTypeQuery };
export function tsTypeLiteral(
  members: Array<types.TSTypeElement>,
): types.TSTypeLiteral {
  return builder("TSTypeLiteral", members);
}
export { tsTypeLiteral as TSTypeLiteral };
export { tsTypeLiteral as tSTypeLiteral };
export function tsArrayType(elementType: types.TSType): types.TSArrayType {
  return builder("TSArrayType", elementType);
}
export { tsArrayType as TSArrayType };
export { tsArrayType as tSArrayType };
export function tsTupleType(
  elementTypes: Array<types.TSType | types.TSNamedTupleMember>,
): types.TSTupleType {
  return builder("TSTupleType", elementTypes);
}
export { tsTupleType as TSTupleType };
export { tsTupleType as tSTupleType };
export function tsOptionalType(
  typeAnnotation: types.TSType,
): types.TSOptionalType {
  return builder("TSOptionalType", typeAnnotation);
}
export { tsOptionalType as TSOptionalType };
export { tsOptionalType as tSOptionalType };
export function tsRestType(typeAnnotation: types.TSType): types.TSRestType {
  return builder("TSRestType", typeAnnotation);
}
export { tsRestType as TSRestType };
export { tsRestType as tSRestType };
export function tsNamedTupleMember(
  label: types.Identifier,
  elementType: types.TSType,
  optional?: boolean,
): types.TSNamedTupleMember {
  return builder("TSNamedTupleMember", label, elementType, optional);
}
export { tsNamedTupleMember as TSNamedTupleMember };
export { tsNamedTupleMember as tSNamedTupleMember };
export function tsUnionType(types: Array<types.TSType>): types.TSUnionType {
  return builder("TSUnionType", types);
}
export { tsUnionType as TSUnionType };
export { tsUnionType as tSUnionType };
export function tsIntersectionType(
  types: Array<types.TSType>,
): types.TSIntersectionType {
  return builder("TSIntersectionType", types);
}
export { tsIntersectionType as TSIntersectionType };
export { tsIntersectionType as tSIntersectionType };
export function tsConditionalType(
  checkType: types.TSType,
  extendsType: types.TSType,
  trueType: types.TSType,
  falseType: types.TSType,
): types.TSConditionalType {
  return builder(
    "TSConditionalType",
    checkType,
    extendsType,
    trueType,
    falseType,
  );
}
export { tsConditionalType as TSConditionalType };
export { tsConditionalType as tSConditionalType };
export function tsInferType(
  typeParameter: types.TSTypeParameter,
): types.TSInferType {
  return builder("TSInferType", typeParameter);
}
export { tsInferType as TSInferType };
export { tsInferType as tSInferType };
export function tsParenthesizedType(
  typeAnnotation: types.TSType,
): types.TSParenthesizedType {
  return builder("TSParenthesizedType", typeAnnotation);
}
export { tsParenthesizedType as TSParenthesizedType };
export { tsParenthesizedType as tSParenthesizedType };
export function tsTypeOperator(
  typeAnnotation: types.TSType,
): types.TSTypeOperator {
  return builder("TSTypeOperator", typeAnnotation);
}
export { tsTypeOperator as TSTypeOperator };
export { tsTypeOperator as tSTypeOperator };
export function tsIndexedAccessType(
  objectType: types.TSType,
  indexType: types.TSType,
): types.TSIndexedAccessType {
  return builder("TSIndexedAccessType", objectType, indexType);
}
export { tsIndexedAccessType as TSIndexedAccessType };
export { tsIndexedAccessType as tSIndexedAccessType };
export function tsMappedType(
  typeParameter: types.TSTypeParameter,
  typeAnnotation?: types.TSType | null,
  nameType?: types.TSType | null,
): types.TSMappedType {
  return builder("TSMappedType", typeParameter, typeAnnotation, nameType);
}
export { tsMappedType as TSMappedType };
export { tsMappedType as tSMappedType };
export function tsLiteralType(
  literal:
    | types.NumericLiteral
    | types.StringLiteral
    | types.BooleanLiteral
    | types.BigIntLiteral,
): types.TSLiteralType {
  return builder("TSLiteralType", literal);
}
export { tsLiteralType as TSLiteralType };
export { tsLiteralType as tSLiteralType };
export function tsExpressionWithTypeArguments(
  expression: types.TSEntityName,
  typeParameters?: types.TSTypeParameterInstantiation | null,
): types.TSExpressionWithTypeArguments {
  return builder("TSExpressionWithTypeArguments", expression, typeParameters);
}
export { tsExpressionWithTypeArguments as TSExpressionWithTypeArguments };
export { tsExpressionWithTypeArguments as tSExpressionWithTypeArguments };
export function tsInterfaceDeclaration(
  id: types.Identifier,
  typeParameters: types.TSTypeParameterDeclaration | null | undefined,
  _extends: Array<types.TSExpressionWithTypeArguments> | null | undefined,
  body: types.TSInterfaceBody,
): types.TSInterfaceDeclaration {
  return builder("TSInterfaceDeclaration", id, typeParameters, _extends, body);
}
export { tsInterfaceDeclaration as TSInterfaceDeclaration };
export { tsInterfaceDeclaration as tSInterfaceDeclaration };
export function tsInterfaceBody(
  body: Array<types.TSTypeElement>,
): types.TSInterfaceBody {
  return builder("TSInterfaceBody", body);
}
export { tsInterfaceBody as TSInterfaceBody };
export { tsInterfaceBody as tSInterfaceBody };
export function tsTypeAliasDeclaration(
  id: types.Identifier,
  typeParameters: types.TSTypeParameterDeclaration | null | undefined,
  typeAnnotation: types.TSType,
): types.TSTypeAliasDeclaration {
  return builder("TSTypeAliasDeclaration", id, typeParameters, typeAnnotation);
}
export { tsTypeAliasDeclaration as TSTypeAliasDeclaration };
export { tsTypeAliasDeclaration as tSTypeAliasDeclaration };
export function tsAsExpression(
  expression: types.Expression,
  typeAnnotation: types.TSType,
): types.TSAsExpression {
  return builder("TSAsExpression", expression, typeAnnotation);
}
export { tsAsExpression as TSAsExpression };
export { tsAsExpression as tSAsExpression };
export function tsTypeAssertion(
  typeAnnotation: types.TSType,
  expression: types.Expression,
): types.TSTypeAssertion {
  return builder("TSTypeAssertion", typeAnnotation, expression);
}
export { tsTypeAssertion as TSTypeAssertion };
export { tsTypeAssertion as tSTypeAssertion };
export function tsEnumDeclaration(
  id: types.Identifier,
  members: Array<types.TSEnumMember>,
): types.TSEnumDeclaration {
  return builder("TSEnumDeclaration", id, members);
}
export { tsEnumDeclaration as TSEnumDeclaration };
export { tsEnumDeclaration as tSEnumDeclaration };
export function tsEnumMember(
  id: types.Identifier | types.StringLiteral,
  initializer?: types.Expression | null,
): types.TSEnumMember {
  return builder("TSEnumMember", id, initializer);
}
export { tsEnumMember as TSEnumMember };
export { tsEnumMember as tSEnumMember };
export function tsModuleDeclaration(
  id: types.Identifier | types.StringLiteral,
  body: types.TSModuleBlock | types.TSModuleDeclaration,
): types.TSModuleDeclaration {
  return builder("TSModuleDeclaration", id, body);
}
export { tsModuleDeclaration as TSModuleDeclaration };
export { tsModuleDeclaration as tSModuleDeclaration };
export function tsModuleBlock(
  body: Array<types.Statement>,
): types.TSModuleBlock {
  return builder("TSModuleBlock", body);
}
export { tsModuleBlock as TSModuleBlock };
export { tsModuleBlock as tSModuleBlock };
export function tsImportType(
  argument: types.StringLiteral,
  qualifier?: types.TSEntityName | null,
  typeParameters?: types.TSTypeParameterInstantiation | null,
): types.TSImportType {
  return builder("TSImportType", argument, qualifier, typeParameters);
}
export { tsImportType as TSImportType };
export { tsImportType as tSImportType };
export function tsImportEqualsDeclaration(
  id: types.Identifier,
  moduleReference: types.TSEntityName | types.TSExternalModuleReference,
): types.TSImportEqualsDeclaration {
  return builder("TSImportEqualsDeclaration", id, moduleReference);
}
export { tsImportEqualsDeclaration as TSImportEqualsDeclaration };
export { tsImportEqualsDeclaration as tSImportEqualsDeclaration };
export function tsExternalModuleReference(
  expression: types.StringLiteral,
): types.TSExternalModuleReference {
  return builder("TSExternalModuleReference", expression);
}
export { tsExternalModuleReference as TSExternalModuleReference };
export { tsExternalModuleReference as tSExternalModuleReference };
export function tsNonNullExpression(
  expression: types.Expression,
): types.TSNonNullExpression {
  return builder("TSNonNullExpression", expression);
}
export { tsNonNullExpression as TSNonNullExpression };
export { tsNonNullExpression as tSNonNullExpression };
export function tsExportAssignment(
  expression: types.Expression,
): types.TSExportAssignment {
  return builder("TSExportAssignment", expression);
}
export { tsExportAssignment as TSExportAssignment };
export { tsExportAssignment as tSExportAssignment };
export function tsNamespaceExportDeclaration(
  id: types.Identifier,
): types.TSNamespaceExportDeclaration {
  return builder("TSNamespaceExportDeclaration", id);
}
export { tsNamespaceExportDeclaration as TSNamespaceExportDeclaration };
export { tsNamespaceExportDeclaration as tSNamespaceExportDeclaration };
export function tsTypeAnnotation(
  typeAnnotation: types.TSType,
): types.TSTypeAnnotation {
  return builder("TSTypeAnnotation", typeAnnotation);
}
export { tsTypeAnnotation as TSTypeAnnotation };
export { tsTypeAnnotation as tSTypeAnnotation };
export function tsTypeParameterInstantiation(
  params: Array<types.TSType>,
): types.TSTypeParameterInstantiation {
  return builder("TSTypeParameterInstantiation", params);
}
export { tsTypeParameterInstantiation as TSTypeParameterInstantiation };
export { tsTypeParameterInstantiation as tSTypeParameterInstantiation };
export function tsTypeParameterDeclaration(
  params: Array<types.TSTypeParameter>,
): types.TSTypeParameterDeclaration {
  return builder("TSTypeParameterDeclaration", params);
}
export { tsTypeParameterDeclaration as TSTypeParameterDeclaration };
export { tsTypeParameterDeclaration as tSTypeParameterDeclaration };
export function tsTypeParameter(
  constraint: types.TSType | null | undefined,
  _default: types.TSType | null | undefined,
  name: string,
): types.TSTypeParameter {
  return builder("TSTypeParameter", constraint, _default, name);
}
export { tsTypeParameter as TSTypeParameter };
export { tsTypeParameter as tSTypeParameter };
export function NumberLiteral(...args: Array<any>): any {
  console.trace(
    "The node type NumberLiteral has been renamed to NumericLiteral",
  );
  return builder("NumberLiteral", ...args);
}
export { NumberLiteral as numberLiteral };
export function RegexLiteral(...args: Array<any>): any {
  console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
  return builder("RegexLiteral", ...args);
}
export { RegexLiteral as regexLiteral };
export function RestProperty(...args: Array<any>): any {
  console.trace("The node type RestProperty has been renamed to RestElement");
  return builder("RestProperty", ...args);
}
export { RestProperty as restProperty };
export function SpreadProperty(...args: Array<any>): any {
  console.trace(
    "The node type SpreadProperty has been renamed to SpreadElement",
  );
  return builder("SpreadProperty", ...args);
}
export { SpreadProperty as spreadProperty };
