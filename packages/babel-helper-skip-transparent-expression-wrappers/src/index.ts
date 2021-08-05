import { NodePath } from "@babel/traverse";
import {
  isParenthesizedExpression,
  isTSAsExpression,
  isTSNonNullExpression,
  isTSTypeAssertion,
  isTypeCastExpression,
} from "@babel/types";

import type * as t from "@babel/types";

export type TransparentExprWrapper =
  | t.TSAsExpression
  | t.TSTypeAssertion
  | t.TSNonNullExpression
  | t.TypeCastExpression
  | t.ParenthesizedExpression;

// A transparent expression wrapper is an AST node that most plugins will wish
// to skip, as its presence does not affect the behaviour of the code. This
// includes expressions used for types, and extra parenthesis. For example, in
// (a as any)(), this helper can be used to skip the TSAsExpression when
// determining the callee.
export function isTransparentExprWrapper(
  node: t.Node,
): node is TransparentExprWrapper {
  return (
    isTSAsExpression(node) ||
    isTSTypeAssertion(node) ||
    isTSNonNullExpression(node) ||
    isTypeCastExpression(node) ||
    isParenthesizedExpression(node)
  );
}

type ExprNodeOrPath = t.Expression | NodePath<t.Expression>;

export function skipTransparentExprWrappers(expr: t.Expression): t.Expression;

export function skipTransparentExprWrappers(
  expr: NodePath<t.Expression>,
): NodePath<t.Expression>;

export function skipTransparentExprWrappers(
  expr: ExprNodeOrPath,
): ExprNodeOrPath {
  if (expr instanceof NodePath) {
    while (isTransparentExprWrapper(expr.node)) {
      expr = expr.get("expression");
    }
  } else {
    while (isTransparentExprWrapper(expr)) {
      expr = expr.expression;
    }
  }
  return expr;
}
