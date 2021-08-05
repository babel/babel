import * as t from "@babel/types";
import { NodePath } from "@babel/traverse";

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
    t.isTSAsExpression(node) ||
    t.isTSTypeAssertion(node) ||
    t.isTSNonNullExpression(node) ||
    t.isTypeCastExpression(node) ||
    t.isParenthesizedExpression(node)
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
