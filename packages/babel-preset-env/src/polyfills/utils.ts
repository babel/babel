import * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";

export function getImportSource({ node }: NodePath<t.ImportDeclaration>) {
  if (node.specifiers.length === 0) return node.source.value;
}

export function getRequireSource({ node }: NodePath) {
  if (!t.isExpressionStatement(node)) return;
  const { expression } = node;
  if (
    t.isCallExpression(expression) &&
    t.isIdentifier(expression.callee) &&
    expression.callee.name === "require" &&
    expression.arguments.length === 1 &&
    t.isStringLiteral(expression.arguments[0])
  ) {
    return expression.arguments[0].value;
  }
}

export function isPolyfillSource(source?: string | null): boolean {
  return source === "@babel/polyfill" || source === "core-js";
}
