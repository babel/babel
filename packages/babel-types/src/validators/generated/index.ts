/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import shallowEqual from "../../utils/shallowEqual";
import type * as t from "../..";
import deprecationWarning from "../../utils/deprecationWarning";

export function isArrayExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ArrayExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "ArrayExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isAssignmentExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.AssignmentExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "AssignmentExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBinaryExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.BinaryExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "BinaryExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isInterpreterDirective(
  node: object | null | undefined,
  opts?: object | null,
): node is t.InterpreterDirective {
  if (!node) return false;

  if ((node as t.Node).type !== "InterpreterDirective") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDirective(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Directive {
  if (!node) return false;

  if ((node as t.Node).type !== "Directive") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDirectiveLiteral(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DirectiveLiteral {
  if (!node) return false;

  if ((node as t.Node).type !== "DirectiveLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBlockStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.BlockStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "BlockStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBreakStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.BreakStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "BreakStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isCallExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.CallExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "CallExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isCatchClause(
  node: object | null | undefined,
  opts?: object | null,
): node is t.CatchClause {
  if (!node) return false;

  if ((node as t.Node).type !== "CatchClause") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isConditionalExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ConditionalExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "ConditionalExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isContinueStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ContinueStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "ContinueStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDebuggerStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DebuggerStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "DebuggerStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDoWhileStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DoWhileStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "DoWhileStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEmptyStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.EmptyStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "EmptyStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExpressionStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ExpressionStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "ExpressionStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isFile(
  node: object | null | undefined,
  opts?: object | null,
): node is t.File {
  if (!node) return false;

  if ((node as t.Node).type !== "File") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isForInStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ForInStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "ForInStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isForStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ForStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "ForStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isFunctionDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.FunctionDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "FunctionDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isFunctionExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.FunctionExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "FunctionExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isIdentifier(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Identifier {
  if (!node) return false;

  if ((node as t.Node).type !== "Identifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isIfStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.IfStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "IfStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isLabeledStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.LabeledStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "LabeledStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isStringLiteral(
  node: object | null | undefined,
  opts?: object | null,
): node is t.StringLiteral {
  if (!node) return false;

  if ((node as t.Node).type !== "StringLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNumericLiteral(
  node: object | null | undefined,
  opts?: object | null,
): node is t.NumericLiteral {
  if (!node) return false;

  if ((node as t.Node).type !== "NumericLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNullLiteral(
  node: object | null | undefined,
  opts?: object | null,
): node is t.NullLiteral {
  if (!node) return false;

  if ((node as t.Node).type !== "NullLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBooleanLiteral(
  node: object | null | undefined,
  opts?: object | null,
): node is t.BooleanLiteral {
  if (!node) return false;

  if ((node as t.Node).type !== "BooleanLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isRegExpLiteral(
  node: object | null | undefined,
  opts?: object | null,
): node is t.RegExpLiteral {
  if (!node) return false;

  if ((node as t.Node).type !== "RegExpLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isLogicalExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.LogicalExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "LogicalExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isMemberExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.MemberExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "MemberExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNewExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.NewExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "NewExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isProgram(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Program {
  if (!node) return false;

  if ((node as t.Node).type !== "Program") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ObjectExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "ObjectExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectMethod(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ObjectMethod {
  if (!node) return false;

  if ((node as t.Node).type !== "ObjectMethod") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectProperty(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ObjectProperty {
  if (!node) return false;

  if ((node as t.Node).type !== "ObjectProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isRestElement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.RestElement {
  if (!node) return false;

  if ((node as t.Node).type !== "RestElement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isReturnStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ReturnStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "ReturnStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isSequenceExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.SequenceExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "SequenceExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isParenthesizedExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ParenthesizedExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "ParenthesizedExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isSwitchCase(
  node: object | null | undefined,
  opts?: object | null,
): node is t.SwitchCase {
  if (!node) return false;

  if ((node as t.Node).type !== "SwitchCase") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isSwitchStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.SwitchStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "SwitchStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isThisExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ThisExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "ThisExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isThrowStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ThrowStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "ThrowStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTryStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TryStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "TryStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isUnaryExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.UnaryExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "UnaryExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isUpdateExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.UpdateExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "UpdateExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isVariableDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.VariableDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "VariableDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isVariableDeclarator(
  node: object | null | undefined,
  opts?: object | null,
): node is t.VariableDeclarator {
  if (!node) return false;

  if ((node as t.Node).type !== "VariableDeclarator") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isWhileStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.WhileStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "WhileStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isWithStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.WithStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "WithStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isAssignmentPattern(
  node: object | null | undefined,
  opts?: object | null,
): node is t.AssignmentPattern {
  if (!node) return false;

  if ((node as t.Node).type !== "AssignmentPattern") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isArrayPattern(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ArrayPattern {
  if (!node) return false;

  if ((node as t.Node).type !== "ArrayPattern") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isArrowFunctionExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ArrowFunctionExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "ArrowFunctionExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassBody(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ClassBody {
  if (!node) return false;

  if ((node as t.Node).type !== "ClassBody") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ClassExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "ClassExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ClassDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "ClassDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExportAllDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ExportAllDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "ExportAllDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExportDefaultDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ExportDefaultDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "ExportDefaultDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExportNamedDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ExportNamedDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "ExportNamedDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExportSpecifier(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ExportSpecifier {
  if (!node) return false;

  if ((node as t.Node).type !== "ExportSpecifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isForOfStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ForOfStatement {
  if (!node) return false;

  if ((node as t.Node).type !== "ForOfStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isImportDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ImportDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "ImportDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isImportDefaultSpecifier(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ImportDefaultSpecifier {
  if (!node) return false;

  if ((node as t.Node).type !== "ImportDefaultSpecifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isImportNamespaceSpecifier(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ImportNamespaceSpecifier {
  if (!node) return false;

  if ((node as t.Node).type !== "ImportNamespaceSpecifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isImportSpecifier(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ImportSpecifier {
  if (!node) return false;

  if ((node as t.Node).type !== "ImportSpecifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isMetaProperty(
  node: object | null | undefined,
  opts?: object | null,
): node is t.MetaProperty {
  if (!node) return false;

  if ((node as t.Node).type !== "MetaProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassMethod(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ClassMethod {
  if (!node) return false;

  if ((node as t.Node).type !== "ClassMethod") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectPattern(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ObjectPattern {
  if (!node) return false;

  if ((node as t.Node).type !== "ObjectPattern") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isSpreadElement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.SpreadElement {
  if (!node) return false;

  if ((node as t.Node).type !== "SpreadElement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isSuper(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Super {
  if (!node) return false;

  if ((node as t.Node).type !== "Super") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTaggedTemplateExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TaggedTemplateExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "TaggedTemplateExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTemplateElement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TemplateElement {
  if (!node) return false;

  if ((node as t.Node).type !== "TemplateElement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTemplateLiteral(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TemplateLiteral {
  if (!node) return false;

  if ((node as t.Node).type !== "TemplateLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isYieldExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.YieldExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "YieldExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isAwaitExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.AwaitExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "AwaitExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isImport(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Import {
  if (!node) return false;

  if ((node as t.Node).type !== "Import") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBigIntLiteral(
  node: object | null | undefined,
  opts?: object | null,
): node is t.BigIntLiteral {
  if (!node) return false;

  if ((node as t.Node).type !== "BigIntLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExportNamespaceSpecifier(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ExportNamespaceSpecifier {
  if (!node) return false;

  if ((node as t.Node).type !== "ExportNamespaceSpecifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isOptionalMemberExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.OptionalMemberExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "OptionalMemberExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isOptionalCallExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.OptionalCallExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "OptionalCallExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassProperty(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ClassProperty {
  if (!node) return false;

  if ((node as t.Node).type !== "ClassProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassAccessorProperty(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ClassAccessorProperty {
  if (!node) return false;

  if ((node as t.Node).type !== "ClassAccessorProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassPrivateProperty(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ClassPrivateProperty {
  if (!node) return false;

  if ((node as t.Node).type !== "ClassPrivateProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassPrivateMethod(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ClassPrivateMethod {
  if (!node) return false;

  if ((node as t.Node).type !== "ClassPrivateMethod") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isPrivateName(
  node: object | null | undefined,
  opts?: object | null,
): node is t.PrivateName {
  if (!node) return false;

  if ((node as t.Node).type !== "PrivateName") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isStaticBlock(
  node: object | null | undefined,
  opts?: object | null,
): node is t.StaticBlock {
  if (!node) return false;

  if ((node as t.Node).type !== "StaticBlock") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isAnyTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.AnyTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "AnyTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isArrayTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ArrayTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "ArrayTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBooleanTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.BooleanTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "BooleanTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBooleanLiteralTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.BooleanLiteralTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "BooleanLiteralTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNullLiteralTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.NullLiteralTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "NullLiteralTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassImplements(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ClassImplements {
  if (!node) return false;

  if ((node as t.Node).type !== "ClassImplements") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareClass(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DeclareClass {
  if (!node) return false;

  if ((node as t.Node).type !== "DeclareClass") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareFunction(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DeclareFunction {
  if (!node) return false;

  if ((node as t.Node).type !== "DeclareFunction") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareInterface(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DeclareInterface {
  if (!node) return false;

  if ((node as t.Node).type !== "DeclareInterface") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareModule(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DeclareModule {
  if (!node) return false;

  if ((node as t.Node).type !== "DeclareModule") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareModuleExports(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DeclareModuleExports {
  if (!node) return false;

  if ((node as t.Node).type !== "DeclareModuleExports") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareTypeAlias(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DeclareTypeAlias {
  if (!node) return false;

  if ((node as t.Node).type !== "DeclareTypeAlias") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareOpaqueType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DeclareOpaqueType {
  if (!node) return false;

  if ((node as t.Node).type !== "DeclareOpaqueType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareVariable(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DeclareVariable {
  if (!node) return false;

  if ((node as t.Node).type !== "DeclareVariable") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareExportDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DeclareExportDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "DeclareExportDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareExportAllDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DeclareExportAllDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "DeclareExportAllDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclaredPredicate(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DeclaredPredicate {
  if (!node) return false;

  if ((node as t.Node).type !== "DeclaredPredicate") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExistsTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ExistsTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "ExistsTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isFunctionTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.FunctionTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "FunctionTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isFunctionTypeParam(
  node: object | null | undefined,
  opts?: object | null,
): node is t.FunctionTypeParam {
  if (!node) return false;

  if ((node as t.Node).type !== "FunctionTypeParam") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isGenericTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.GenericTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "GenericTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isInferredPredicate(
  node: object | null | undefined,
  opts?: object | null,
): node is t.InferredPredicate {
  if (!node) return false;

  if ((node as t.Node).type !== "InferredPredicate") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isInterfaceExtends(
  node: object | null | undefined,
  opts?: object | null,
): node is t.InterfaceExtends {
  if (!node) return false;

  if ((node as t.Node).type !== "InterfaceExtends") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isInterfaceDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.InterfaceDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "InterfaceDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isInterfaceTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.InterfaceTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "InterfaceTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isIntersectionTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.IntersectionTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "IntersectionTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isMixedTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.MixedTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "MixedTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEmptyTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.EmptyTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "EmptyTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNullableTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.NullableTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "NullableTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNumberLiteralTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.NumberLiteralTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "NumberLiteralTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNumberTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.NumberTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "NumberTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ObjectTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "ObjectTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectTypeInternalSlot(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ObjectTypeInternalSlot {
  if (!node) return false;

  if ((node as t.Node).type !== "ObjectTypeInternalSlot") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectTypeCallProperty(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ObjectTypeCallProperty {
  if (!node) return false;

  if ((node as t.Node).type !== "ObjectTypeCallProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectTypeIndexer(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ObjectTypeIndexer {
  if (!node) return false;

  if ((node as t.Node).type !== "ObjectTypeIndexer") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectTypeProperty(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ObjectTypeProperty {
  if (!node) return false;

  if ((node as t.Node).type !== "ObjectTypeProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectTypeSpreadProperty(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ObjectTypeSpreadProperty {
  if (!node) return false;

  if ((node as t.Node).type !== "ObjectTypeSpreadProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isOpaqueType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.OpaqueType {
  if (!node) return false;

  if ((node as t.Node).type !== "OpaqueType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isQualifiedTypeIdentifier(
  node: object | null | undefined,
  opts?: object | null,
): node is t.QualifiedTypeIdentifier {
  if (!node) return false;

  if ((node as t.Node).type !== "QualifiedTypeIdentifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isStringLiteralTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.StringLiteralTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "StringLiteralTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isStringTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.StringTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "StringTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isSymbolTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.SymbolTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "SymbolTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isThisTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ThisTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "ThisTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTupleTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TupleTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "TupleTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeofTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TypeofTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "TypeofTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeAlias(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TypeAlias {
  if (!node) return false;

  if ((node as t.Node).type !== "TypeAlias") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "TypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeCastExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TypeCastExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "TypeCastExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeParameter(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TypeParameter {
  if (!node) return false;

  if ((node as t.Node).type !== "TypeParameter") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeParameterDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TypeParameterDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "TypeParameterDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeParameterInstantiation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TypeParameterInstantiation {
  if (!node) return false;

  if ((node as t.Node).type !== "TypeParameterInstantiation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isUnionTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.UnionTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "UnionTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isVariance(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Variance {
  if (!node) return false;

  if ((node as t.Node).type !== "Variance") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isVoidTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.VoidTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "VoidTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.EnumDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "EnumDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumBooleanBody(
  node: object | null | undefined,
  opts?: object | null,
): node is t.EnumBooleanBody {
  if (!node) return false;

  if ((node as t.Node).type !== "EnumBooleanBody") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumNumberBody(
  node: object | null | undefined,
  opts?: object | null,
): node is t.EnumNumberBody {
  if (!node) return false;

  if ((node as t.Node).type !== "EnumNumberBody") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumStringBody(
  node: object | null | undefined,
  opts?: object | null,
): node is t.EnumStringBody {
  if (!node) return false;

  if ((node as t.Node).type !== "EnumStringBody") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumSymbolBody(
  node: object | null | undefined,
  opts?: object | null,
): node is t.EnumSymbolBody {
  if (!node) return false;

  if ((node as t.Node).type !== "EnumSymbolBody") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumBooleanMember(
  node: object | null | undefined,
  opts?: object | null,
): node is t.EnumBooleanMember {
  if (!node) return false;

  if ((node as t.Node).type !== "EnumBooleanMember") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumNumberMember(
  node: object | null | undefined,
  opts?: object | null,
): node is t.EnumNumberMember {
  if (!node) return false;

  if ((node as t.Node).type !== "EnumNumberMember") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumStringMember(
  node: object | null | undefined,
  opts?: object | null,
): node is t.EnumStringMember {
  if (!node) return false;

  if ((node as t.Node).type !== "EnumStringMember") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumDefaultedMember(
  node: object | null | undefined,
  opts?: object | null,
): node is t.EnumDefaultedMember {
  if (!node) return false;

  if ((node as t.Node).type !== "EnumDefaultedMember") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isIndexedAccessType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.IndexedAccessType {
  if (!node) return false;

  if ((node as t.Node).type !== "IndexedAccessType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isOptionalIndexedAccessType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.OptionalIndexedAccessType {
  if (!node) return false;

  if ((node as t.Node).type !== "OptionalIndexedAccessType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXAttribute(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXAttribute {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXAttribute") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXClosingElement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXClosingElement {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXClosingElement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXElement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXElement {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXElement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXEmptyExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXEmptyExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXEmptyExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXExpressionContainer(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXExpressionContainer {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXExpressionContainer") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXSpreadChild(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXSpreadChild {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXSpreadChild") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXIdentifier(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXIdentifier {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXIdentifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXMemberExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXMemberExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXMemberExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXNamespacedName(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXNamespacedName {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXNamespacedName") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXOpeningElement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXOpeningElement {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXOpeningElement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXSpreadAttribute(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXSpreadAttribute {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXSpreadAttribute") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXText(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXText {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXText") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXFragment(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXFragment {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXFragment") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXOpeningFragment(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXOpeningFragment {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXOpeningFragment") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXClosingFragment(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSXClosingFragment {
  if (!node) return false;

  if ((node as t.Node).type !== "JSXClosingFragment") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNoop(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Noop {
  if (!node) return false;

  if ((node as t.Node).type !== "Noop") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isPlaceholder(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Placeholder {
  if (!node) return false;

  if ((node as t.Node).type !== "Placeholder") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isV8IntrinsicIdentifier(
  node: object | null | undefined,
  opts?: object | null,
): node is t.V8IntrinsicIdentifier {
  if (!node) return false;

  if ((node as t.Node).type !== "V8IntrinsicIdentifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isArgumentPlaceholder(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ArgumentPlaceholder {
  if (!node) return false;

  if ((node as t.Node).type !== "ArgumentPlaceholder") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBindExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.BindExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "BindExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isImportAttribute(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ImportAttribute {
  if (!node) return false;

  if ((node as t.Node).type !== "ImportAttribute") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDecorator(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Decorator {
  if (!node) return false;

  if ((node as t.Node).type !== "Decorator") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDoExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DoExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "DoExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExportDefaultSpecifier(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ExportDefaultSpecifier {
  if (!node) return false;

  if ((node as t.Node).type !== "ExportDefaultSpecifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isRecordExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.RecordExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "RecordExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTupleExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TupleExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "TupleExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDecimalLiteral(
  node: object | null | undefined,
  opts?: object | null,
): node is t.DecimalLiteral {
  if (!node) return false;

  if ((node as t.Node).type !== "DecimalLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isModuleExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ModuleExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "ModuleExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTopicReference(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TopicReference {
  if (!node) return false;

  if ((node as t.Node).type !== "TopicReference") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isPipelineTopicExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.PipelineTopicExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "PipelineTopicExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isPipelineBareFunction(
  node: object | null | undefined,
  opts?: object | null,
): node is t.PipelineBareFunction {
  if (!node) return false;

  if ((node as t.Node).type !== "PipelineBareFunction") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isPipelinePrimaryTopicReference(
  node: object | null | undefined,
  opts?: object | null,
): node is t.PipelinePrimaryTopicReference {
  if (!node) return false;

  if ((node as t.Node).type !== "PipelinePrimaryTopicReference") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSParameterProperty(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSParameterProperty {
  if (!node) return false;

  if ((node as t.Node).type !== "TSParameterProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSDeclareFunction(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSDeclareFunction {
  if (!node) return false;

  if ((node as t.Node).type !== "TSDeclareFunction") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSDeclareMethod(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSDeclareMethod {
  if (!node) return false;

  if ((node as t.Node).type !== "TSDeclareMethod") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSQualifiedName(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSQualifiedName {
  if (!node) return false;

  if ((node as t.Node).type !== "TSQualifiedName") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSCallSignatureDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSCallSignatureDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "TSCallSignatureDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSConstructSignatureDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSConstructSignatureDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "TSConstructSignatureDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSPropertySignature(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSPropertySignature {
  if (!node) return false;

  if ((node as t.Node).type !== "TSPropertySignature") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSMethodSignature(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSMethodSignature {
  if (!node) return false;

  if ((node as t.Node).type !== "TSMethodSignature") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSIndexSignature(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSIndexSignature {
  if (!node) return false;

  if ((node as t.Node).type !== "TSIndexSignature") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSAnyKeyword(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSAnyKeyword {
  if (!node) return false;

  if ((node as t.Node).type !== "TSAnyKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSBooleanKeyword(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSBooleanKeyword {
  if (!node) return false;

  if ((node as t.Node).type !== "TSBooleanKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSBigIntKeyword(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSBigIntKeyword {
  if (!node) return false;

  if ((node as t.Node).type !== "TSBigIntKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSIntrinsicKeyword(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSIntrinsicKeyword {
  if (!node) return false;

  if ((node as t.Node).type !== "TSIntrinsicKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSNeverKeyword(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSNeverKeyword {
  if (!node) return false;

  if ((node as t.Node).type !== "TSNeverKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSNullKeyword(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSNullKeyword {
  if (!node) return false;

  if ((node as t.Node).type !== "TSNullKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSNumberKeyword(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSNumberKeyword {
  if (!node) return false;

  if ((node as t.Node).type !== "TSNumberKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSObjectKeyword(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSObjectKeyword {
  if (!node) return false;

  if ((node as t.Node).type !== "TSObjectKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSStringKeyword(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSStringKeyword {
  if (!node) return false;

  if ((node as t.Node).type !== "TSStringKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSSymbolKeyword(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSSymbolKeyword {
  if (!node) return false;

  if ((node as t.Node).type !== "TSSymbolKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSUndefinedKeyword(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSUndefinedKeyword {
  if (!node) return false;

  if ((node as t.Node).type !== "TSUndefinedKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSUnknownKeyword(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSUnknownKeyword {
  if (!node) return false;

  if ((node as t.Node).type !== "TSUnknownKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSVoidKeyword(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSVoidKeyword {
  if (!node) return false;

  if ((node as t.Node).type !== "TSVoidKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSThisType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSThisType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSThisType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSFunctionType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSFunctionType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSFunctionType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSConstructorType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSConstructorType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSConstructorType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeReference(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSTypeReference {
  if (!node) return false;

  if ((node as t.Node).type !== "TSTypeReference") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypePredicate(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSTypePredicate {
  if (!node) return false;

  if ((node as t.Node).type !== "TSTypePredicate") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeQuery(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSTypeQuery {
  if (!node) return false;

  if ((node as t.Node).type !== "TSTypeQuery") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeLiteral(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSTypeLiteral {
  if (!node) return false;

  if ((node as t.Node).type !== "TSTypeLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSArrayType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSArrayType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSArrayType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTupleType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSTupleType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSTupleType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSOptionalType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSOptionalType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSOptionalType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSRestType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSRestType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSRestType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSNamedTupleMember(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSNamedTupleMember {
  if (!node) return false;

  if ((node as t.Node).type !== "TSNamedTupleMember") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSUnionType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSUnionType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSUnionType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSIntersectionType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSIntersectionType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSIntersectionType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSConditionalType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSConditionalType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSConditionalType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSInferType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSInferType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSInferType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSParenthesizedType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSParenthesizedType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSParenthesizedType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeOperator(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSTypeOperator {
  if (!node) return false;

  if ((node as t.Node).type !== "TSTypeOperator") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSIndexedAccessType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSIndexedAccessType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSIndexedAccessType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSMappedType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSMappedType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSMappedType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSLiteralType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSLiteralType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSLiteralType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSExpressionWithTypeArguments(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSExpressionWithTypeArguments {
  if (!node) return false;

  if ((node as t.Node).type !== "TSExpressionWithTypeArguments") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSInterfaceDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSInterfaceDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "TSInterfaceDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSInterfaceBody(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSInterfaceBody {
  if (!node) return false;

  if ((node as t.Node).type !== "TSInterfaceBody") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeAliasDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSTypeAliasDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "TSTypeAliasDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSInstantiationExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSInstantiationExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "TSInstantiationExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSAsExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSAsExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "TSAsExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSSatisfiesExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSSatisfiesExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "TSSatisfiesExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeAssertion(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSTypeAssertion {
  if (!node) return false;

  if ((node as t.Node).type !== "TSTypeAssertion") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSEnumDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSEnumDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "TSEnumDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSEnumMember(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSEnumMember {
  if (!node) return false;

  if ((node as t.Node).type !== "TSEnumMember") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSModuleDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSModuleDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "TSModuleDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSModuleBlock(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSModuleBlock {
  if (!node) return false;

  if ((node as t.Node).type !== "TSModuleBlock") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSImportType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSImportType {
  if (!node) return false;

  if ((node as t.Node).type !== "TSImportType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSImportEqualsDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSImportEqualsDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "TSImportEqualsDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSExternalModuleReference(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSExternalModuleReference {
  if (!node) return false;

  if ((node as t.Node).type !== "TSExternalModuleReference") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSNonNullExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSNonNullExpression {
  if (!node) return false;

  if ((node as t.Node).type !== "TSNonNullExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSExportAssignment(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSExportAssignment {
  if (!node) return false;

  if ((node as t.Node).type !== "TSExportAssignment") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSNamespaceExportDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSNamespaceExportDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "TSNamespaceExportDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSTypeAnnotation {
  if (!node) return false;

  if ((node as t.Node).type !== "TSTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeParameterInstantiation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSTypeParameterInstantiation {
  if (!node) return false;

  if ((node as t.Node).type !== "TSTypeParameterInstantiation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeParameterDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSTypeParameterDeclaration {
  if (!node) return false;

  if ((node as t.Node).type !== "TSTypeParameterDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeParameter(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSTypeParameter {
  if (!node) return false;

  if ((node as t.Node).type !== "TSTypeParameter") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isStandardized(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Standardized {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ArrayExpression":
    case "AssignmentExpression":
    case "BinaryExpression":
    case "InterpreterDirective":
    case "Directive":
    case "DirectiveLiteral":
    case "BlockStatement":
    case "BreakStatement":
    case "CallExpression":
    case "CatchClause":
    case "ConditionalExpression":
    case "ContinueStatement":
    case "DebuggerStatement":
    case "DoWhileStatement":
    case "EmptyStatement":
    case "ExpressionStatement":
    case "File":
    case "ForInStatement":
    case "ForStatement":
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "Identifier":
    case "IfStatement":
    case "LabeledStatement":
    case "StringLiteral":
    case "NumericLiteral":
    case "NullLiteral":
    case "BooleanLiteral":
    case "RegExpLiteral":
    case "LogicalExpression":
    case "MemberExpression":
    case "NewExpression":
    case "Program":
    case "ObjectExpression":
    case "ObjectMethod":
    case "ObjectProperty":
    case "RestElement":
    case "ReturnStatement":
    case "SequenceExpression":
    case "ParenthesizedExpression":
    case "SwitchCase":
    case "SwitchStatement":
    case "ThisExpression":
    case "ThrowStatement":
    case "TryStatement":
    case "UnaryExpression":
    case "UpdateExpression":
    case "VariableDeclaration":
    case "VariableDeclarator":
    case "WhileStatement":
    case "WithStatement":
    case "AssignmentPattern":
    case "ArrayPattern":
    case "ArrowFunctionExpression":
    case "ClassBody":
    case "ClassExpression":
    case "ClassDeclaration":
    case "ExportAllDeclaration":
    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
    case "ExportSpecifier":
    case "ForOfStatement":
    case "ImportDeclaration":
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
    case "MetaProperty":
    case "ClassMethod":
    case "ObjectPattern":
    case "SpreadElement":
    case "Super":
    case "TaggedTemplateExpression":
    case "TemplateElement":
    case "TemplateLiteral":
    case "YieldExpression":
    case "AwaitExpression":
    case "Import":
    case "BigIntLiteral":
    case "ExportNamespaceSpecifier":
    case "OptionalMemberExpression":
    case "OptionalCallExpression":
    case "ClassProperty":
    case "ClassAccessorProperty":
    case "ClassPrivateProperty":
    case "ClassPrivateMethod":
    case "PrivateName":
    case "StaticBlock":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "Identifier":
        case "StringLiteral":
        case "BlockStatement":
        case "ClassBody":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isExpression(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Expression {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ArrayExpression":
    case "AssignmentExpression":
    case "BinaryExpression":
    case "CallExpression":
    case "ConditionalExpression":
    case "FunctionExpression":
    case "Identifier":
    case "StringLiteral":
    case "NumericLiteral":
    case "NullLiteral":
    case "BooleanLiteral":
    case "RegExpLiteral":
    case "LogicalExpression":
    case "MemberExpression":
    case "NewExpression":
    case "ObjectExpression":
    case "SequenceExpression":
    case "ParenthesizedExpression":
    case "ThisExpression":
    case "UnaryExpression":
    case "UpdateExpression":
    case "ArrowFunctionExpression":
    case "ClassExpression":
    case "MetaProperty":
    case "Super":
    case "TaggedTemplateExpression":
    case "TemplateLiteral":
    case "YieldExpression":
    case "AwaitExpression":
    case "Import":
    case "BigIntLiteral":
    case "OptionalMemberExpression":
    case "OptionalCallExpression":
    case "TypeCastExpression":
    case "JSXElement":
    case "JSXFragment":
    case "BindExpression":
    case "DoExpression":
    case "RecordExpression":
    case "TupleExpression":
    case "DecimalLiteral":
    case "ModuleExpression":
    case "TopicReference":
    case "PipelineTopicExpression":
    case "PipelineBareFunction":
    case "PipelinePrimaryTopicReference":
    case "TSInstantiationExpression":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSTypeAssertion":
    case "TSNonNullExpression":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "Expression":
        case "Identifier":
        case "StringLiteral":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isBinary(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Binary {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "BinaryExpression":
    case "LogicalExpression":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isScopable(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Scopable {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "BlockStatement":
    case "CatchClause":
    case "DoWhileStatement":
    case "ForInStatement":
    case "ForStatement":
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "Program":
    case "ObjectMethod":
    case "SwitchStatement":
    case "WhileStatement":
    case "ArrowFunctionExpression":
    case "ClassExpression":
    case "ClassDeclaration":
    case "ForOfStatement":
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "StaticBlock":
    case "TSModuleBlock":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "BlockStatement":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isBlockParent(
  node: object | null | undefined,
  opts?: object | null,
): node is t.BlockParent {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "BlockStatement":
    case "CatchClause":
    case "DoWhileStatement":
    case "ForInStatement":
    case "ForStatement":
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "Program":
    case "ObjectMethod":
    case "SwitchStatement":
    case "WhileStatement":
    case "ArrowFunctionExpression":
    case "ForOfStatement":
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "StaticBlock":
    case "TSModuleBlock":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "BlockStatement":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isBlock(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Block {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "BlockStatement":
    case "Program":
    case "TSModuleBlock":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "BlockStatement":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Statement {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "BlockStatement":
    case "BreakStatement":
    case "ContinueStatement":
    case "DebuggerStatement":
    case "DoWhileStatement":
    case "EmptyStatement":
    case "ExpressionStatement":
    case "ForInStatement":
    case "ForStatement":
    case "FunctionDeclaration":
    case "IfStatement":
    case "LabeledStatement":
    case "ReturnStatement":
    case "SwitchStatement":
    case "ThrowStatement":
    case "TryStatement":
    case "VariableDeclaration":
    case "WhileStatement":
    case "WithStatement":
    case "ClassDeclaration":
    case "ExportAllDeclaration":
    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
    case "ForOfStatement":
    case "ImportDeclaration":
    case "DeclareClass":
    case "DeclareFunction":
    case "DeclareInterface":
    case "DeclareModule":
    case "DeclareModuleExports":
    case "DeclareTypeAlias":
    case "DeclareOpaqueType":
    case "DeclareVariable":
    case "DeclareExportDeclaration":
    case "DeclareExportAllDeclaration":
    case "InterfaceDeclaration":
    case "OpaqueType":
    case "TypeAlias":
    case "EnumDeclaration":
    case "TSDeclareFunction":
    case "TSInterfaceDeclaration":
    case "TSTypeAliasDeclaration":
    case "TSEnumDeclaration":
    case "TSModuleDeclaration":
    case "TSImportEqualsDeclaration":
    case "TSExportAssignment":
    case "TSNamespaceExportDeclaration":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "Statement":
        case "Declaration":
        case "BlockStatement":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isTerminatorless(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Terminatorless {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "BreakStatement":
    case "ContinueStatement":
    case "ReturnStatement":
    case "ThrowStatement":
    case "YieldExpression":
    case "AwaitExpression":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isCompletionStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.CompletionStatement {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "BreakStatement":
    case "ContinueStatement":
    case "ReturnStatement":
    case "ThrowStatement":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isConditional(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Conditional {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ConditionalExpression":
    case "IfStatement":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isLoop(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Loop {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "DoWhileStatement":
    case "ForInStatement":
    case "ForStatement":
    case "WhileStatement":
    case "ForOfStatement":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isWhile(
  node: object | null | undefined,
  opts?: object | null,
): node is t.While {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "DoWhileStatement":
    case "WhileStatement":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isExpressionWrapper(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ExpressionWrapper {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ExpressionStatement":
    case "ParenthesizedExpression":
    case "TypeCastExpression":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isFor(
  node: object | null | undefined,
  opts?: object | null,
): node is t.For {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ForInStatement":
    case "ForStatement":
    case "ForOfStatement":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isForXStatement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ForXStatement {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ForInStatement":
    case "ForOfStatement":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isFunction(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Function {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "ObjectMethod":
    case "ArrowFunctionExpression":
    case "ClassMethod":
    case "ClassPrivateMethod":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isFunctionParent(
  node: object | null | undefined,
  opts?: object | null,
): node is t.FunctionParent {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "ObjectMethod":
    case "ArrowFunctionExpression":
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "StaticBlock":
    case "TSModuleBlock":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isPureish(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Pureish {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "StringLiteral":
    case "NumericLiteral":
    case "NullLiteral":
    case "BooleanLiteral":
    case "RegExpLiteral":
    case "ArrowFunctionExpression":
    case "BigIntLiteral":
    case "DecimalLiteral":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "StringLiteral":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Declaration {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "FunctionDeclaration":
    case "VariableDeclaration":
    case "ClassDeclaration":
    case "ExportAllDeclaration":
    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
    case "ImportDeclaration":
    case "DeclareClass":
    case "DeclareFunction":
    case "DeclareInterface":
    case "DeclareModule":
    case "DeclareModuleExports":
    case "DeclareTypeAlias":
    case "DeclareOpaqueType":
    case "DeclareVariable":
    case "DeclareExportDeclaration":
    case "DeclareExportAllDeclaration":
    case "InterfaceDeclaration":
    case "OpaqueType":
    case "TypeAlias":
    case "EnumDeclaration":
    case "TSDeclareFunction":
    case "TSInterfaceDeclaration":
    case "TSTypeAliasDeclaration":
    case "TSEnumDeclaration":
    case "TSModuleDeclaration":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "Declaration":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isPatternLike(
  node: object | null | undefined,
  opts?: object | null,
): node is t.PatternLike {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "Identifier":
    case "RestElement":
    case "AssignmentPattern":
    case "ArrayPattern":
    case "ObjectPattern":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSTypeAssertion":
    case "TSNonNullExpression":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "Pattern":
        case "Identifier":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isLVal(
  node: object | null | undefined,
  opts?: object | null,
): node is t.LVal {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "Identifier":
    case "MemberExpression":
    case "RestElement":
    case "AssignmentPattern":
    case "ArrayPattern":
    case "ObjectPattern":
    case "TSParameterProperty":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSTypeAssertion":
    case "TSNonNullExpression":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "Pattern":
        case "Identifier":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isTSEntityName(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSEntityName {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "Identifier":
    case "TSQualifiedName":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "Identifier":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isLiteral(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Literal {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "StringLiteral":
    case "NumericLiteral":
    case "NullLiteral":
    case "BooleanLiteral":
    case "RegExpLiteral":
    case "TemplateLiteral":
    case "BigIntLiteral":
    case "DecimalLiteral":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "StringLiteral":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isImmutable(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Immutable {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "StringLiteral":
    case "NumericLiteral":
    case "NullLiteral":
    case "BooleanLiteral":
    case "BigIntLiteral":
    case "JSXAttribute":
    case "JSXClosingElement":
    case "JSXElement":
    case "JSXExpressionContainer":
    case "JSXSpreadChild":
    case "JSXOpeningElement":
    case "JSXText":
    case "JSXFragment":
    case "JSXOpeningFragment":
    case "JSXClosingFragment":
    case "DecimalLiteral":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "StringLiteral":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isUserWhitespacable(
  node: object | null | undefined,
  opts?: object | null,
): node is t.UserWhitespacable {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ObjectMethod":
    case "ObjectProperty":
    case "ObjectTypeInternalSlot":
    case "ObjectTypeCallProperty":
    case "ObjectTypeIndexer":
    case "ObjectTypeProperty":
    case "ObjectTypeSpreadProperty":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isMethod(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Method {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ObjectMethod":
    case "ClassMethod":
    case "ClassPrivateMethod":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isObjectMember(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ObjectMember {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ObjectMethod":
    case "ObjectProperty":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isProperty(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Property {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ObjectProperty":
    case "ClassProperty":
    case "ClassAccessorProperty":
    case "ClassPrivateProperty":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isUnaryLike(
  node: object | null | undefined,
  opts?: object | null,
): node is t.UnaryLike {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "UnaryExpression":
    case "SpreadElement":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isPattern(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Pattern {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "AssignmentPattern":
    case "ArrayPattern":
    case "ObjectPattern":
      break;
    case "Placeholder":
      switch ((node as t.Placeholder).expectedNode) {
        case "Pattern":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isClass(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Class {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ClassExpression":
    case "ClassDeclaration":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isImportOrExportDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ImportOrExportDeclaration {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ExportAllDeclaration":
    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
    case "ImportDeclaration":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isExportDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ExportDeclaration {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ExportAllDeclaration":
    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isModuleSpecifier(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ModuleSpecifier {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ExportSpecifier":
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
    case "ExportNamespaceSpecifier":
    case "ExportDefaultSpecifier":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isAccessor(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Accessor {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ClassAccessorProperty":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isPrivate(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Private {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "ClassPrivateProperty":
    case "ClassPrivateMethod":
    case "PrivateName":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isFlow(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Flow {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "AnyTypeAnnotation":
    case "ArrayTypeAnnotation":
    case "BooleanTypeAnnotation":
    case "BooleanLiteralTypeAnnotation":
    case "NullLiteralTypeAnnotation":
    case "ClassImplements":
    case "DeclareClass":
    case "DeclareFunction":
    case "DeclareInterface":
    case "DeclareModule":
    case "DeclareModuleExports":
    case "DeclareTypeAlias":
    case "DeclareOpaqueType":
    case "DeclareVariable":
    case "DeclareExportDeclaration":
    case "DeclareExportAllDeclaration":
    case "DeclaredPredicate":
    case "ExistsTypeAnnotation":
    case "FunctionTypeAnnotation":
    case "FunctionTypeParam":
    case "GenericTypeAnnotation":
    case "InferredPredicate":
    case "InterfaceExtends":
    case "InterfaceDeclaration":
    case "InterfaceTypeAnnotation":
    case "IntersectionTypeAnnotation":
    case "MixedTypeAnnotation":
    case "EmptyTypeAnnotation":
    case "NullableTypeAnnotation":
    case "NumberLiteralTypeAnnotation":
    case "NumberTypeAnnotation":
    case "ObjectTypeAnnotation":
    case "ObjectTypeInternalSlot":
    case "ObjectTypeCallProperty":
    case "ObjectTypeIndexer":
    case "ObjectTypeProperty":
    case "ObjectTypeSpreadProperty":
    case "OpaqueType":
    case "QualifiedTypeIdentifier":
    case "StringLiteralTypeAnnotation":
    case "StringTypeAnnotation":
    case "SymbolTypeAnnotation":
    case "ThisTypeAnnotation":
    case "TupleTypeAnnotation":
    case "TypeofTypeAnnotation":
    case "TypeAlias":
    case "TypeAnnotation":
    case "TypeCastExpression":
    case "TypeParameter":
    case "TypeParameterDeclaration":
    case "TypeParameterInstantiation":
    case "UnionTypeAnnotation":
    case "Variance":
    case "VoidTypeAnnotation":
    case "EnumDeclaration":
    case "EnumBooleanBody":
    case "EnumNumberBody":
    case "EnumStringBody":
    case "EnumSymbolBody":
    case "EnumBooleanMember":
    case "EnumNumberMember":
    case "EnumStringMember":
    case "EnumDefaultedMember":
    case "IndexedAccessType":
    case "OptionalIndexedAccessType":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isFlowType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.FlowType {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "AnyTypeAnnotation":
    case "ArrayTypeAnnotation":
    case "BooleanTypeAnnotation":
    case "BooleanLiteralTypeAnnotation":
    case "NullLiteralTypeAnnotation":
    case "ExistsTypeAnnotation":
    case "FunctionTypeAnnotation":
    case "GenericTypeAnnotation":
    case "InterfaceTypeAnnotation":
    case "IntersectionTypeAnnotation":
    case "MixedTypeAnnotation":
    case "EmptyTypeAnnotation":
    case "NullableTypeAnnotation":
    case "NumberLiteralTypeAnnotation":
    case "NumberTypeAnnotation":
    case "ObjectTypeAnnotation":
    case "StringLiteralTypeAnnotation":
    case "StringTypeAnnotation":
    case "SymbolTypeAnnotation":
    case "ThisTypeAnnotation":
    case "TupleTypeAnnotation":
    case "TypeofTypeAnnotation":
    case "UnionTypeAnnotation":
    case "VoidTypeAnnotation":
    case "IndexedAccessType":
    case "OptionalIndexedAccessType":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isFlowBaseAnnotation(
  node: object | null | undefined,
  opts?: object | null,
): node is t.FlowBaseAnnotation {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "AnyTypeAnnotation":
    case "BooleanTypeAnnotation":
    case "NullLiteralTypeAnnotation":
    case "MixedTypeAnnotation":
    case "EmptyTypeAnnotation":
    case "NumberTypeAnnotation":
    case "StringTypeAnnotation":
    case "SymbolTypeAnnotation":
    case "ThisTypeAnnotation":
    case "VoidTypeAnnotation":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isFlowDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.FlowDeclaration {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "DeclareClass":
    case "DeclareFunction":
    case "DeclareInterface":
    case "DeclareModule":
    case "DeclareModuleExports":
    case "DeclareTypeAlias":
    case "DeclareOpaqueType":
    case "DeclareVariable":
    case "DeclareExportDeclaration":
    case "DeclareExportAllDeclaration":
    case "InterfaceDeclaration":
    case "OpaqueType":
    case "TypeAlias":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isFlowPredicate(
  node: object | null | undefined,
  opts?: object | null,
): node is t.FlowPredicate {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "DeclaredPredicate":
    case "InferredPredicate":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isEnumBody(
  node: object | null | undefined,
  opts?: object | null,
): node is t.EnumBody {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "EnumBooleanBody":
    case "EnumNumberBody":
    case "EnumStringBody":
    case "EnumSymbolBody":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isEnumMember(
  node: object | null | undefined,
  opts?: object | null,
): node is t.EnumMember {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "EnumBooleanMember":
    case "EnumNumberMember":
    case "EnumStringMember":
    case "EnumDefaultedMember":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isJSX(
  node: object | null | undefined,
  opts?: object | null,
): node is t.JSX {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "JSXAttribute":
    case "JSXClosingElement":
    case "JSXElement":
    case "JSXEmptyExpression":
    case "JSXExpressionContainer":
    case "JSXSpreadChild":
    case "JSXIdentifier":
    case "JSXMemberExpression":
    case "JSXNamespacedName":
    case "JSXOpeningElement":
    case "JSXSpreadAttribute":
    case "JSXText":
    case "JSXFragment":
    case "JSXOpeningFragment":
    case "JSXClosingFragment":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isMiscellaneous(
  node: object | null | undefined,
  opts?: object | null,
): node is t.Miscellaneous {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "Noop":
    case "Placeholder":
    case "V8IntrinsicIdentifier":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isTypeScript(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TypeScript {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "TSParameterProperty":
    case "TSDeclareFunction":
    case "TSDeclareMethod":
    case "TSQualifiedName":
    case "TSCallSignatureDeclaration":
    case "TSConstructSignatureDeclaration":
    case "TSPropertySignature":
    case "TSMethodSignature":
    case "TSIndexSignature":
    case "TSAnyKeyword":
    case "TSBooleanKeyword":
    case "TSBigIntKeyword":
    case "TSIntrinsicKeyword":
    case "TSNeverKeyword":
    case "TSNullKeyword":
    case "TSNumberKeyword":
    case "TSObjectKeyword":
    case "TSStringKeyword":
    case "TSSymbolKeyword":
    case "TSUndefinedKeyword":
    case "TSUnknownKeyword":
    case "TSVoidKeyword":
    case "TSThisType":
    case "TSFunctionType":
    case "TSConstructorType":
    case "TSTypeReference":
    case "TSTypePredicate":
    case "TSTypeQuery":
    case "TSTypeLiteral":
    case "TSArrayType":
    case "TSTupleType":
    case "TSOptionalType":
    case "TSRestType":
    case "TSNamedTupleMember":
    case "TSUnionType":
    case "TSIntersectionType":
    case "TSConditionalType":
    case "TSInferType":
    case "TSParenthesizedType":
    case "TSTypeOperator":
    case "TSIndexedAccessType":
    case "TSMappedType":
    case "TSLiteralType":
    case "TSExpressionWithTypeArguments":
    case "TSInterfaceDeclaration":
    case "TSInterfaceBody":
    case "TSTypeAliasDeclaration":
    case "TSInstantiationExpression":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSTypeAssertion":
    case "TSEnumDeclaration":
    case "TSEnumMember":
    case "TSModuleDeclaration":
    case "TSModuleBlock":
    case "TSImportType":
    case "TSImportEqualsDeclaration":
    case "TSExternalModuleReference":
    case "TSNonNullExpression":
    case "TSExportAssignment":
    case "TSNamespaceExportDeclaration":
    case "TSTypeAnnotation":
    case "TSTypeParameterInstantiation":
    case "TSTypeParameterDeclaration":
    case "TSTypeParameter":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeElement(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSTypeElement {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "TSCallSignatureDeclaration":
    case "TSConstructSignatureDeclaration":
    case "TSPropertySignature":
    case "TSMethodSignature":
    case "TSIndexSignature":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isTSType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSType {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "TSAnyKeyword":
    case "TSBooleanKeyword":
    case "TSBigIntKeyword":
    case "TSIntrinsicKeyword":
    case "TSNeverKeyword":
    case "TSNullKeyword":
    case "TSNumberKeyword":
    case "TSObjectKeyword":
    case "TSStringKeyword":
    case "TSSymbolKeyword":
    case "TSUndefinedKeyword":
    case "TSUnknownKeyword":
    case "TSVoidKeyword":
    case "TSThisType":
    case "TSFunctionType":
    case "TSConstructorType":
    case "TSTypeReference":
    case "TSTypePredicate":
    case "TSTypeQuery":
    case "TSTypeLiteral":
    case "TSArrayType":
    case "TSTupleType":
    case "TSOptionalType":
    case "TSRestType":
    case "TSUnionType":
    case "TSIntersectionType":
    case "TSConditionalType":
    case "TSInferType":
    case "TSParenthesizedType":
    case "TSTypeOperator":
    case "TSIndexedAccessType":
    case "TSMappedType":
    case "TSLiteralType":
    case "TSExpressionWithTypeArguments":
    case "TSImportType":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isTSBaseType(
  node: object | null | undefined,
  opts?: object | null,
): node is t.TSBaseType {
  if (!node) return false;

  switch ((node as t.Node).type) {
    case "TSAnyKeyword":
    case "TSBooleanKeyword":
    case "TSBigIntKeyword":
    case "TSIntrinsicKeyword":
    case "TSNeverKeyword":
    case "TSNullKeyword":
    case "TSNumberKeyword":
    case "TSObjectKeyword":
    case "TSStringKeyword":
    case "TSSymbolKeyword":
    case "TSUndefinedKeyword":
    case "TSUnknownKeyword":
    case "TSVoidKeyword":
    case "TSThisType":
    case "TSLiteralType":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isNumberLiteral(
  node: object | null | undefined,
  opts?: object | null,
): boolean {
  deprecationWarning("isNumberLiteral", "isNumericLiteral");
  if (!node) return false;

  if ((node as t.Node).type !== "NumberLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isRegexLiteral(
  node: object | null | undefined,
  opts?: object | null,
): boolean {
  deprecationWarning("isRegexLiteral", "isRegExpLiteral");
  if (!node) return false;

  if ((node as t.Node).type !== "RegexLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isRestProperty(
  node: object | null | undefined,
  opts?: object | null,
): boolean {
  deprecationWarning("isRestProperty", "isRestElement");
  if (!node) return false;

  if ((node as t.Node).type !== "RestProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isSpreadProperty(
  node: object | null | undefined,
  opts?: object | null,
): boolean {
  deprecationWarning("isSpreadProperty", "isSpreadElement");
  if (!node) return false;

  if ((node as t.Node).type !== "SpreadProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isModuleDeclaration(
  node: object | null | undefined,
  opts?: object | null,
): node is t.ImportOrExportDeclaration {
  deprecationWarning("isModuleDeclaration", "isImportOrExportDeclaration");
  return isImportOrExportDeclaration(node, opts);
}
