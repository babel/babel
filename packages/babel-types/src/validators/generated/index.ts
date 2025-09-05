/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */

/* eslint-disable no-fallthrough */

import shallowEqual from "../../utils/shallowEqual.ts";
import type * as t from "../../index.ts";
import deprecationWarning from "../../utils/deprecationWarning.ts";

type Options<Obj> = Partial<{
  [Prop in Exclude<keyof Obj, "type">]: Obj[Prop] extends t.Node
    ? t.Node
    : Obj[Prop] extends t.Node[]
      ? t.Node[]
      : Obj[Prop];
}>;

export function isArrayExpression(
  node: t.Node | null | undefined,
): node is t.ArrayExpression;
export function isArrayExpression<Opts extends Options<t.ArrayExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ArrayExpression & Opts;
export function isArrayExpression<Opts extends Options<t.ArrayExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ArrayExpression & Opts {
  if (!node) return false;

  if (node.type !== "ArrayExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isAssignmentExpression(
  node: t.Node | null | undefined,
): node is t.AssignmentExpression;
export function isAssignmentExpression<
  Opts extends Options<t.AssignmentExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.AssignmentExpression & Opts;
export function isAssignmentExpression<
  Opts extends Options<t.AssignmentExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.AssignmentExpression & Opts {
  if (!node) return false;

  if (node.type !== "AssignmentExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBinaryExpression(
  node: t.Node | null | undefined,
): node is t.BinaryExpression;
export function isBinaryExpression<Opts extends Options<t.BinaryExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BinaryExpression & Opts;
export function isBinaryExpression<Opts extends Options<t.BinaryExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BinaryExpression & Opts {
  if (!node) return false;

  if (node.type !== "BinaryExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isInterpreterDirective(
  node: t.Node | null | undefined,
): node is t.InterpreterDirective;
export function isInterpreterDirective<
  Opts extends Options<t.InterpreterDirective>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.InterpreterDirective & Opts;
export function isInterpreterDirective<
  Opts extends Options<t.InterpreterDirective>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.InterpreterDirective & Opts {
  if (!node) return false;

  if (node.type !== "InterpreterDirective") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDirective(
  node: t.Node | null | undefined,
): node is t.Directive;
export function isDirective<Opts extends Options<t.Directive>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Directive & Opts;
export function isDirective<Opts extends Options<t.Directive>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Directive & Opts {
  if (!node) return false;

  if (node.type !== "Directive") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDirectiveLiteral(
  node: t.Node | null | undefined,
): node is t.DirectiveLiteral;
export function isDirectiveLiteral<Opts extends Options<t.DirectiveLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DirectiveLiteral & Opts;
export function isDirectiveLiteral<Opts extends Options<t.DirectiveLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DirectiveLiteral & Opts {
  if (!node) return false;

  if (node.type !== "DirectiveLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBlockStatement(
  node: t.Node | null | undefined,
): node is t.BlockStatement;
export function isBlockStatement<Opts extends Options<t.BlockStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BlockStatement & Opts;
export function isBlockStatement<Opts extends Options<t.BlockStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BlockStatement & Opts {
  if (!node) return false;

  if (node.type !== "BlockStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBreakStatement(
  node: t.Node | null | undefined,
): node is t.BreakStatement;
export function isBreakStatement<Opts extends Options<t.BreakStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BreakStatement & Opts;
export function isBreakStatement<Opts extends Options<t.BreakStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BreakStatement & Opts {
  if (!node) return false;

  if (node.type !== "BreakStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isCallExpression(
  node: t.Node | null | undefined,
): node is t.CallExpression;
export function isCallExpression<Opts extends Options<t.CallExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.CallExpression & Opts;
export function isCallExpression<Opts extends Options<t.CallExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.CallExpression & Opts {
  if (!node) return false;

  if (node.type !== "CallExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isCatchClause(
  node: t.Node | null | undefined,
): node is t.CatchClause;
export function isCatchClause<Opts extends Options<t.CatchClause>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.CatchClause & Opts;
export function isCatchClause<Opts extends Options<t.CatchClause>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.CatchClause & Opts {
  if (!node) return false;

  if (node.type !== "CatchClause") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isConditionalExpression(
  node: t.Node | null | undefined,
): node is t.ConditionalExpression;
export function isConditionalExpression<
  Opts extends Options<t.ConditionalExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ConditionalExpression & Opts;
export function isConditionalExpression<
  Opts extends Options<t.ConditionalExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ConditionalExpression & Opts {
  if (!node) return false;

  if (node.type !== "ConditionalExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isContinueStatement(
  node: t.Node | null | undefined,
): node is t.ContinueStatement;
export function isContinueStatement<Opts extends Options<t.ContinueStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ContinueStatement & Opts;
export function isContinueStatement<Opts extends Options<t.ContinueStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ContinueStatement & Opts {
  if (!node) return false;

  if (node.type !== "ContinueStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDebuggerStatement(
  node: t.Node | null | undefined,
): node is t.DebuggerStatement;
export function isDebuggerStatement<Opts extends Options<t.DebuggerStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DebuggerStatement & Opts;
export function isDebuggerStatement<Opts extends Options<t.DebuggerStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DebuggerStatement & Opts {
  if (!node) return false;

  if (node.type !== "DebuggerStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDoWhileStatement(
  node: t.Node | null | undefined,
): node is t.DoWhileStatement;
export function isDoWhileStatement<Opts extends Options<t.DoWhileStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DoWhileStatement & Opts;
export function isDoWhileStatement<Opts extends Options<t.DoWhileStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DoWhileStatement & Opts {
  if (!node) return false;

  if (node.type !== "DoWhileStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEmptyStatement(
  node: t.Node | null | undefined,
): node is t.EmptyStatement;
export function isEmptyStatement<Opts extends Options<t.EmptyStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EmptyStatement & Opts;
export function isEmptyStatement<Opts extends Options<t.EmptyStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EmptyStatement & Opts {
  if (!node) return false;

  if (node.type !== "EmptyStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExpressionStatement(
  node: t.Node | null | undefined,
): node is t.ExpressionStatement;
export function isExpressionStatement<
  Opts extends Options<t.ExpressionStatement>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExpressionStatement & Opts;
export function isExpressionStatement<
  Opts extends Options<t.ExpressionStatement>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExpressionStatement & Opts {
  if (!node) return false;

  if (node.type !== "ExpressionStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isFile(node: t.Node | null | undefined): node is t.File;
export function isFile<Opts extends Options<t.File>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.File & Opts;
export function isFile<Opts extends Options<t.File>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.File & Opts {
  if (!node) return false;

  if (node.type !== "File") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isForInStatement(
  node: t.Node | null | undefined,
): node is t.ForInStatement;
export function isForInStatement<Opts extends Options<t.ForInStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ForInStatement & Opts;
export function isForInStatement<Opts extends Options<t.ForInStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ForInStatement & Opts {
  if (!node) return false;

  if (node.type !== "ForInStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isForStatement(
  node: t.Node | null | undefined,
): node is t.ForStatement;
export function isForStatement<Opts extends Options<t.ForStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ForStatement & Opts;
export function isForStatement<Opts extends Options<t.ForStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ForStatement & Opts {
  if (!node) return false;

  if (node.type !== "ForStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isFunctionDeclaration(
  node: t.Node | null | undefined,
): node is t.FunctionDeclaration;
export function isFunctionDeclaration<
  Opts extends Options<t.FunctionDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FunctionDeclaration & Opts;
export function isFunctionDeclaration<
  Opts extends Options<t.FunctionDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FunctionDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "FunctionDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isFunctionExpression(
  node: t.Node | null | undefined,
): node is t.FunctionExpression;
export function isFunctionExpression<
  Opts extends Options<t.FunctionExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FunctionExpression & Opts;
export function isFunctionExpression<
  Opts extends Options<t.FunctionExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FunctionExpression & Opts {
  if (!node) return false;

  if (node.type !== "FunctionExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isIdentifier(
  node: t.Node | null | undefined,
): node is t.Identifier;
export function isIdentifier<Opts extends Options<t.Identifier>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Identifier & Opts;
export function isIdentifier<Opts extends Options<t.Identifier>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Identifier & Opts {
  if (!node) return false;

  if (node.type !== "Identifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isIfStatement(
  node: t.Node | null | undefined,
): node is t.IfStatement;
export function isIfStatement<Opts extends Options<t.IfStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.IfStatement & Opts;
export function isIfStatement<Opts extends Options<t.IfStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.IfStatement & Opts {
  if (!node) return false;

  if (node.type !== "IfStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isLabeledStatement(
  node: t.Node | null | undefined,
): node is t.LabeledStatement;
export function isLabeledStatement<Opts extends Options<t.LabeledStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.LabeledStatement & Opts;
export function isLabeledStatement<Opts extends Options<t.LabeledStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.LabeledStatement & Opts {
  if (!node) return false;

  if (node.type !== "LabeledStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isStringLiteral(
  node: t.Node | null | undefined,
): node is t.StringLiteral;
export function isStringLiteral<Opts extends Options<t.StringLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.StringLiteral & Opts;
export function isStringLiteral<Opts extends Options<t.StringLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.StringLiteral & Opts {
  if (!node) return false;

  if (node.type !== "StringLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNumericLiteral(
  node: t.Node | null | undefined,
): node is t.NumericLiteral;
export function isNumericLiteral<Opts extends Options<t.NumericLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NumericLiteral & Opts;
export function isNumericLiteral<Opts extends Options<t.NumericLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NumericLiteral & Opts {
  if (!node) return false;

  if (node.type !== "NumericLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNullLiteral(
  node: t.Node | null | undefined,
): node is t.NullLiteral;
export function isNullLiteral<Opts extends Options<t.NullLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NullLiteral & Opts;
export function isNullLiteral<Opts extends Options<t.NullLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NullLiteral & Opts {
  if (!node) return false;

  if (node.type !== "NullLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBooleanLiteral(
  node: t.Node | null | undefined,
): node is t.BooleanLiteral;
export function isBooleanLiteral<Opts extends Options<t.BooleanLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BooleanLiteral & Opts;
export function isBooleanLiteral<Opts extends Options<t.BooleanLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BooleanLiteral & Opts {
  if (!node) return false;

  if (node.type !== "BooleanLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isRegExpLiteral(
  node: t.Node | null | undefined,
): node is t.RegExpLiteral;
export function isRegExpLiteral<Opts extends Options<t.RegExpLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.RegExpLiteral & Opts;
export function isRegExpLiteral<Opts extends Options<t.RegExpLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.RegExpLiteral & Opts {
  if (!node) return false;

  if (node.type !== "RegExpLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isLogicalExpression(
  node: t.Node | null | undefined,
): node is t.LogicalExpression;
export function isLogicalExpression<Opts extends Options<t.LogicalExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.LogicalExpression & Opts;
export function isLogicalExpression<Opts extends Options<t.LogicalExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.LogicalExpression & Opts {
  if (!node) return false;

  if (node.type !== "LogicalExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isMemberExpression(
  node: t.Node | null | undefined,
): node is t.MemberExpression;
export function isMemberExpression<Opts extends Options<t.MemberExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.MemberExpression & Opts;
export function isMemberExpression<Opts extends Options<t.MemberExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.MemberExpression & Opts {
  if (!node) return false;

  if (node.type !== "MemberExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNewExpression(
  node: t.Node | null | undefined,
): node is t.NewExpression;
export function isNewExpression<Opts extends Options<t.NewExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NewExpression & Opts;
export function isNewExpression<Opts extends Options<t.NewExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NewExpression & Opts {
  if (!node) return false;

  if (node.type !== "NewExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isProgram(node: t.Node | null | undefined): node is t.Program;
export function isProgram<Opts extends Options<t.Program>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Program & Opts;
export function isProgram<Opts extends Options<t.Program>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Program & Opts {
  if (!node) return false;

  if (node.type !== "Program") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectExpression(
  node: t.Node | null | undefined,
): node is t.ObjectExpression;
export function isObjectExpression<Opts extends Options<t.ObjectExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectExpression & Opts;
export function isObjectExpression<Opts extends Options<t.ObjectExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectExpression & Opts {
  if (!node) return false;

  if (node.type !== "ObjectExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectMethod(
  node: t.Node | null | undefined,
): node is t.ObjectMethod;
export function isObjectMethod<Opts extends Options<t.ObjectMethod>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectMethod & Opts;
export function isObjectMethod<Opts extends Options<t.ObjectMethod>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectMethod & Opts {
  if (!node) return false;

  if (node.type !== "ObjectMethod") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectProperty(
  node: t.Node | null | undefined,
): node is t.ObjectProperty;
export function isObjectProperty<Opts extends Options<t.ObjectProperty>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectProperty & Opts;
export function isObjectProperty<Opts extends Options<t.ObjectProperty>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectProperty & Opts {
  if (!node) return false;

  if (node.type !== "ObjectProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isRestElement(
  node: t.Node | null | undefined,
): node is t.RestElement;
export function isRestElement<Opts extends Options<t.RestElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.RestElement & Opts;
export function isRestElement<Opts extends Options<t.RestElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.RestElement & Opts {
  if (!node) return false;

  if (node.type !== "RestElement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isReturnStatement(
  node: t.Node | null | undefined,
): node is t.ReturnStatement;
export function isReturnStatement<Opts extends Options<t.ReturnStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ReturnStatement & Opts;
export function isReturnStatement<Opts extends Options<t.ReturnStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ReturnStatement & Opts {
  if (!node) return false;

  if (node.type !== "ReturnStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isSequenceExpression(
  node: t.Node | null | undefined,
): node is t.SequenceExpression;
export function isSequenceExpression<
  Opts extends Options<t.SequenceExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.SequenceExpression & Opts;
export function isSequenceExpression<
  Opts extends Options<t.SequenceExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.SequenceExpression & Opts {
  if (!node) return false;

  if (node.type !== "SequenceExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isParenthesizedExpression(
  node: t.Node | null | undefined,
): node is t.ParenthesizedExpression;
export function isParenthesizedExpression<
  Opts extends Options<t.ParenthesizedExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ParenthesizedExpression & Opts;
export function isParenthesizedExpression<
  Opts extends Options<t.ParenthesizedExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ParenthesizedExpression & Opts {
  if (!node) return false;

  if (node.type !== "ParenthesizedExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isSwitchCase(
  node: t.Node | null | undefined,
): node is t.SwitchCase;
export function isSwitchCase<Opts extends Options<t.SwitchCase>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.SwitchCase & Opts;
export function isSwitchCase<Opts extends Options<t.SwitchCase>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.SwitchCase & Opts {
  if (!node) return false;

  if (node.type !== "SwitchCase") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isSwitchStatement(
  node: t.Node | null | undefined,
): node is t.SwitchStatement;
export function isSwitchStatement<Opts extends Options<t.SwitchStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.SwitchStatement & Opts;
export function isSwitchStatement<Opts extends Options<t.SwitchStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.SwitchStatement & Opts {
  if (!node) return false;

  if (node.type !== "SwitchStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isThisExpression(
  node: t.Node | null | undefined,
): node is t.ThisExpression;
export function isThisExpression<Opts extends Options<t.ThisExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ThisExpression & Opts;
export function isThisExpression<Opts extends Options<t.ThisExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ThisExpression & Opts {
  if (!node) return false;

  if (node.type !== "ThisExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isThrowStatement(
  node: t.Node | null | undefined,
): node is t.ThrowStatement;
export function isThrowStatement<Opts extends Options<t.ThrowStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ThrowStatement & Opts;
export function isThrowStatement<Opts extends Options<t.ThrowStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ThrowStatement & Opts {
  if (!node) return false;

  if (node.type !== "ThrowStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTryStatement(
  node: t.Node | null | undefined,
): node is t.TryStatement;
export function isTryStatement<Opts extends Options<t.TryStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TryStatement & Opts;
export function isTryStatement<Opts extends Options<t.TryStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TryStatement & Opts {
  if (!node) return false;

  if (node.type !== "TryStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isUnaryExpression(
  node: t.Node | null | undefined,
): node is t.UnaryExpression;
export function isUnaryExpression<Opts extends Options<t.UnaryExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.UnaryExpression & Opts;
export function isUnaryExpression<Opts extends Options<t.UnaryExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.UnaryExpression & Opts {
  if (!node) return false;

  if (node.type !== "UnaryExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isUpdateExpression(
  node: t.Node | null | undefined,
): node is t.UpdateExpression;
export function isUpdateExpression<Opts extends Options<t.UpdateExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.UpdateExpression & Opts;
export function isUpdateExpression<Opts extends Options<t.UpdateExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.UpdateExpression & Opts {
  if (!node) return false;

  if (node.type !== "UpdateExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isVariableDeclaration(
  node: t.Node | null | undefined,
): node is t.VariableDeclaration;
export function isVariableDeclaration<
  Opts extends Options<t.VariableDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.VariableDeclaration & Opts;
export function isVariableDeclaration<
  Opts extends Options<t.VariableDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.VariableDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "VariableDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isVariableDeclarator(
  node: t.Node | null | undefined,
): node is t.VariableDeclarator;
export function isVariableDeclarator<
  Opts extends Options<t.VariableDeclarator>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.VariableDeclarator & Opts;
export function isVariableDeclarator<
  Opts extends Options<t.VariableDeclarator>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.VariableDeclarator & Opts {
  if (!node) return false;

  if (node.type !== "VariableDeclarator") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isWhileStatement(
  node: t.Node | null | undefined,
): node is t.WhileStatement;
export function isWhileStatement<Opts extends Options<t.WhileStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.WhileStatement & Opts;
export function isWhileStatement<Opts extends Options<t.WhileStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.WhileStatement & Opts {
  if (!node) return false;

  if (node.type !== "WhileStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isWithStatement(
  node: t.Node | null | undefined,
): node is t.WithStatement;
export function isWithStatement<Opts extends Options<t.WithStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.WithStatement & Opts;
export function isWithStatement<Opts extends Options<t.WithStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.WithStatement & Opts {
  if (!node) return false;

  if (node.type !== "WithStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isAssignmentPattern(
  node: t.Node | null | undefined,
): node is t.AssignmentPattern;
export function isAssignmentPattern<Opts extends Options<t.AssignmentPattern>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.AssignmentPattern & Opts;
export function isAssignmentPattern<Opts extends Options<t.AssignmentPattern>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.AssignmentPattern & Opts {
  if (!node) return false;

  if (node.type !== "AssignmentPattern") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isArrayPattern(
  node: t.Node | null | undefined,
): node is t.ArrayPattern;
export function isArrayPattern<Opts extends Options<t.ArrayPattern>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ArrayPattern & Opts;
export function isArrayPattern<Opts extends Options<t.ArrayPattern>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ArrayPattern & Opts {
  if (!node) return false;

  if (node.type !== "ArrayPattern") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isArrowFunctionExpression(
  node: t.Node | null | undefined,
): node is t.ArrowFunctionExpression;
export function isArrowFunctionExpression<
  Opts extends Options<t.ArrowFunctionExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ArrowFunctionExpression & Opts;
export function isArrowFunctionExpression<
  Opts extends Options<t.ArrowFunctionExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ArrowFunctionExpression & Opts {
  if (!node) return false;

  if (node.type !== "ArrowFunctionExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassBody(
  node: t.Node | null | undefined,
): node is t.ClassBody;
export function isClassBody<Opts extends Options<t.ClassBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassBody & Opts;
export function isClassBody<Opts extends Options<t.ClassBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassBody & Opts {
  if (!node) return false;

  if (node.type !== "ClassBody") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassExpression(
  node: t.Node | null | undefined,
): node is t.ClassExpression;
export function isClassExpression<Opts extends Options<t.ClassExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassExpression & Opts;
export function isClassExpression<Opts extends Options<t.ClassExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassExpression & Opts {
  if (!node) return false;

  if (node.type !== "ClassExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassDeclaration(
  node: t.Node | null | undefined,
): node is t.ClassDeclaration;
export function isClassDeclaration<Opts extends Options<t.ClassDeclaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassDeclaration & Opts;
export function isClassDeclaration<Opts extends Options<t.ClassDeclaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "ClassDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExportAllDeclaration(
  node: t.Node | null | undefined,
): node is t.ExportAllDeclaration;
export function isExportAllDeclaration<
  Opts extends Options<t.ExportAllDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportAllDeclaration & Opts;
export function isExportAllDeclaration<
  Opts extends Options<t.ExportAllDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportAllDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "ExportAllDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExportDefaultDeclaration(
  node: t.Node | null | undefined,
): node is t.ExportDefaultDeclaration;
export function isExportDefaultDeclaration<
  Opts extends Options<t.ExportDefaultDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportDefaultDeclaration & Opts;
export function isExportDefaultDeclaration<
  Opts extends Options<t.ExportDefaultDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportDefaultDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "ExportDefaultDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExportNamedDeclaration(
  node: t.Node | null | undefined,
): node is t.ExportNamedDeclaration;
export function isExportNamedDeclaration<
  Opts extends Options<t.ExportNamedDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportNamedDeclaration & Opts;
export function isExportNamedDeclaration<
  Opts extends Options<t.ExportNamedDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportNamedDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "ExportNamedDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExportSpecifier(
  node: t.Node | null | undefined,
): node is t.ExportSpecifier;
export function isExportSpecifier<Opts extends Options<t.ExportSpecifier>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportSpecifier & Opts;
export function isExportSpecifier<Opts extends Options<t.ExportSpecifier>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportSpecifier & Opts {
  if (!node) return false;

  if (node.type !== "ExportSpecifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isForOfStatement(
  node: t.Node | null | undefined,
): node is t.ForOfStatement;
export function isForOfStatement<Opts extends Options<t.ForOfStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ForOfStatement & Opts;
export function isForOfStatement<Opts extends Options<t.ForOfStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ForOfStatement & Opts {
  if (!node) return false;

  if (node.type !== "ForOfStatement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isImportDeclaration(
  node: t.Node | null | undefined,
): node is t.ImportDeclaration;
export function isImportDeclaration<Opts extends Options<t.ImportDeclaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportDeclaration & Opts;
export function isImportDeclaration<Opts extends Options<t.ImportDeclaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "ImportDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isImportDefaultSpecifier(
  node: t.Node | null | undefined,
): node is t.ImportDefaultSpecifier;
export function isImportDefaultSpecifier<
  Opts extends Options<t.ImportDefaultSpecifier>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportDefaultSpecifier & Opts;
export function isImportDefaultSpecifier<
  Opts extends Options<t.ImportDefaultSpecifier>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportDefaultSpecifier & Opts {
  if (!node) return false;

  if (node.type !== "ImportDefaultSpecifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isImportNamespaceSpecifier(
  node: t.Node | null | undefined,
): node is t.ImportNamespaceSpecifier;
export function isImportNamespaceSpecifier<
  Opts extends Options<t.ImportNamespaceSpecifier>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportNamespaceSpecifier & Opts;
export function isImportNamespaceSpecifier<
  Opts extends Options<t.ImportNamespaceSpecifier>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportNamespaceSpecifier & Opts {
  if (!node) return false;

  if (node.type !== "ImportNamespaceSpecifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isImportSpecifier(
  node: t.Node | null | undefined,
): node is t.ImportSpecifier;
export function isImportSpecifier<Opts extends Options<t.ImportSpecifier>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportSpecifier & Opts;
export function isImportSpecifier<Opts extends Options<t.ImportSpecifier>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportSpecifier & Opts {
  if (!node) return false;

  if (node.type !== "ImportSpecifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isImportExpression(
  node: t.Node | null | undefined,
): node is t.ImportExpression;
export function isImportExpression<Opts extends Options<t.ImportExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportExpression & Opts;
export function isImportExpression<Opts extends Options<t.ImportExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportExpression & Opts {
  if (!node) return false;

  if (node.type !== "ImportExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isMetaProperty(
  node: t.Node | null | undefined,
): node is t.MetaProperty;
export function isMetaProperty<Opts extends Options<t.MetaProperty>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.MetaProperty & Opts;
export function isMetaProperty<Opts extends Options<t.MetaProperty>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.MetaProperty & Opts {
  if (!node) return false;

  if (node.type !== "MetaProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassMethod(
  node: t.Node | null | undefined,
): node is t.ClassMethod;
export function isClassMethod<Opts extends Options<t.ClassMethod>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassMethod & Opts;
export function isClassMethod<Opts extends Options<t.ClassMethod>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassMethod & Opts {
  if (!node) return false;

  if (node.type !== "ClassMethod") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectPattern(
  node: t.Node | null | undefined,
): node is t.ObjectPattern;
export function isObjectPattern<Opts extends Options<t.ObjectPattern>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectPattern & Opts;
export function isObjectPattern<Opts extends Options<t.ObjectPattern>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectPattern & Opts {
  if (!node) return false;

  if (node.type !== "ObjectPattern") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isSpreadElement(
  node: t.Node | null | undefined,
): node is t.SpreadElement;
export function isSpreadElement<Opts extends Options<t.SpreadElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.SpreadElement & Opts;
export function isSpreadElement<Opts extends Options<t.SpreadElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.SpreadElement & Opts {
  if (!node) return false;

  if (node.type !== "SpreadElement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isSuper(node: t.Node | null | undefined): node is t.Super;
export function isSuper<Opts extends Options<t.Super>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Super & Opts;
export function isSuper<Opts extends Options<t.Super>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Super & Opts {
  if (!node) return false;

  if (node.type !== "Super") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTaggedTemplateExpression(
  node: t.Node | null | undefined,
): node is t.TaggedTemplateExpression;
export function isTaggedTemplateExpression<
  Opts extends Options<t.TaggedTemplateExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TaggedTemplateExpression & Opts;
export function isTaggedTemplateExpression<
  Opts extends Options<t.TaggedTemplateExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TaggedTemplateExpression & Opts {
  if (!node) return false;

  if (node.type !== "TaggedTemplateExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTemplateElement(
  node: t.Node | null | undefined,
): node is t.TemplateElement;
export function isTemplateElement<Opts extends Options<t.TemplateElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TemplateElement & Opts;
export function isTemplateElement<Opts extends Options<t.TemplateElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TemplateElement & Opts {
  if (!node) return false;

  if (node.type !== "TemplateElement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTemplateLiteral(
  node: t.Node | null | undefined,
): node is t.TemplateLiteral;
export function isTemplateLiteral<Opts extends Options<t.TemplateLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TemplateLiteral & Opts;
export function isTemplateLiteral<Opts extends Options<t.TemplateLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TemplateLiteral & Opts {
  if (!node) return false;

  if (node.type !== "TemplateLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isYieldExpression(
  node: t.Node | null | undefined,
): node is t.YieldExpression;
export function isYieldExpression<Opts extends Options<t.YieldExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.YieldExpression & Opts;
export function isYieldExpression<Opts extends Options<t.YieldExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.YieldExpression & Opts {
  if (!node) return false;

  if (node.type !== "YieldExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isAwaitExpression(
  node: t.Node | null | undefined,
): node is t.AwaitExpression;
export function isAwaitExpression<Opts extends Options<t.AwaitExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.AwaitExpression & Opts;
export function isAwaitExpression<Opts extends Options<t.AwaitExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.AwaitExpression & Opts {
  if (!node) return false;

  if (node.type !== "AwaitExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isImport(node: t.Node | null | undefined): node is t.Import;
export function isImport<Opts extends Options<t.Import>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Import & Opts;
export function isImport<Opts extends Options<t.Import>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Import & Opts {
  if (!node) return false;

  if (node.type !== "Import") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBigIntLiteral(
  node: t.Node | null | undefined,
): node is t.BigIntLiteral;
export function isBigIntLiteral<Opts extends Options<t.BigIntLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BigIntLiteral & Opts;
export function isBigIntLiteral<Opts extends Options<t.BigIntLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BigIntLiteral & Opts {
  if (!node) return false;

  if (node.type !== "BigIntLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExportNamespaceSpecifier(
  node: t.Node | null | undefined,
): node is t.ExportNamespaceSpecifier;
export function isExportNamespaceSpecifier<
  Opts extends Options<t.ExportNamespaceSpecifier>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportNamespaceSpecifier & Opts;
export function isExportNamespaceSpecifier<
  Opts extends Options<t.ExportNamespaceSpecifier>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportNamespaceSpecifier & Opts {
  if (!node) return false;

  if (node.type !== "ExportNamespaceSpecifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isOptionalMemberExpression(
  node: t.Node | null | undefined,
): node is t.OptionalMemberExpression;
export function isOptionalMemberExpression<
  Opts extends Options<t.OptionalMemberExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.OptionalMemberExpression & Opts;
export function isOptionalMemberExpression<
  Opts extends Options<t.OptionalMemberExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.OptionalMemberExpression & Opts {
  if (!node) return false;

  if (node.type !== "OptionalMemberExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isOptionalCallExpression(
  node: t.Node | null | undefined,
): node is t.OptionalCallExpression;
export function isOptionalCallExpression<
  Opts extends Options<t.OptionalCallExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.OptionalCallExpression & Opts;
export function isOptionalCallExpression<
  Opts extends Options<t.OptionalCallExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.OptionalCallExpression & Opts {
  if (!node) return false;

  if (node.type !== "OptionalCallExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassProperty(
  node: t.Node | null | undefined,
): node is t.ClassProperty;
export function isClassProperty<Opts extends Options<t.ClassProperty>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassProperty & Opts;
export function isClassProperty<Opts extends Options<t.ClassProperty>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassProperty & Opts {
  if (!node) return false;

  if (node.type !== "ClassProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassAccessorProperty(
  node: t.Node | null | undefined,
): node is t.ClassAccessorProperty;
export function isClassAccessorProperty<
  Opts extends Options<t.ClassAccessorProperty>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassAccessorProperty & Opts;
export function isClassAccessorProperty<
  Opts extends Options<t.ClassAccessorProperty>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassAccessorProperty & Opts {
  if (!node) return false;

  if (node.type !== "ClassAccessorProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassPrivateProperty(
  node: t.Node | null | undefined,
): node is t.ClassPrivateProperty;
export function isClassPrivateProperty<
  Opts extends Options<t.ClassPrivateProperty>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassPrivateProperty & Opts;
export function isClassPrivateProperty<
  Opts extends Options<t.ClassPrivateProperty>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassPrivateProperty & Opts {
  if (!node) return false;

  if (node.type !== "ClassPrivateProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassPrivateMethod(
  node: t.Node | null | undefined,
): node is t.ClassPrivateMethod;
export function isClassPrivateMethod<
  Opts extends Options<t.ClassPrivateMethod>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassPrivateMethod & Opts;
export function isClassPrivateMethod<
  Opts extends Options<t.ClassPrivateMethod>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassPrivateMethod & Opts {
  if (!node) return false;

  if (node.type !== "ClassPrivateMethod") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isPrivateName(
  node: t.Node | null | undefined,
): node is t.PrivateName;
export function isPrivateName<Opts extends Options<t.PrivateName>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.PrivateName & Opts;
export function isPrivateName<Opts extends Options<t.PrivateName>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.PrivateName & Opts {
  if (!node) return false;

  if (node.type !== "PrivateName") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isStaticBlock(
  node: t.Node | null | undefined,
): node is t.StaticBlock;
export function isStaticBlock<Opts extends Options<t.StaticBlock>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.StaticBlock & Opts;
export function isStaticBlock<Opts extends Options<t.StaticBlock>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.StaticBlock & Opts {
  if (!node) return false;

  if (node.type !== "StaticBlock") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isImportAttribute(
  node: t.Node | null | undefined,
): node is t.ImportAttribute;
export function isImportAttribute<Opts extends Options<t.ImportAttribute>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportAttribute & Opts;
export function isImportAttribute<Opts extends Options<t.ImportAttribute>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportAttribute & Opts {
  if (!node) return false;

  if (node.type !== "ImportAttribute") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isAnyTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.AnyTypeAnnotation;
export function isAnyTypeAnnotation<Opts extends Options<t.AnyTypeAnnotation>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.AnyTypeAnnotation & Opts;
export function isAnyTypeAnnotation<Opts extends Options<t.AnyTypeAnnotation>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.AnyTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "AnyTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isArrayTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.ArrayTypeAnnotation;
export function isArrayTypeAnnotation<
  Opts extends Options<t.ArrayTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ArrayTypeAnnotation & Opts;
export function isArrayTypeAnnotation<
  Opts extends Options<t.ArrayTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ArrayTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "ArrayTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBooleanTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.BooleanTypeAnnotation;
export function isBooleanTypeAnnotation<
  Opts extends Options<t.BooleanTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BooleanTypeAnnotation & Opts;
export function isBooleanTypeAnnotation<
  Opts extends Options<t.BooleanTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BooleanTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "BooleanTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBooleanLiteralTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.BooleanLiteralTypeAnnotation;
export function isBooleanLiteralTypeAnnotation<
  Opts extends Options<t.BooleanLiteralTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BooleanLiteralTypeAnnotation & Opts;
export function isBooleanLiteralTypeAnnotation<
  Opts extends Options<t.BooleanLiteralTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BooleanLiteralTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "BooleanLiteralTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNullLiteralTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.NullLiteralTypeAnnotation;
export function isNullLiteralTypeAnnotation<
  Opts extends Options<t.NullLiteralTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NullLiteralTypeAnnotation & Opts;
export function isNullLiteralTypeAnnotation<
  Opts extends Options<t.NullLiteralTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NullLiteralTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "NullLiteralTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isClassImplements(
  node: t.Node | null | undefined,
): node is t.ClassImplements;
export function isClassImplements<Opts extends Options<t.ClassImplements>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassImplements & Opts;
export function isClassImplements<Opts extends Options<t.ClassImplements>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ClassImplements & Opts {
  if (!node) return false;

  if (node.type !== "ClassImplements") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareClass(
  node: t.Node | null | undefined,
): node is t.DeclareClass;
export function isDeclareClass<Opts extends Options<t.DeclareClass>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareClass & Opts;
export function isDeclareClass<Opts extends Options<t.DeclareClass>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareClass & Opts {
  if (!node) return false;

  if (node.type !== "DeclareClass") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareFunction(
  node: t.Node | null | undefined,
): node is t.DeclareFunction;
export function isDeclareFunction<Opts extends Options<t.DeclareFunction>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareFunction & Opts;
export function isDeclareFunction<Opts extends Options<t.DeclareFunction>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareFunction & Opts {
  if (!node) return false;

  if (node.type !== "DeclareFunction") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareInterface(
  node: t.Node | null | undefined,
): node is t.DeclareInterface;
export function isDeclareInterface<Opts extends Options<t.DeclareInterface>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareInterface & Opts;
export function isDeclareInterface<Opts extends Options<t.DeclareInterface>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareInterface & Opts {
  if (!node) return false;

  if (node.type !== "DeclareInterface") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareModule(
  node: t.Node | null | undefined,
): node is t.DeclareModule;
export function isDeclareModule<Opts extends Options<t.DeclareModule>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareModule & Opts;
export function isDeclareModule<Opts extends Options<t.DeclareModule>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareModule & Opts {
  if (!node) return false;

  if (node.type !== "DeclareModule") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareModuleExports(
  node: t.Node | null | undefined,
): node is t.DeclareModuleExports;
export function isDeclareModuleExports<
  Opts extends Options<t.DeclareModuleExports>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareModuleExports & Opts;
export function isDeclareModuleExports<
  Opts extends Options<t.DeclareModuleExports>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareModuleExports & Opts {
  if (!node) return false;

  if (node.type !== "DeclareModuleExports") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareTypeAlias(
  node: t.Node | null | undefined,
): node is t.DeclareTypeAlias;
export function isDeclareTypeAlias<Opts extends Options<t.DeclareTypeAlias>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareTypeAlias & Opts;
export function isDeclareTypeAlias<Opts extends Options<t.DeclareTypeAlias>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareTypeAlias & Opts {
  if (!node) return false;

  if (node.type !== "DeclareTypeAlias") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareOpaqueType(
  node: t.Node | null | undefined,
): node is t.DeclareOpaqueType;
export function isDeclareOpaqueType<Opts extends Options<t.DeclareOpaqueType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareOpaqueType & Opts;
export function isDeclareOpaqueType<Opts extends Options<t.DeclareOpaqueType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareOpaqueType & Opts {
  if (!node) return false;

  if (node.type !== "DeclareOpaqueType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareVariable(
  node: t.Node | null | undefined,
): node is t.DeclareVariable;
export function isDeclareVariable<Opts extends Options<t.DeclareVariable>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareVariable & Opts;
export function isDeclareVariable<Opts extends Options<t.DeclareVariable>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareVariable & Opts {
  if (!node) return false;

  if (node.type !== "DeclareVariable") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareExportDeclaration(
  node: t.Node | null | undefined,
): node is t.DeclareExportDeclaration;
export function isDeclareExportDeclaration<
  Opts extends Options<t.DeclareExportDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareExportDeclaration & Opts;
export function isDeclareExportDeclaration<
  Opts extends Options<t.DeclareExportDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareExportDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "DeclareExportDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclareExportAllDeclaration(
  node: t.Node | null | undefined,
): node is t.DeclareExportAllDeclaration;
export function isDeclareExportAllDeclaration<
  Opts extends Options<t.DeclareExportAllDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareExportAllDeclaration & Opts;
export function isDeclareExportAllDeclaration<
  Opts extends Options<t.DeclareExportAllDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclareExportAllDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "DeclareExportAllDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDeclaredPredicate(
  node: t.Node | null | undefined,
): node is t.DeclaredPredicate;
export function isDeclaredPredicate<Opts extends Options<t.DeclaredPredicate>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclaredPredicate & Opts;
export function isDeclaredPredicate<Opts extends Options<t.DeclaredPredicate>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DeclaredPredicate & Opts {
  if (!node) return false;

  if (node.type !== "DeclaredPredicate") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExistsTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.ExistsTypeAnnotation;
export function isExistsTypeAnnotation<
  Opts extends Options<t.ExistsTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExistsTypeAnnotation & Opts;
export function isExistsTypeAnnotation<
  Opts extends Options<t.ExistsTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExistsTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "ExistsTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isFunctionTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.FunctionTypeAnnotation;
export function isFunctionTypeAnnotation<
  Opts extends Options<t.FunctionTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FunctionTypeAnnotation & Opts;
export function isFunctionTypeAnnotation<
  Opts extends Options<t.FunctionTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FunctionTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "FunctionTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isFunctionTypeParam(
  node: t.Node | null | undefined,
): node is t.FunctionTypeParam;
export function isFunctionTypeParam<Opts extends Options<t.FunctionTypeParam>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FunctionTypeParam & Opts;
export function isFunctionTypeParam<Opts extends Options<t.FunctionTypeParam>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FunctionTypeParam & Opts {
  if (!node) return false;

  if (node.type !== "FunctionTypeParam") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isGenericTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.GenericTypeAnnotation;
export function isGenericTypeAnnotation<
  Opts extends Options<t.GenericTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.GenericTypeAnnotation & Opts;
export function isGenericTypeAnnotation<
  Opts extends Options<t.GenericTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.GenericTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "GenericTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isInferredPredicate(
  node: t.Node | null | undefined,
): node is t.InferredPredicate;
export function isInferredPredicate<Opts extends Options<t.InferredPredicate>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.InferredPredicate & Opts;
export function isInferredPredicate<Opts extends Options<t.InferredPredicate>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.InferredPredicate & Opts {
  if (!node) return false;

  if (node.type !== "InferredPredicate") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isInterfaceExtends(
  node: t.Node | null | undefined,
): node is t.InterfaceExtends;
export function isInterfaceExtends<Opts extends Options<t.InterfaceExtends>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.InterfaceExtends & Opts;
export function isInterfaceExtends<Opts extends Options<t.InterfaceExtends>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.InterfaceExtends & Opts {
  if (!node) return false;

  if (node.type !== "InterfaceExtends") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isInterfaceDeclaration(
  node: t.Node | null | undefined,
): node is t.InterfaceDeclaration;
export function isInterfaceDeclaration<
  Opts extends Options<t.InterfaceDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.InterfaceDeclaration & Opts;
export function isInterfaceDeclaration<
  Opts extends Options<t.InterfaceDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.InterfaceDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "InterfaceDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isInterfaceTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.InterfaceTypeAnnotation;
export function isInterfaceTypeAnnotation<
  Opts extends Options<t.InterfaceTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.InterfaceTypeAnnotation & Opts;
export function isInterfaceTypeAnnotation<
  Opts extends Options<t.InterfaceTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.InterfaceTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "InterfaceTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isIntersectionTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.IntersectionTypeAnnotation;
export function isIntersectionTypeAnnotation<
  Opts extends Options<t.IntersectionTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.IntersectionTypeAnnotation & Opts;
export function isIntersectionTypeAnnotation<
  Opts extends Options<t.IntersectionTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.IntersectionTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "IntersectionTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isMixedTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.MixedTypeAnnotation;
export function isMixedTypeAnnotation<
  Opts extends Options<t.MixedTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.MixedTypeAnnotation & Opts;
export function isMixedTypeAnnotation<
  Opts extends Options<t.MixedTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.MixedTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "MixedTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEmptyTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.EmptyTypeAnnotation;
export function isEmptyTypeAnnotation<
  Opts extends Options<t.EmptyTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EmptyTypeAnnotation & Opts;
export function isEmptyTypeAnnotation<
  Opts extends Options<t.EmptyTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EmptyTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "EmptyTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNullableTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.NullableTypeAnnotation;
export function isNullableTypeAnnotation<
  Opts extends Options<t.NullableTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NullableTypeAnnotation & Opts;
export function isNullableTypeAnnotation<
  Opts extends Options<t.NullableTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NullableTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "NullableTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNumberLiteralTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.NumberLiteralTypeAnnotation;
export function isNumberLiteralTypeAnnotation<
  Opts extends Options<t.NumberLiteralTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NumberLiteralTypeAnnotation & Opts;
export function isNumberLiteralTypeAnnotation<
  Opts extends Options<t.NumberLiteralTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NumberLiteralTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "NumberLiteralTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNumberTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.NumberTypeAnnotation;
export function isNumberTypeAnnotation<
  Opts extends Options<t.NumberTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NumberTypeAnnotation & Opts;
export function isNumberTypeAnnotation<
  Opts extends Options<t.NumberTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.NumberTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "NumberTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.ObjectTypeAnnotation;
export function isObjectTypeAnnotation<
  Opts extends Options<t.ObjectTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectTypeAnnotation & Opts;
export function isObjectTypeAnnotation<
  Opts extends Options<t.ObjectTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "ObjectTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectTypeInternalSlot(
  node: t.Node | null | undefined,
): node is t.ObjectTypeInternalSlot;
export function isObjectTypeInternalSlot<
  Opts extends Options<t.ObjectTypeInternalSlot>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectTypeInternalSlot & Opts;
export function isObjectTypeInternalSlot<
  Opts extends Options<t.ObjectTypeInternalSlot>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectTypeInternalSlot & Opts {
  if (!node) return false;

  if (node.type !== "ObjectTypeInternalSlot") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectTypeCallProperty(
  node: t.Node | null | undefined,
): node is t.ObjectTypeCallProperty;
export function isObjectTypeCallProperty<
  Opts extends Options<t.ObjectTypeCallProperty>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectTypeCallProperty & Opts;
export function isObjectTypeCallProperty<
  Opts extends Options<t.ObjectTypeCallProperty>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectTypeCallProperty & Opts {
  if (!node) return false;

  if (node.type !== "ObjectTypeCallProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectTypeIndexer(
  node: t.Node | null | undefined,
): node is t.ObjectTypeIndexer;
export function isObjectTypeIndexer<Opts extends Options<t.ObjectTypeIndexer>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectTypeIndexer & Opts;
export function isObjectTypeIndexer<Opts extends Options<t.ObjectTypeIndexer>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectTypeIndexer & Opts {
  if (!node) return false;

  if (node.type !== "ObjectTypeIndexer") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectTypeProperty(
  node: t.Node | null | undefined,
): node is t.ObjectTypeProperty;
export function isObjectTypeProperty<
  Opts extends Options<t.ObjectTypeProperty>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectTypeProperty & Opts;
export function isObjectTypeProperty<
  Opts extends Options<t.ObjectTypeProperty>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectTypeProperty & Opts {
  if (!node) return false;

  if (node.type !== "ObjectTypeProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isObjectTypeSpreadProperty(
  node: t.Node | null | undefined,
): node is t.ObjectTypeSpreadProperty;
export function isObjectTypeSpreadProperty<
  Opts extends Options<t.ObjectTypeSpreadProperty>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectTypeSpreadProperty & Opts;
export function isObjectTypeSpreadProperty<
  Opts extends Options<t.ObjectTypeSpreadProperty>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectTypeSpreadProperty & Opts {
  if (!node) return false;

  if (node.type !== "ObjectTypeSpreadProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isOpaqueType(
  node: t.Node | null | undefined,
): node is t.OpaqueType;
export function isOpaqueType<Opts extends Options<t.OpaqueType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.OpaqueType & Opts;
export function isOpaqueType<Opts extends Options<t.OpaqueType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.OpaqueType & Opts {
  if (!node) return false;

  if (node.type !== "OpaqueType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isQualifiedTypeIdentifier(
  node: t.Node | null | undefined,
): node is t.QualifiedTypeIdentifier;
export function isQualifiedTypeIdentifier<
  Opts extends Options<t.QualifiedTypeIdentifier>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.QualifiedTypeIdentifier & Opts;
export function isQualifiedTypeIdentifier<
  Opts extends Options<t.QualifiedTypeIdentifier>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.QualifiedTypeIdentifier & Opts {
  if (!node) return false;

  if (node.type !== "QualifiedTypeIdentifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isStringLiteralTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.StringLiteralTypeAnnotation;
export function isStringLiteralTypeAnnotation<
  Opts extends Options<t.StringLiteralTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.StringLiteralTypeAnnotation & Opts;
export function isStringLiteralTypeAnnotation<
  Opts extends Options<t.StringLiteralTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.StringLiteralTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "StringLiteralTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isStringTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.StringTypeAnnotation;
export function isStringTypeAnnotation<
  Opts extends Options<t.StringTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.StringTypeAnnotation & Opts;
export function isStringTypeAnnotation<
  Opts extends Options<t.StringTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.StringTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "StringTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isSymbolTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.SymbolTypeAnnotation;
export function isSymbolTypeAnnotation<
  Opts extends Options<t.SymbolTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.SymbolTypeAnnotation & Opts;
export function isSymbolTypeAnnotation<
  Opts extends Options<t.SymbolTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.SymbolTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "SymbolTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isThisTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.ThisTypeAnnotation;
export function isThisTypeAnnotation<
  Opts extends Options<t.ThisTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ThisTypeAnnotation & Opts;
export function isThisTypeAnnotation<
  Opts extends Options<t.ThisTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ThisTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "ThisTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTupleTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.TupleTypeAnnotation;
export function isTupleTypeAnnotation<
  Opts extends Options<t.TupleTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TupleTypeAnnotation & Opts;
export function isTupleTypeAnnotation<
  Opts extends Options<t.TupleTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TupleTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "TupleTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeofTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.TypeofTypeAnnotation;
export function isTypeofTypeAnnotation<
  Opts extends Options<t.TypeofTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeofTypeAnnotation & Opts;
export function isTypeofTypeAnnotation<
  Opts extends Options<t.TypeofTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeofTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "TypeofTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeAlias(
  node: t.Node | null | undefined,
): node is t.TypeAlias;
export function isTypeAlias<Opts extends Options<t.TypeAlias>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeAlias & Opts;
export function isTypeAlias<Opts extends Options<t.TypeAlias>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeAlias & Opts {
  if (!node) return false;

  if (node.type !== "TypeAlias") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.TypeAnnotation;
export function isTypeAnnotation<Opts extends Options<t.TypeAnnotation>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeAnnotation & Opts;
export function isTypeAnnotation<Opts extends Options<t.TypeAnnotation>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "TypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeCastExpression(
  node: t.Node | null | undefined,
): node is t.TypeCastExpression;
export function isTypeCastExpression<
  Opts extends Options<t.TypeCastExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeCastExpression & Opts;
export function isTypeCastExpression<
  Opts extends Options<t.TypeCastExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeCastExpression & Opts {
  if (!node) return false;

  if (node.type !== "TypeCastExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeParameter(
  node: t.Node | null | undefined,
): node is t.TypeParameter;
export function isTypeParameter<Opts extends Options<t.TypeParameter>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeParameter & Opts;
export function isTypeParameter<Opts extends Options<t.TypeParameter>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeParameter & Opts {
  if (!node) return false;

  if (node.type !== "TypeParameter") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeParameterDeclaration(
  node: t.Node | null | undefined,
): node is t.TypeParameterDeclaration;
export function isTypeParameterDeclaration<
  Opts extends Options<t.TypeParameterDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeParameterDeclaration & Opts;
export function isTypeParameterDeclaration<
  Opts extends Options<t.TypeParameterDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeParameterDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "TypeParameterDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTypeParameterInstantiation(
  node: t.Node | null | undefined,
): node is t.TypeParameterInstantiation;
export function isTypeParameterInstantiation<
  Opts extends Options<t.TypeParameterInstantiation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeParameterInstantiation & Opts;
export function isTypeParameterInstantiation<
  Opts extends Options<t.TypeParameterInstantiation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeParameterInstantiation & Opts {
  if (!node) return false;

  if (node.type !== "TypeParameterInstantiation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isUnionTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.UnionTypeAnnotation;
export function isUnionTypeAnnotation<
  Opts extends Options<t.UnionTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.UnionTypeAnnotation & Opts;
export function isUnionTypeAnnotation<
  Opts extends Options<t.UnionTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.UnionTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "UnionTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isVariance(node: t.Node | null | undefined): node is t.Variance;
export function isVariance<Opts extends Options<t.Variance>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Variance & Opts;
export function isVariance<Opts extends Options<t.Variance>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Variance & Opts {
  if (!node) return false;

  if (node.type !== "Variance") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isVoidTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.VoidTypeAnnotation;
export function isVoidTypeAnnotation<
  Opts extends Options<t.VoidTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.VoidTypeAnnotation & Opts;
export function isVoidTypeAnnotation<
  Opts extends Options<t.VoidTypeAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.VoidTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "VoidTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumDeclaration(
  node: t.Node | null | undefined,
): node is t.EnumDeclaration;
export function isEnumDeclaration<Opts extends Options<t.EnumDeclaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumDeclaration & Opts;
export function isEnumDeclaration<Opts extends Options<t.EnumDeclaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "EnumDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumBooleanBody(
  node: t.Node | null | undefined,
): node is t.EnumBooleanBody;
export function isEnumBooleanBody<Opts extends Options<t.EnumBooleanBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumBooleanBody & Opts;
export function isEnumBooleanBody<Opts extends Options<t.EnumBooleanBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumBooleanBody & Opts {
  if (!node) return false;

  if (node.type !== "EnumBooleanBody") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumNumberBody(
  node: t.Node | null | undefined,
): node is t.EnumNumberBody;
export function isEnumNumberBody<Opts extends Options<t.EnumNumberBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumNumberBody & Opts;
export function isEnumNumberBody<Opts extends Options<t.EnumNumberBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumNumberBody & Opts {
  if (!node) return false;

  if (node.type !== "EnumNumberBody") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumStringBody(
  node: t.Node | null | undefined,
): node is t.EnumStringBody;
export function isEnumStringBody<Opts extends Options<t.EnumStringBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumStringBody & Opts;
export function isEnumStringBody<Opts extends Options<t.EnumStringBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumStringBody & Opts {
  if (!node) return false;

  if (node.type !== "EnumStringBody") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumSymbolBody(
  node: t.Node | null | undefined,
): node is t.EnumSymbolBody;
export function isEnumSymbolBody<Opts extends Options<t.EnumSymbolBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumSymbolBody & Opts;
export function isEnumSymbolBody<Opts extends Options<t.EnumSymbolBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumSymbolBody & Opts {
  if (!node) return false;

  if (node.type !== "EnumSymbolBody") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumBooleanMember(
  node: t.Node | null | undefined,
): node is t.EnumBooleanMember;
export function isEnumBooleanMember<Opts extends Options<t.EnumBooleanMember>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumBooleanMember & Opts;
export function isEnumBooleanMember<Opts extends Options<t.EnumBooleanMember>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumBooleanMember & Opts {
  if (!node) return false;

  if (node.type !== "EnumBooleanMember") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumNumberMember(
  node: t.Node | null | undefined,
): node is t.EnumNumberMember;
export function isEnumNumberMember<Opts extends Options<t.EnumNumberMember>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumNumberMember & Opts;
export function isEnumNumberMember<Opts extends Options<t.EnumNumberMember>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumNumberMember & Opts {
  if (!node) return false;

  if (node.type !== "EnumNumberMember") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumStringMember(
  node: t.Node | null | undefined,
): node is t.EnumStringMember;
export function isEnumStringMember<Opts extends Options<t.EnumStringMember>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumStringMember & Opts;
export function isEnumStringMember<Opts extends Options<t.EnumStringMember>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumStringMember & Opts {
  if (!node) return false;

  if (node.type !== "EnumStringMember") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isEnumDefaultedMember(
  node: t.Node | null | undefined,
): node is t.EnumDefaultedMember;
export function isEnumDefaultedMember<
  Opts extends Options<t.EnumDefaultedMember>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumDefaultedMember & Opts;
export function isEnumDefaultedMember<
  Opts extends Options<t.EnumDefaultedMember>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumDefaultedMember & Opts {
  if (!node) return false;

  if (node.type !== "EnumDefaultedMember") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isIndexedAccessType(
  node: t.Node | null | undefined,
): node is t.IndexedAccessType;
export function isIndexedAccessType<Opts extends Options<t.IndexedAccessType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.IndexedAccessType & Opts;
export function isIndexedAccessType<Opts extends Options<t.IndexedAccessType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.IndexedAccessType & Opts {
  if (!node) return false;

  if (node.type !== "IndexedAccessType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isOptionalIndexedAccessType(
  node: t.Node | null | undefined,
): node is t.OptionalIndexedAccessType;
export function isOptionalIndexedAccessType<
  Opts extends Options<t.OptionalIndexedAccessType>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.OptionalIndexedAccessType & Opts;
export function isOptionalIndexedAccessType<
  Opts extends Options<t.OptionalIndexedAccessType>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.OptionalIndexedAccessType & Opts {
  if (!node) return false;

  if (node.type !== "OptionalIndexedAccessType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXAttribute(
  node: t.Node | null | undefined,
): node is t.JSXAttribute;
export function isJSXAttribute<Opts extends Options<t.JSXAttribute>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXAttribute & Opts;
export function isJSXAttribute<Opts extends Options<t.JSXAttribute>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXAttribute & Opts {
  if (!node) return false;

  if (node.type !== "JSXAttribute") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXClosingElement(
  node: t.Node | null | undefined,
): node is t.JSXClosingElement;
export function isJSXClosingElement<Opts extends Options<t.JSXClosingElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXClosingElement & Opts;
export function isJSXClosingElement<Opts extends Options<t.JSXClosingElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXClosingElement & Opts {
  if (!node) return false;

  if (node.type !== "JSXClosingElement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXElement(
  node: t.Node | null | undefined,
): node is t.JSXElement;
export function isJSXElement<Opts extends Options<t.JSXElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXElement & Opts;
export function isJSXElement<Opts extends Options<t.JSXElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXElement & Opts {
  if (!node) return false;

  if (node.type !== "JSXElement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXEmptyExpression(
  node: t.Node | null | undefined,
): node is t.JSXEmptyExpression;
export function isJSXEmptyExpression<
  Opts extends Options<t.JSXEmptyExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXEmptyExpression & Opts;
export function isJSXEmptyExpression<
  Opts extends Options<t.JSXEmptyExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXEmptyExpression & Opts {
  if (!node) return false;

  if (node.type !== "JSXEmptyExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXExpressionContainer(
  node: t.Node | null | undefined,
): node is t.JSXExpressionContainer;
export function isJSXExpressionContainer<
  Opts extends Options<t.JSXExpressionContainer>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXExpressionContainer & Opts;
export function isJSXExpressionContainer<
  Opts extends Options<t.JSXExpressionContainer>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXExpressionContainer & Opts {
  if (!node) return false;

  if (node.type !== "JSXExpressionContainer") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXSpreadChild(
  node: t.Node | null | undefined,
): node is t.JSXSpreadChild;
export function isJSXSpreadChild<Opts extends Options<t.JSXSpreadChild>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXSpreadChild & Opts;
export function isJSXSpreadChild<Opts extends Options<t.JSXSpreadChild>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXSpreadChild & Opts {
  if (!node) return false;

  if (node.type !== "JSXSpreadChild") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXIdentifier(
  node: t.Node | null | undefined,
): node is t.JSXIdentifier;
export function isJSXIdentifier<Opts extends Options<t.JSXIdentifier>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXIdentifier & Opts;
export function isJSXIdentifier<Opts extends Options<t.JSXIdentifier>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXIdentifier & Opts {
  if (!node) return false;

  if (node.type !== "JSXIdentifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXMemberExpression(
  node: t.Node | null | undefined,
): node is t.JSXMemberExpression;
export function isJSXMemberExpression<
  Opts extends Options<t.JSXMemberExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXMemberExpression & Opts;
export function isJSXMemberExpression<
  Opts extends Options<t.JSXMemberExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXMemberExpression & Opts {
  if (!node) return false;

  if (node.type !== "JSXMemberExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXNamespacedName(
  node: t.Node | null | undefined,
): node is t.JSXNamespacedName;
export function isJSXNamespacedName<Opts extends Options<t.JSXNamespacedName>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXNamespacedName & Opts;
export function isJSXNamespacedName<Opts extends Options<t.JSXNamespacedName>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXNamespacedName & Opts {
  if (!node) return false;

  if (node.type !== "JSXNamespacedName") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXOpeningElement(
  node: t.Node | null | undefined,
): node is t.JSXOpeningElement;
export function isJSXOpeningElement<Opts extends Options<t.JSXOpeningElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXOpeningElement & Opts;
export function isJSXOpeningElement<Opts extends Options<t.JSXOpeningElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXOpeningElement & Opts {
  if (!node) return false;

  if (node.type !== "JSXOpeningElement") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXSpreadAttribute(
  node: t.Node | null | undefined,
): node is t.JSXSpreadAttribute;
export function isJSXSpreadAttribute<
  Opts extends Options<t.JSXSpreadAttribute>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXSpreadAttribute & Opts;
export function isJSXSpreadAttribute<
  Opts extends Options<t.JSXSpreadAttribute>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXSpreadAttribute & Opts {
  if (!node) return false;

  if (node.type !== "JSXSpreadAttribute") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXText(node: t.Node | null | undefined): node is t.JSXText;
export function isJSXText<Opts extends Options<t.JSXText>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXText & Opts;
export function isJSXText<Opts extends Options<t.JSXText>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXText & Opts {
  if (!node) return false;

  if (node.type !== "JSXText") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXFragment(
  node: t.Node | null | undefined,
): node is t.JSXFragment;
export function isJSXFragment<Opts extends Options<t.JSXFragment>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXFragment & Opts;
export function isJSXFragment<Opts extends Options<t.JSXFragment>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXFragment & Opts {
  if (!node) return false;

  if (node.type !== "JSXFragment") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXOpeningFragment(
  node: t.Node | null | undefined,
): node is t.JSXOpeningFragment;
export function isJSXOpeningFragment<
  Opts extends Options<t.JSXOpeningFragment>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXOpeningFragment & Opts;
export function isJSXOpeningFragment<
  Opts extends Options<t.JSXOpeningFragment>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXOpeningFragment & Opts {
  if (!node) return false;

  if (node.type !== "JSXOpeningFragment") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isJSXClosingFragment(
  node: t.Node | null | undefined,
): node is t.JSXClosingFragment;
export function isJSXClosingFragment<
  Opts extends Options<t.JSXClosingFragment>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXClosingFragment & Opts;
export function isJSXClosingFragment<
  Opts extends Options<t.JSXClosingFragment>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSXClosingFragment & Opts {
  if (!node) return false;

  if (node.type !== "JSXClosingFragment") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isNoop(node: t.Node | null | undefined): node is t.Noop;
export function isNoop<Opts extends Options<t.Noop>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Noop & Opts;
export function isNoop<Opts extends Options<t.Noop>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Noop & Opts {
  if (!node) return false;

  if (node.type !== "Noop") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isPlaceholder(
  node: t.Node | null | undefined,
): node is t.Placeholder;
export function isPlaceholder<Opts extends Options<t.Placeholder>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Placeholder & Opts;
export function isPlaceholder<Opts extends Options<t.Placeholder>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Placeholder & Opts {
  if (!node) return false;

  if (node.type !== "Placeholder") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isV8IntrinsicIdentifier(
  node: t.Node | null | undefined,
): node is t.V8IntrinsicIdentifier;
export function isV8IntrinsicIdentifier<
  Opts extends Options<t.V8IntrinsicIdentifier>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.V8IntrinsicIdentifier & Opts;
export function isV8IntrinsicIdentifier<
  Opts extends Options<t.V8IntrinsicIdentifier>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.V8IntrinsicIdentifier & Opts {
  if (!node) return false;

  if (node.type !== "V8IntrinsicIdentifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isArgumentPlaceholder(
  node: t.Node | null | undefined,
): node is t.ArgumentPlaceholder;
export function isArgumentPlaceholder<
  Opts extends Options<t.ArgumentPlaceholder>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ArgumentPlaceholder & Opts;
export function isArgumentPlaceholder<
  Opts extends Options<t.ArgumentPlaceholder>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ArgumentPlaceholder & Opts {
  if (!node) return false;

  if (node.type !== "ArgumentPlaceholder") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isBindExpression(
  node: t.Node | null | undefined,
): node is t.BindExpression;
export function isBindExpression<Opts extends Options<t.BindExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BindExpression & Opts;
export function isBindExpression<Opts extends Options<t.BindExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BindExpression & Opts {
  if (!node) return false;

  if (node.type !== "BindExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDecorator(
  node: t.Node | null | undefined,
): node is t.Decorator;
export function isDecorator<Opts extends Options<t.Decorator>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Decorator & Opts;
export function isDecorator<Opts extends Options<t.Decorator>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Decorator & Opts {
  if (!node) return false;

  if (node.type !== "Decorator") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDoExpression(
  node: t.Node | null | undefined,
): node is t.DoExpression;
export function isDoExpression<Opts extends Options<t.DoExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DoExpression & Opts;
export function isDoExpression<Opts extends Options<t.DoExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DoExpression & Opts {
  if (!node) return false;

  if (node.type !== "DoExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isExportDefaultSpecifier(
  node: t.Node | null | undefined,
): node is t.ExportDefaultSpecifier;
export function isExportDefaultSpecifier<
  Opts extends Options<t.ExportDefaultSpecifier>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportDefaultSpecifier & Opts;
export function isExportDefaultSpecifier<
  Opts extends Options<t.ExportDefaultSpecifier>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportDefaultSpecifier & Opts {
  if (!node) return false;

  if (node.type !== "ExportDefaultSpecifier") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isRecordExpression(
  node: t.Node | null | undefined,
): node is t.RecordExpression;
export function isRecordExpression<Opts extends Options<t.RecordExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.RecordExpression & Opts;
export function isRecordExpression<Opts extends Options<t.RecordExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.RecordExpression & Opts {
  if (!node) return false;

  if (node.type !== "RecordExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTupleExpression(
  node: t.Node | null | undefined,
): node is t.TupleExpression;
export function isTupleExpression<Opts extends Options<t.TupleExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TupleExpression & Opts;
export function isTupleExpression<Opts extends Options<t.TupleExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TupleExpression & Opts {
  if (!node) return false;

  if (node.type !== "TupleExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isDecimalLiteral(
  node: t.Node | null | undefined,
): node is t.DecimalLiteral;
export function isDecimalLiteral<Opts extends Options<t.DecimalLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DecimalLiteral & Opts;
export function isDecimalLiteral<Opts extends Options<t.DecimalLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.DecimalLiteral & Opts {
  if (!node) return false;

  if (node.type !== "DecimalLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isModuleExpression(
  node: t.Node | null | undefined,
): node is t.ModuleExpression;
export function isModuleExpression<Opts extends Options<t.ModuleExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ModuleExpression & Opts;
export function isModuleExpression<Opts extends Options<t.ModuleExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ModuleExpression & Opts {
  if (!node) return false;

  if (node.type !== "ModuleExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTopicReference(
  node: t.Node | null | undefined,
): node is t.TopicReference;
export function isTopicReference<Opts extends Options<t.TopicReference>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TopicReference & Opts;
export function isTopicReference<Opts extends Options<t.TopicReference>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TopicReference & Opts {
  if (!node) return false;

  if (node.type !== "TopicReference") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isPipelineTopicExpression(
  node: t.Node | null | undefined,
): node is t.PipelineTopicExpression;
export function isPipelineTopicExpression<
  Opts extends Options<t.PipelineTopicExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.PipelineTopicExpression & Opts;
export function isPipelineTopicExpression<
  Opts extends Options<t.PipelineTopicExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.PipelineTopicExpression & Opts {
  if (!node) return false;

  if (node.type !== "PipelineTopicExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isPipelineBareFunction(
  node: t.Node | null | undefined,
): node is t.PipelineBareFunction;
export function isPipelineBareFunction<
  Opts extends Options<t.PipelineBareFunction>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.PipelineBareFunction & Opts;
export function isPipelineBareFunction<
  Opts extends Options<t.PipelineBareFunction>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.PipelineBareFunction & Opts {
  if (!node) return false;

  if (node.type !== "PipelineBareFunction") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isPipelinePrimaryTopicReference(
  node: t.Node | null | undefined,
): node is t.PipelinePrimaryTopicReference;
export function isPipelinePrimaryTopicReference<
  Opts extends Options<t.PipelinePrimaryTopicReference>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.PipelinePrimaryTopicReference & Opts;
export function isPipelinePrimaryTopicReference<
  Opts extends Options<t.PipelinePrimaryTopicReference>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.PipelinePrimaryTopicReference & Opts {
  if (!node) return false;

  if (node.type !== "PipelinePrimaryTopicReference") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isVoidPattern(
  node: t.Node | null | undefined,
): node is t.VoidPattern;
export function isVoidPattern<Opts extends Options<t.VoidPattern>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.VoidPattern & Opts;
export function isVoidPattern<Opts extends Options<t.VoidPattern>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.VoidPattern & Opts {
  if (!node) return false;

  if (node.type !== "VoidPattern") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSParameterProperty(
  node: t.Node | null | undefined,
): node is t.TSParameterProperty;
export function isTSParameterProperty<
  Opts extends Options<t.TSParameterProperty>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSParameterProperty & Opts;
export function isTSParameterProperty<
  Opts extends Options<t.TSParameterProperty>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSParameterProperty & Opts {
  if (!node) return false;

  if (node.type !== "TSParameterProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSDeclareFunction(
  node: t.Node | null | undefined,
): node is t.TSDeclareFunction;
export function isTSDeclareFunction<Opts extends Options<t.TSDeclareFunction>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSDeclareFunction & Opts;
export function isTSDeclareFunction<Opts extends Options<t.TSDeclareFunction>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSDeclareFunction & Opts {
  if (!node) return false;

  if (node.type !== "TSDeclareFunction") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSDeclareMethod(
  node: t.Node | null | undefined,
): node is t.TSDeclareMethod;
export function isTSDeclareMethod<Opts extends Options<t.TSDeclareMethod>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSDeclareMethod & Opts;
export function isTSDeclareMethod<Opts extends Options<t.TSDeclareMethod>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSDeclareMethod & Opts {
  if (!node) return false;

  if (node.type !== "TSDeclareMethod") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSQualifiedName(
  node: t.Node | null | undefined,
): node is t.TSQualifiedName;
export function isTSQualifiedName<Opts extends Options<t.TSQualifiedName>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSQualifiedName & Opts;
export function isTSQualifiedName<Opts extends Options<t.TSQualifiedName>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSQualifiedName & Opts {
  if (!node) return false;

  if (node.type !== "TSQualifiedName") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSCallSignatureDeclaration(
  node: t.Node | null | undefined,
): node is t.TSCallSignatureDeclaration;
export function isTSCallSignatureDeclaration<
  Opts extends Options<t.TSCallSignatureDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSCallSignatureDeclaration & Opts;
export function isTSCallSignatureDeclaration<
  Opts extends Options<t.TSCallSignatureDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSCallSignatureDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "TSCallSignatureDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSConstructSignatureDeclaration(
  node: t.Node | null | undefined,
): node is t.TSConstructSignatureDeclaration;
export function isTSConstructSignatureDeclaration<
  Opts extends Options<t.TSConstructSignatureDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSConstructSignatureDeclaration & Opts;
export function isTSConstructSignatureDeclaration<
  Opts extends Options<t.TSConstructSignatureDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSConstructSignatureDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "TSConstructSignatureDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSPropertySignature(
  node: t.Node | null | undefined,
): node is t.TSPropertySignature;
export function isTSPropertySignature<
  Opts extends Options<t.TSPropertySignature>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSPropertySignature & Opts;
export function isTSPropertySignature<
  Opts extends Options<t.TSPropertySignature>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSPropertySignature & Opts {
  if (!node) return false;

  if (node.type !== "TSPropertySignature") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSMethodSignature(
  node: t.Node | null | undefined,
): node is t.TSMethodSignature;
export function isTSMethodSignature<Opts extends Options<t.TSMethodSignature>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSMethodSignature & Opts;
export function isTSMethodSignature<Opts extends Options<t.TSMethodSignature>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSMethodSignature & Opts {
  if (!node) return false;

  if (node.type !== "TSMethodSignature") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSIndexSignature(
  node: t.Node | null | undefined,
): node is t.TSIndexSignature;
export function isTSIndexSignature<Opts extends Options<t.TSIndexSignature>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSIndexSignature & Opts;
export function isTSIndexSignature<Opts extends Options<t.TSIndexSignature>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSIndexSignature & Opts {
  if (!node) return false;

  if (node.type !== "TSIndexSignature") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSAnyKeyword(
  node: t.Node | null | undefined,
): node is t.TSAnyKeyword;
export function isTSAnyKeyword<Opts extends Options<t.TSAnyKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSAnyKeyword & Opts;
export function isTSAnyKeyword<Opts extends Options<t.TSAnyKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSAnyKeyword & Opts {
  if (!node) return false;

  if (node.type !== "TSAnyKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSBooleanKeyword(
  node: t.Node | null | undefined,
): node is t.TSBooleanKeyword;
export function isTSBooleanKeyword<Opts extends Options<t.TSBooleanKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSBooleanKeyword & Opts;
export function isTSBooleanKeyword<Opts extends Options<t.TSBooleanKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSBooleanKeyword & Opts {
  if (!node) return false;

  if (node.type !== "TSBooleanKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSBigIntKeyword(
  node: t.Node | null | undefined,
): node is t.TSBigIntKeyword;
export function isTSBigIntKeyword<Opts extends Options<t.TSBigIntKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSBigIntKeyword & Opts;
export function isTSBigIntKeyword<Opts extends Options<t.TSBigIntKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSBigIntKeyword & Opts {
  if (!node) return false;

  if (node.type !== "TSBigIntKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSIntrinsicKeyword(
  node: t.Node | null | undefined,
): node is t.TSIntrinsicKeyword;
export function isTSIntrinsicKeyword<
  Opts extends Options<t.TSIntrinsicKeyword>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSIntrinsicKeyword & Opts;
export function isTSIntrinsicKeyword<
  Opts extends Options<t.TSIntrinsicKeyword>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSIntrinsicKeyword & Opts {
  if (!node) return false;

  if (node.type !== "TSIntrinsicKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSNeverKeyword(
  node: t.Node | null | undefined,
): node is t.TSNeverKeyword;
export function isTSNeverKeyword<Opts extends Options<t.TSNeverKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSNeverKeyword & Opts;
export function isTSNeverKeyword<Opts extends Options<t.TSNeverKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSNeverKeyword & Opts {
  if (!node) return false;

  if (node.type !== "TSNeverKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSNullKeyword(
  node: t.Node | null | undefined,
): node is t.TSNullKeyword;
export function isTSNullKeyword<Opts extends Options<t.TSNullKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSNullKeyword & Opts;
export function isTSNullKeyword<Opts extends Options<t.TSNullKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSNullKeyword & Opts {
  if (!node) return false;

  if (node.type !== "TSNullKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSNumberKeyword(
  node: t.Node | null | undefined,
): node is t.TSNumberKeyword;
export function isTSNumberKeyword<Opts extends Options<t.TSNumberKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSNumberKeyword & Opts;
export function isTSNumberKeyword<Opts extends Options<t.TSNumberKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSNumberKeyword & Opts {
  if (!node) return false;

  if (node.type !== "TSNumberKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSObjectKeyword(
  node: t.Node | null | undefined,
): node is t.TSObjectKeyword;
export function isTSObjectKeyword<Opts extends Options<t.TSObjectKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSObjectKeyword & Opts;
export function isTSObjectKeyword<Opts extends Options<t.TSObjectKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSObjectKeyword & Opts {
  if (!node) return false;

  if (node.type !== "TSObjectKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSStringKeyword(
  node: t.Node | null | undefined,
): node is t.TSStringKeyword;
export function isTSStringKeyword<Opts extends Options<t.TSStringKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSStringKeyword & Opts;
export function isTSStringKeyword<Opts extends Options<t.TSStringKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSStringKeyword & Opts {
  if (!node) return false;

  if (node.type !== "TSStringKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSSymbolKeyword(
  node: t.Node | null | undefined,
): node is t.TSSymbolKeyword;
export function isTSSymbolKeyword<Opts extends Options<t.TSSymbolKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSSymbolKeyword & Opts;
export function isTSSymbolKeyword<Opts extends Options<t.TSSymbolKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSSymbolKeyword & Opts {
  if (!node) return false;

  if (node.type !== "TSSymbolKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSUndefinedKeyword(
  node: t.Node | null | undefined,
): node is t.TSUndefinedKeyword;
export function isTSUndefinedKeyword<
  Opts extends Options<t.TSUndefinedKeyword>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSUndefinedKeyword & Opts;
export function isTSUndefinedKeyword<
  Opts extends Options<t.TSUndefinedKeyword>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSUndefinedKeyword & Opts {
  if (!node) return false;

  if (node.type !== "TSUndefinedKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSUnknownKeyword(
  node: t.Node | null | undefined,
): node is t.TSUnknownKeyword;
export function isTSUnknownKeyword<Opts extends Options<t.TSUnknownKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSUnknownKeyword & Opts;
export function isTSUnknownKeyword<Opts extends Options<t.TSUnknownKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSUnknownKeyword & Opts {
  if (!node) return false;

  if (node.type !== "TSUnknownKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSVoidKeyword(
  node: t.Node | null | undefined,
): node is t.TSVoidKeyword;
export function isTSVoidKeyword<Opts extends Options<t.TSVoidKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSVoidKeyword & Opts;
export function isTSVoidKeyword<Opts extends Options<t.TSVoidKeyword>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSVoidKeyword & Opts {
  if (!node) return false;

  if (node.type !== "TSVoidKeyword") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSThisType(
  node: t.Node | null | undefined,
): node is t.TSThisType;
export function isTSThisType<Opts extends Options<t.TSThisType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSThisType & Opts;
export function isTSThisType<Opts extends Options<t.TSThisType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSThisType & Opts {
  if (!node) return false;

  if (node.type !== "TSThisType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSFunctionType(
  node: t.Node | null | undefined,
): node is t.TSFunctionType;
export function isTSFunctionType<Opts extends Options<t.TSFunctionType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSFunctionType & Opts;
export function isTSFunctionType<Opts extends Options<t.TSFunctionType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSFunctionType & Opts {
  if (!node) return false;

  if (node.type !== "TSFunctionType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSConstructorType(
  node: t.Node | null | undefined,
): node is t.TSConstructorType;
export function isTSConstructorType<Opts extends Options<t.TSConstructorType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSConstructorType & Opts;
export function isTSConstructorType<Opts extends Options<t.TSConstructorType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSConstructorType & Opts {
  if (!node) return false;

  if (node.type !== "TSConstructorType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeReference(
  node: t.Node | null | undefined,
): node is t.TSTypeReference;
export function isTSTypeReference<Opts extends Options<t.TSTypeReference>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeReference & Opts;
export function isTSTypeReference<Opts extends Options<t.TSTypeReference>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeReference & Opts {
  if (!node) return false;

  if (node.type !== "TSTypeReference") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypePredicate(
  node: t.Node | null | undefined,
): node is t.TSTypePredicate;
export function isTSTypePredicate<Opts extends Options<t.TSTypePredicate>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypePredicate & Opts;
export function isTSTypePredicate<Opts extends Options<t.TSTypePredicate>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypePredicate & Opts {
  if (!node) return false;

  if (node.type !== "TSTypePredicate") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeQuery(
  node: t.Node | null | undefined,
): node is t.TSTypeQuery;
export function isTSTypeQuery<Opts extends Options<t.TSTypeQuery>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeQuery & Opts;
export function isTSTypeQuery<Opts extends Options<t.TSTypeQuery>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeQuery & Opts {
  if (!node) return false;

  if (node.type !== "TSTypeQuery") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeLiteral(
  node: t.Node | null | undefined,
): node is t.TSTypeLiteral;
export function isTSTypeLiteral<Opts extends Options<t.TSTypeLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeLiteral & Opts;
export function isTSTypeLiteral<Opts extends Options<t.TSTypeLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeLiteral & Opts {
  if (!node) return false;

  if (node.type !== "TSTypeLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSArrayType(
  node: t.Node | null | undefined,
): node is t.TSArrayType;
export function isTSArrayType<Opts extends Options<t.TSArrayType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSArrayType & Opts;
export function isTSArrayType<Opts extends Options<t.TSArrayType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSArrayType & Opts {
  if (!node) return false;

  if (node.type !== "TSArrayType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTupleType(
  node: t.Node | null | undefined,
): node is t.TSTupleType;
export function isTSTupleType<Opts extends Options<t.TSTupleType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTupleType & Opts;
export function isTSTupleType<Opts extends Options<t.TSTupleType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTupleType & Opts {
  if (!node) return false;

  if (node.type !== "TSTupleType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSOptionalType(
  node: t.Node | null | undefined,
): node is t.TSOptionalType;
export function isTSOptionalType<Opts extends Options<t.TSOptionalType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSOptionalType & Opts;
export function isTSOptionalType<Opts extends Options<t.TSOptionalType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSOptionalType & Opts {
  if (!node) return false;

  if (node.type !== "TSOptionalType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSRestType(
  node: t.Node | null | undefined,
): node is t.TSRestType;
export function isTSRestType<Opts extends Options<t.TSRestType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSRestType & Opts;
export function isTSRestType<Opts extends Options<t.TSRestType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSRestType & Opts {
  if (!node) return false;

  if (node.type !== "TSRestType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSNamedTupleMember(
  node: t.Node | null | undefined,
): node is t.TSNamedTupleMember;
export function isTSNamedTupleMember<
  Opts extends Options<t.TSNamedTupleMember>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSNamedTupleMember & Opts;
export function isTSNamedTupleMember<
  Opts extends Options<t.TSNamedTupleMember>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSNamedTupleMember & Opts {
  if (!node) return false;

  if (node.type !== "TSNamedTupleMember") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSUnionType(
  node: t.Node | null | undefined,
): node is t.TSUnionType;
export function isTSUnionType<Opts extends Options<t.TSUnionType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSUnionType & Opts;
export function isTSUnionType<Opts extends Options<t.TSUnionType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSUnionType & Opts {
  if (!node) return false;

  if (node.type !== "TSUnionType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSIntersectionType(
  node: t.Node | null | undefined,
): node is t.TSIntersectionType;
export function isTSIntersectionType<
  Opts extends Options<t.TSIntersectionType>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSIntersectionType & Opts;
export function isTSIntersectionType<
  Opts extends Options<t.TSIntersectionType>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSIntersectionType & Opts {
  if (!node) return false;

  if (node.type !== "TSIntersectionType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSConditionalType(
  node: t.Node | null | undefined,
): node is t.TSConditionalType;
export function isTSConditionalType<Opts extends Options<t.TSConditionalType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSConditionalType & Opts;
export function isTSConditionalType<Opts extends Options<t.TSConditionalType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSConditionalType & Opts {
  if (!node) return false;

  if (node.type !== "TSConditionalType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSInferType(
  node: t.Node | null | undefined,
): node is t.TSInferType;
export function isTSInferType<Opts extends Options<t.TSInferType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSInferType & Opts;
export function isTSInferType<Opts extends Options<t.TSInferType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSInferType & Opts {
  if (!node) return false;

  if (node.type !== "TSInferType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSParenthesizedType(
  node: t.Node | null | undefined,
): node is t.TSParenthesizedType;
export function isTSParenthesizedType<
  Opts extends Options<t.TSParenthesizedType>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSParenthesizedType & Opts;
export function isTSParenthesizedType<
  Opts extends Options<t.TSParenthesizedType>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSParenthesizedType & Opts {
  if (!node) return false;

  if (node.type !== "TSParenthesizedType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeOperator(
  node: t.Node | null | undefined,
): node is t.TSTypeOperator;
export function isTSTypeOperator<Opts extends Options<t.TSTypeOperator>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeOperator & Opts;
export function isTSTypeOperator<Opts extends Options<t.TSTypeOperator>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeOperator & Opts {
  if (!node) return false;

  if (node.type !== "TSTypeOperator") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSIndexedAccessType(
  node: t.Node | null | undefined,
): node is t.TSIndexedAccessType;
export function isTSIndexedAccessType<
  Opts extends Options<t.TSIndexedAccessType>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSIndexedAccessType & Opts;
export function isTSIndexedAccessType<
  Opts extends Options<t.TSIndexedAccessType>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSIndexedAccessType & Opts {
  if (!node) return false;

  if (node.type !== "TSIndexedAccessType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSMappedType(
  node: t.Node | null | undefined,
): node is t.TSMappedType;
export function isTSMappedType<Opts extends Options<t.TSMappedType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSMappedType & Opts;
export function isTSMappedType<Opts extends Options<t.TSMappedType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSMappedType & Opts {
  if (!node) return false;

  if (node.type !== "TSMappedType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTemplateLiteralType(
  node: t.Node | null | undefined,
): node is t.TSTemplateLiteralType;
export function isTSTemplateLiteralType<
  Opts extends Options<t.TSTemplateLiteralType>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTemplateLiteralType & Opts;
export function isTSTemplateLiteralType<
  Opts extends Options<t.TSTemplateLiteralType>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTemplateLiteralType & Opts {
  if (!node) return false;

  if (node.type !== "TSTemplateLiteralType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSLiteralType(
  node: t.Node | null | undefined,
): node is t.TSLiteralType;
export function isTSLiteralType<Opts extends Options<t.TSLiteralType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSLiteralType & Opts;
export function isTSLiteralType<Opts extends Options<t.TSLiteralType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSLiteralType & Opts {
  if (!node) return false;

  if (node.type !== "TSLiteralType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSExpressionWithTypeArguments(
  node: t.Node | null | undefined,
): node is t.TSExpressionWithTypeArguments;
export function isTSExpressionWithTypeArguments<
  Opts extends Options<t.TSExpressionWithTypeArguments>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSExpressionWithTypeArguments & Opts;
export function isTSExpressionWithTypeArguments<
  Opts extends Options<t.TSExpressionWithTypeArguments>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSExpressionWithTypeArguments & Opts {
  if (!node) return false;

  if (node.type !== "TSExpressionWithTypeArguments") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSInterfaceDeclaration(
  node: t.Node | null | undefined,
): node is t.TSInterfaceDeclaration;
export function isTSInterfaceDeclaration<
  Opts extends Options<t.TSInterfaceDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSInterfaceDeclaration & Opts;
export function isTSInterfaceDeclaration<
  Opts extends Options<t.TSInterfaceDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSInterfaceDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "TSInterfaceDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSInterfaceBody(
  node: t.Node | null | undefined,
): node is t.TSInterfaceBody;
export function isTSInterfaceBody<Opts extends Options<t.TSInterfaceBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSInterfaceBody & Opts;
export function isTSInterfaceBody<Opts extends Options<t.TSInterfaceBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSInterfaceBody & Opts {
  if (!node) return false;

  if (node.type !== "TSInterfaceBody") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeAliasDeclaration(
  node: t.Node | null | undefined,
): node is t.TSTypeAliasDeclaration;
export function isTSTypeAliasDeclaration<
  Opts extends Options<t.TSTypeAliasDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeAliasDeclaration & Opts;
export function isTSTypeAliasDeclaration<
  Opts extends Options<t.TSTypeAliasDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeAliasDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "TSTypeAliasDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSInstantiationExpression(
  node: t.Node | null | undefined,
): node is t.TSInstantiationExpression;
export function isTSInstantiationExpression<
  Opts extends Options<t.TSInstantiationExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSInstantiationExpression & Opts;
export function isTSInstantiationExpression<
  Opts extends Options<t.TSInstantiationExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSInstantiationExpression & Opts {
  if (!node) return false;

  if (node.type !== "TSInstantiationExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSAsExpression(
  node: t.Node | null | undefined,
): node is t.TSAsExpression;
export function isTSAsExpression<Opts extends Options<t.TSAsExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSAsExpression & Opts;
export function isTSAsExpression<Opts extends Options<t.TSAsExpression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSAsExpression & Opts {
  if (!node) return false;

  if (node.type !== "TSAsExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSSatisfiesExpression(
  node: t.Node | null | undefined,
): node is t.TSSatisfiesExpression;
export function isTSSatisfiesExpression<
  Opts extends Options<t.TSSatisfiesExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSSatisfiesExpression & Opts;
export function isTSSatisfiesExpression<
  Opts extends Options<t.TSSatisfiesExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSSatisfiesExpression & Opts {
  if (!node) return false;

  if (node.type !== "TSSatisfiesExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeAssertion(
  node: t.Node | null | undefined,
): node is t.TSTypeAssertion;
export function isTSTypeAssertion<Opts extends Options<t.TSTypeAssertion>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeAssertion & Opts;
export function isTSTypeAssertion<Opts extends Options<t.TSTypeAssertion>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeAssertion & Opts {
  if (!node) return false;

  if (node.type !== "TSTypeAssertion") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSEnumBody(
  node: t.Node | null | undefined,
): node is t.TSEnumBody;
export function isTSEnumBody<Opts extends Options<t.TSEnumBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSEnumBody & Opts;
export function isTSEnumBody<Opts extends Options<t.TSEnumBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSEnumBody & Opts {
  if (!node) return false;

  if (node.type !== "TSEnumBody") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSEnumDeclaration(
  node: t.Node | null | undefined,
): node is t.TSEnumDeclaration;
export function isTSEnumDeclaration<Opts extends Options<t.TSEnumDeclaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSEnumDeclaration & Opts;
export function isTSEnumDeclaration<Opts extends Options<t.TSEnumDeclaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSEnumDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "TSEnumDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSEnumMember(
  node: t.Node | null | undefined,
): node is t.TSEnumMember;
export function isTSEnumMember<Opts extends Options<t.TSEnumMember>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSEnumMember & Opts;
export function isTSEnumMember<Opts extends Options<t.TSEnumMember>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSEnumMember & Opts {
  if (!node) return false;

  if (node.type !== "TSEnumMember") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSModuleDeclaration(
  node: t.Node | null | undefined,
): node is t.TSModuleDeclaration;
export function isTSModuleDeclaration<
  Opts extends Options<t.TSModuleDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSModuleDeclaration & Opts;
export function isTSModuleDeclaration<
  Opts extends Options<t.TSModuleDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSModuleDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "TSModuleDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSModuleBlock(
  node: t.Node | null | undefined,
): node is t.TSModuleBlock;
export function isTSModuleBlock<Opts extends Options<t.TSModuleBlock>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSModuleBlock & Opts;
export function isTSModuleBlock<Opts extends Options<t.TSModuleBlock>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSModuleBlock & Opts {
  if (!node) return false;

  if (node.type !== "TSModuleBlock") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSImportType(
  node: t.Node | null | undefined,
): node is t.TSImportType;
export function isTSImportType<Opts extends Options<t.TSImportType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSImportType & Opts;
export function isTSImportType<Opts extends Options<t.TSImportType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSImportType & Opts {
  if (!node) return false;

  if (node.type !== "TSImportType") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSImportEqualsDeclaration(
  node: t.Node | null | undefined,
): node is t.TSImportEqualsDeclaration;
export function isTSImportEqualsDeclaration<
  Opts extends Options<t.TSImportEqualsDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSImportEqualsDeclaration & Opts;
export function isTSImportEqualsDeclaration<
  Opts extends Options<t.TSImportEqualsDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSImportEqualsDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "TSImportEqualsDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSExternalModuleReference(
  node: t.Node | null | undefined,
): node is t.TSExternalModuleReference;
export function isTSExternalModuleReference<
  Opts extends Options<t.TSExternalModuleReference>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSExternalModuleReference & Opts;
export function isTSExternalModuleReference<
  Opts extends Options<t.TSExternalModuleReference>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSExternalModuleReference & Opts {
  if (!node) return false;

  if (node.type !== "TSExternalModuleReference") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSNonNullExpression(
  node: t.Node | null | undefined,
): node is t.TSNonNullExpression;
export function isTSNonNullExpression<
  Opts extends Options<t.TSNonNullExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSNonNullExpression & Opts;
export function isTSNonNullExpression<
  Opts extends Options<t.TSNonNullExpression>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSNonNullExpression & Opts {
  if (!node) return false;

  if (node.type !== "TSNonNullExpression") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSExportAssignment(
  node: t.Node | null | undefined,
): node is t.TSExportAssignment;
export function isTSExportAssignment<
  Opts extends Options<t.TSExportAssignment>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSExportAssignment & Opts;
export function isTSExportAssignment<
  Opts extends Options<t.TSExportAssignment>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSExportAssignment & Opts {
  if (!node) return false;

  if (node.type !== "TSExportAssignment") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSNamespaceExportDeclaration(
  node: t.Node | null | undefined,
): node is t.TSNamespaceExportDeclaration;
export function isTSNamespaceExportDeclaration<
  Opts extends Options<t.TSNamespaceExportDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSNamespaceExportDeclaration & Opts;
export function isTSNamespaceExportDeclaration<
  Opts extends Options<t.TSNamespaceExportDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSNamespaceExportDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "TSNamespaceExportDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeAnnotation(
  node: t.Node | null | undefined,
): node is t.TSTypeAnnotation;
export function isTSTypeAnnotation<Opts extends Options<t.TSTypeAnnotation>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeAnnotation & Opts;
export function isTSTypeAnnotation<Opts extends Options<t.TSTypeAnnotation>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeAnnotation & Opts {
  if (!node) return false;

  if (node.type !== "TSTypeAnnotation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeParameterInstantiation(
  node: t.Node | null | undefined,
): node is t.TSTypeParameterInstantiation;
export function isTSTypeParameterInstantiation<
  Opts extends Options<t.TSTypeParameterInstantiation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeParameterInstantiation & Opts;
export function isTSTypeParameterInstantiation<
  Opts extends Options<t.TSTypeParameterInstantiation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeParameterInstantiation & Opts {
  if (!node) return false;

  if (node.type !== "TSTypeParameterInstantiation") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeParameterDeclaration(
  node: t.Node | null | undefined,
): node is t.TSTypeParameterDeclaration;
export function isTSTypeParameterDeclaration<
  Opts extends Options<t.TSTypeParameterDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeParameterDeclaration & Opts;
export function isTSTypeParameterDeclaration<
  Opts extends Options<t.TSTypeParameterDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeParameterDeclaration & Opts {
  if (!node) return false;

  if (node.type !== "TSTypeParameterDeclaration") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isTSTypeParameter(
  node: t.Node | null | undefined,
): node is t.TSTypeParameter;
export function isTSTypeParameter<Opts extends Options<t.TSTypeParameter>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeParameter & Opts;
export function isTSTypeParameter<Opts extends Options<t.TSTypeParameter>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeParameter & Opts {
  if (!node) return false;

  if (node.type !== "TSTypeParameter") return false;

  return opts == null || shallowEqual(node, opts);
}
export function isStandardized(
  node: t.Node | null | undefined,
): node is t.Standardized;
export function isStandardized<Opts extends Options<t.Standardized>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Standardized & Opts;
export function isStandardized<Opts extends Options<t.Standardized>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Standardized & Opts {
  if (!node) return false;

  switch (node.type) {
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
    case "ImportExpression":
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
    case "ImportAttribute":
      break;
    case "Placeholder":
      switch (node.expectedNode) {
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
  node: t.Node | null | undefined,
): node is t.Expression;
export function isExpression<Opts extends Options<t.Expression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Expression & Opts;
export function isExpression<Opts extends Options<t.Expression>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Expression & Opts {
  if (!node) return false;

  switch (node.type) {
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
    case "ImportExpression":
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
      switch (node.expectedNode) {
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
export function isBinary(node: t.Node | null | undefined): node is t.Binary;
export function isBinary<Opts extends Options<t.Binary>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Binary & Opts;
export function isBinary<Opts extends Options<t.Binary>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Binary & Opts {
  if (!node) return false;

  switch (node.type) {
    case "BinaryExpression":
    case "LogicalExpression":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isScopable(node: t.Node | null | undefined): node is t.Scopable;
export function isScopable<Opts extends Options<t.Scopable>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Scopable & Opts;
export function isScopable<Opts extends Options<t.Scopable>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Scopable & Opts {
  if (!node) return false;

  switch (node.type) {
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
      if (node.expectedNode === "BlockStatement") break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isBlockParent(
  node: t.Node | null | undefined,
): node is t.BlockParent;
export function isBlockParent<Opts extends Options<t.BlockParent>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BlockParent & Opts;
export function isBlockParent<Opts extends Options<t.BlockParent>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.BlockParent & Opts {
  if (!node) return false;

  switch (node.type) {
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
      if (node.expectedNode === "BlockStatement") break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isBlock(node: t.Node | null | undefined): node is t.Block;
export function isBlock<Opts extends Options<t.Block>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Block & Opts;
export function isBlock<Opts extends Options<t.Block>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Block & Opts {
  if (!node) return false;

  switch (node.type) {
    case "BlockStatement":
    case "Program":
    case "TSModuleBlock":
      break;
    case "Placeholder":
      if (node.expectedNode === "BlockStatement") break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isStatement(
  node: t.Node | null | undefined,
): node is t.Statement;
export function isStatement<Opts extends Options<t.Statement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Statement & Opts;
export function isStatement<Opts extends Options<t.Statement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Statement & Opts {
  if (!node) return false;

  switch (node.type) {
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
      switch (node.expectedNode) {
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
  node: t.Node | null | undefined,
): node is t.Terminatorless;
export function isTerminatorless<Opts extends Options<t.Terminatorless>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Terminatorless & Opts;
export function isTerminatorless<Opts extends Options<t.Terminatorless>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Terminatorless & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.CompletionStatement;
export function isCompletionStatement<
  Opts extends Options<t.CompletionStatement>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.CompletionStatement & Opts;
export function isCompletionStatement<
  Opts extends Options<t.CompletionStatement>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.CompletionStatement & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.Conditional;
export function isConditional<Opts extends Options<t.Conditional>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Conditional & Opts;
export function isConditional<Opts extends Options<t.Conditional>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Conditional & Opts {
  if (!node) return false;

  switch (node.type) {
    case "ConditionalExpression":
    case "IfStatement":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isLoop(node: t.Node | null | undefined): node is t.Loop;
export function isLoop<Opts extends Options<t.Loop>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Loop & Opts;
export function isLoop<Opts extends Options<t.Loop>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Loop & Opts {
  if (!node) return false;

  switch (node.type) {
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
export function isWhile(node: t.Node | null | undefined): node is t.While;
export function isWhile<Opts extends Options<t.While>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.While & Opts;
export function isWhile<Opts extends Options<t.While>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.While & Opts {
  if (!node) return false;

  switch (node.type) {
    case "DoWhileStatement":
    case "WhileStatement":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isExpressionWrapper(
  node: t.Node | null | undefined,
): node is t.ExpressionWrapper;
export function isExpressionWrapper<Opts extends Options<t.ExpressionWrapper>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExpressionWrapper & Opts;
export function isExpressionWrapper<Opts extends Options<t.ExpressionWrapper>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExpressionWrapper & Opts {
  if (!node) return false;

  switch (node.type) {
    case "ExpressionStatement":
    case "ParenthesizedExpression":
    case "TypeCastExpression":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isFor(node: t.Node | null | undefined): node is t.For;
export function isFor<Opts extends Options<t.For>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.For & Opts;
export function isFor<Opts extends Options<t.For>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.For & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.ForXStatement;
export function isForXStatement<Opts extends Options<t.ForXStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ForXStatement & Opts;
export function isForXStatement<Opts extends Options<t.ForXStatement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ForXStatement & Opts {
  if (!node) return false;

  switch (node.type) {
    case "ForInStatement":
    case "ForOfStatement":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isFunction(node: t.Node | null | undefined): node is t.Function;
export function isFunction<Opts extends Options<t.Function>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Function & Opts;
export function isFunction<Opts extends Options<t.Function>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Function & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.FunctionParent;
export function isFunctionParent<Opts extends Options<t.FunctionParent>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FunctionParent & Opts;
export function isFunctionParent<Opts extends Options<t.FunctionParent>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FunctionParent & Opts {
  if (!node) return false;

  switch (node.type) {
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
export function isPureish(node: t.Node | null | undefined): node is t.Pureish;
export function isPureish<Opts extends Options<t.Pureish>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Pureish & Opts;
export function isPureish<Opts extends Options<t.Pureish>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Pureish & Opts {
  if (!node) return false;

  switch (node.type) {
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
      if (node.expectedNode === "StringLiteral") break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isDeclaration(
  node: t.Node | null | undefined,
): node is t.Declaration;
export function isDeclaration<Opts extends Options<t.Declaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Declaration & Opts;
export function isDeclaration<Opts extends Options<t.Declaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Declaration & Opts {
  if (!node) return false;

  switch (node.type) {
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
    case "TSImportEqualsDeclaration":
      break;
    case "Placeholder":
      if (node.expectedNode === "Declaration") break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isFunctionParameter(
  node: t.Node | null | undefined,
): node is t.FunctionParameter;
export function isFunctionParameter<Opts extends Options<t.FunctionParameter>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FunctionParameter & Opts;
export function isFunctionParameter<Opts extends Options<t.FunctionParameter>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FunctionParameter & Opts {
  if (!node) return false;

  switch (node.type) {
    case "Identifier":
    case "RestElement":
    case "AssignmentPattern":
    case "ArrayPattern":
    case "ObjectPattern":
    case "VoidPattern":
      break;
    case "Placeholder":
      if (node.expectedNode === "Identifier") break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isPatternLike(
  node: t.Node | null | undefined,
): node is t.PatternLike;
export function isPatternLike<Opts extends Options<t.PatternLike>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.PatternLike & Opts;
export function isPatternLike<Opts extends Options<t.PatternLike>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.PatternLike & Opts {
  if (!node) return false;

  switch (node.type) {
    case "Identifier":
    case "MemberExpression":
    case "RestElement":
    case "AssignmentPattern":
    case "ArrayPattern":
    case "ObjectPattern":
    case "VoidPattern":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSTypeAssertion":
    case "TSNonNullExpression":
      break;
    case "Placeholder":
      switch (node.expectedNode) {
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
export function isLVal(node: t.Node | null | undefined): node is t.LVal;
export function isLVal<Opts extends Options<t.LVal>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.LVal & Opts;
export function isLVal<Opts extends Options<t.LVal>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.LVal & Opts {
  if (!node) return false;

  switch (node.type) {
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
      switch (node.expectedNode) {
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
  node: t.Node | null | undefined,
): node is t.TSEntityName;
export function isTSEntityName<Opts extends Options<t.TSEntityName>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSEntityName & Opts;
export function isTSEntityName<Opts extends Options<t.TSEntityName>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSEntityName & Opts {
  if (!node) return false;

  switch (node.type) {
    case "Identifier":
    case "TSQualifiedName":
      break;
    case "Placeholder":
      if (node.expectedNode === "Identifier") break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isLiteral(node: t.Node | null | undefined): node is t.Literal;
export function isLiteral<Opts extends Options<t.Literal>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Literal & Opts;
export function isLiteral<Opts extends Options<t.Literal>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Literal & Opts {
  if (!node) return false;

  switch (node.type) {
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
      if (node.expectedNode === "StringLiteral") break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isImmutable(
  node: t.Node | null | undefined,
): node is t.Immutable;
export function isImmutable<Opts extends Options<t.Immutable>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Immutable & Opts;
export function isImmutable<Opts extends Options<t.Immutable>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Immutable & Opts {
  if (!node) return false;

  switch (node.type) {
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
      if (node.expectedNode === "StringLiteral") break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isUserWhitespacable(
  node: t.Node | null | undefined,
): node is t.UserWhitespacable;
export function isUserWhitespacable<Opts extends Options<t.UserWhitespacable>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.UserWhitespacable & Opts;
export function isUserWhitespacable<Opts extends Options<t.UserWhitespacable>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.UserWhitespacable & Opts {
  if (!node) return false;

  switch (node.type) {
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
export function isMethod(node: t.Node | null | undefined): node is t.Method;
export function isMethod<Opts extends Options<t.Method>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Method & Opts;
export function isMethod<Opts extends Options<t.Method>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Method & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.ObjectMember;
export function isObjectMember<Opts extends Options<t.ObjectMember>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectMember & Opts;
export function isObjectMember<Opts extends Options<t.ObjectMember>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ObjectMember & Opts {
  if (!node) return false;

  switch (node.type) {
    case "ObjectMethod":
    case "ObjectProperty":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isProperty(node: t.Node | null | undefined): node is t.Property;
export function isProperty<Opts extends Options<t.Property>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Property & Opts;
export function isProperty<Opts extends Options<t.Property>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Property & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.UnaryLike;
export function isUnaryLike<Opts extends Options<t.UnaryLike>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.UnaryLike & Opts;
export function isUnaryLike<Opts extends Options<t.UnaryLike>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.UnaryLike & Opts {
  if (!node) return false;

  switch (node.type) {
    case "UnaryExpression":
    case "SpreadElement":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isPattern(node: t.Node | null | undefined): node is t.Pattern;
export function isPattern<Opts extends Options<t.Pattern>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Pattern & Opts;
export function isPattern<Opts extends Options<t.Pattern>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Pattern & Opts {
  if (!node) return false;

  switch (node.type) {
    case "AssignmentPattern":
    case "ArrayPattern":
    case "ObjectPattern":
    case "VoidPattern":
      break;
    case "Placeholder":
      if (node.expectedNode === "Pattern") break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isClass(node: t.Node | null | undefined): node is t.Class;
export function isClass<Opts extends Options<t.Class>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Class & Opts;
export function isClass<Opts extends Options<t.Class>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Class & Opts {
  if (!node) return false;

  switch (node.type) {
    case "ClassExpression":
    case "ClassDeclaration":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isImportOrExportDeclaration(
  node: t.Node | null | undefined,
): node is t.ImportOrExportDeclaration;
export function isImportOrExportDeclaration<
  Opts extends Options<t.ImportOrExportDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportOrExportDeclaration & Opts;
export function isImportOrExportDeclaration<
  Opts extends Options<t.ImportOrExportDeclaration>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportOrExportDeclaration & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.ExportDeclaration;
export function isExportDeclaration<Opts extends Options<t.ExportDeclaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportDeclaration & Opts;
export function isExportDeclaration<Opts extends Options<t.ExportDeclaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ExportDeclaration & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.ModuleSpecifier;
export function isModuleSpecifier<Opts extends Options<t.ModuleSpecifier>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ModuleSpecifier & Opts;
export function isModuleSpecifier<Opts extends Options<t.ModuleSpecifier>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ModuleSpecifier & Opts {
  if (!node) return false;

  switch (node.type) {
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
export function isAccessor(node: t.Node | null | undefined): node is t.Accessor;
export function isAccessor<Opts extends Options<t.Accessor>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Accessor & Opts;
export function isAccessor<Opts extends Options<t.Accessor>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Accessor & Opts {
  if (!node) return false;

  switch (node.type) {
    case "ClassAccessorProperty":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isPrivate(node: t.Node | null | undefined): node is t.Private;
export function isPrivate<Opts extends Options<t.Private>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Private & Opts;
export function isPrivate<Opts extends Options<t.Private>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Private & Opts {
  if (!node) return false;

  switch (node.type) {
    case "ClassPrivateProperty":
    case "ClassPrivateMethod":
    case "PrivateName":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isFlow(node: t.Node | null | undefined): node is t.Flow;
export function isFlow<Opts extends Options<t.Flow>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Flow & Opts;
export function isFlow<Opts extends Options<t.Flow>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Flow & Opts {
  if (!node) return false;

  switch (node.type) {
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
export function isFlowType(node: t.Node | null | undefined): node is t.FlowType;
export function isFlowType<Opts extends Options<t.FlowType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FlowType & Opts;
export function isFlowType<Opts extends Options<t.FlowType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FlowType & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.FlowBaseAnnotation;
export function isFlowBaseAnnotation<
  Opts extends Options<t.FlowBaseAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FlowBaseAnnotation & Opts;
export function isFlowBaseAnnotation<
  Opts extends Options<t.FlowBaseAnnotation>,
>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FlowBaseAnnotation & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.FlowDeclaration;
export function isFlowDeclaration<Opts extends Options<t.FlowDeclaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FlowDeclaration & Opts;
export function isFlowDeclaration<Opts extends Options<t.FlowDeclaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FlowDeclaration & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.FlowPredicate;
export function isFlowPredicate<Opts extends Options<t.FlowPredicate>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FlowPredicate & Opts;
export function isFlowPredicate<Opts extends Options<t.FlowPredicate>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.FlowPredicate & Opts {
  if (!node) return false;

  switch (node.type) {
    case "DeclaredPredicate":
    case "InferredPredicate":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
export function isEnumBody(node: t.Node | null | undefined): node is t.EnumBody;
export function isEnumBody<Opts extends Options<t.EnumBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumBody & Opts;
export function isEnumBody<Opts extends Options<t.EnumBody>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumBody & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.EnumMember;
export function isEnumMember<Opts extends Options<t.EnumMember>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumMember & Opts;
export function isEnumMember<Opts extends Options<t.EnumMember>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.EnumMember & Opts {
  if (!node) return false;

  switch (node.type) {
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
export function isJSX(node: t.Node | null | undefined): node is t.JSX;
export function isJSX<Opts extends Options<t.JSX>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSX & Opts;
export function isJSX<Opts extends Options<t.JSX>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.JSX & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.Miscellaneous;
export function isMiscellaneous<Opts extends Options<t.Miscellaneous>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Miscellaneous & Opts;
export function isMiscellaneous<Opts extends Options<t.Miscellaneous>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.Miscellaneous & Opts {
  if (!node) return false;

  switch (node.type) {
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
  node: t.Node | null | undefined,
): node is t.TypeScript;
export function isTypeScript<Opts extends Options<t.TypeScript>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeScript & Opts;
export function isTypeScript<Opts extends Options<t.TypeScript>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TypeScript & Opts {
  if (!node) return false;

  switch (node.type) {
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
    case "TSTemplateLiteralType":
    case "TSLiteralType":
    case "TSExpressionWithTypeArguments":
    case "TSInterfaceDeclaration":
    case "TSInterfaceBody":
    case "TSTypeAliasDeclaration":
    case "TSInstantiationExpression":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSTypeAssertion":
    case "TSEnumBody":
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
  node: t.Node | null | undefined,
): node is t.TSTypeElement;
export function isTSTypeElement<Opts extends Options<t.TSTypeElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeElement & Opts;
export function isTSTypeElement<Opts extends Options<t.TSTypeElement>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSTypeElement & Opts {
  if (!node) return false;

  switch (node.type) {
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
export function isTSType(node: t.Node | null | undefined): node is t.TSType;
export function isTSType<Opts extends Options<t.TSType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSType & Opts;
export function isTSType<Opts extends Options<t.TSType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSType & Opts {
  if (!node) return false;

  switch (node.type) {
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
    case "TSTemplateLiteralType":
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
  node: t.Node | null | undefined,
): node is t.TSBaseType;
export function isTSBaseType<Opts extends Options<t.TSBaseType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSBaseType & Opts;
export function isTSBaseType<Opts extends Options<t.TSBaseType>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.TSBaseType & Opts {
  if (!node) return false;

  switch (node.type) {
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
    case "TSTemplateLiteralType":
    case "TSLiteralType":
      break;
    default:
      return false;
  }

  return opts == null || shallowEqual(node, opts);
}
/**
 * @deprecated Use `isNumericLiteral`
 */
export function isNumberLiteral(node: t.Node | null | undefined): boolean;
export function isNumberLiteral<Opts extends Options<t.NumberLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): boolean;
export function isNumberLiteral<Opts extends Options<t.NumberLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): boolean {
  deprecationWarning("isNumberLiteral", "isNumericLiteral");
  if (!node) return false;

  if (node.type !== "NumberLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
/**
 * @deprecated Use `isRegExpLiteral`
 */
export function isRegexLiteral(node: t.Node | null | undefined): boolean;
export function isRegexLiteral<Opts extends Options<t.RegexLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): boolean;
export function isRegexLiteral<Opts extends Options<t.RegexLiteral>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): boolean {
  deprecationWarning("isRegexLiteral", "isRegExpLiteral");
  if (!node) return false;

  if (node.type !== "RegexLiteral") return false;

  return opts == null || shallowEqual(node, opts);
}
/**
 * @deprecated Use `isRestElement`
 */
export function isRestProperty(node: t.Node | null | undefined): boolean;
export function isRestProperty<Opts extends Options<t.RestProperty>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): boolean;
export function isRestProperty<Opts extends Options<t.RestProperty>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): boolean {
  deprecationWarning("isRestProperty", "isRestElement");
  if (!node) return false;

  if (node.type !== "RestProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
/**
 * @deprecated Use `isSpreadElement`
 */
export function isSpreadProperty(node: t.Node | null | undefined): boolean;
export function isSpreadProperty<Opts extends Options<t.SpreadProperty>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): boolean;
export function isSpreadProperty<Opts extends Options<t.SpreadProperty>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): boolean {
  deprecationWarning("isSpreadProperty", "isSpreadElement");
  if (!node) return false;

  if (node.type !== "SpreadProperty") return false;

  return opts == null || shallowEqual(node, opts);
}
/**
 * @deprecated Use `isImportOrExportDeclaration`
 */
export function isModuleDeclaration<Opts extends Options<t.ModuleDeclaration>>(
  node: t.Node | null | undefined,
  opts?: Opts | null,
): node is t.ImportOrExportDeclaration & Opts {
  deprecationWarning("isModuleDeclaration", "isImportOrExportDeclaration");
  return isImportOrExportDeclaration(node, opts);
}
