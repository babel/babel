import {
  isCallExpression,
  isExpressionStatement,
  isIdentifier,
  isStringLiteral,
} from "@babel/types";
import type * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";

export function getImportSource({ node }: NodePath<t.ImportDeclaration>) {
  if (node.specifiers.length === 0) return node.source.value;
}

export function getRequireSource({ node }: NodePath) {
  if (!isExpressionStatement(node)) return;
  const { expression } = node;
  if (
    isCallExpression(expression) &&
    isIdentifier(expression.callee) &&
    expression.callee.name === "require" &&
    expression.arguments.length === 1 &&
    isStringLiteral(expression.arguments[0])
  ) {
    return expression.arguments[0].value;
  }
}

export function isPolyfillSource(source?: string | null): boolean {
  return source === "@babel/polyfill" || source === "core-js";
}
