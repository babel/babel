import * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";

export function getCallContext(callPath: NodePath): NodePath {
  if (!callPath.isCallExpression() && !callPath.isOptionalCallExpression()) {
    throw new Error(
      `Expected type "CallExpression" or "OptionalCallExpression" ` +
        `but instead got "${callPath.type}".`,
    );
  }

  const calleePath = callPath.get("callee");
  return skipTransparentExprWrappers(calleePath);
}

export function isTransparentExprWrapper(node: Node) {
  return (
    t.isTSAsExpression(node) ||
    t.isTSTypeAssertion(node) ||
    t.isTSNonNullExpression(node) ||
    t.isTypeCastExpression(node) ||
    t.isParenthesizedExpression(node)
  );
}

export default function skipTransparentExprWrappers(path: NodePath): NodePath {
  while (isTransparentExprWrapper(path.node)) {
    path = path.get("expression");
  }

  return path;
}
