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

export default function skipTransparentExprWrappers(path: NodePath): NodePath {
  while (
    path.isTSAsExpression() ||
    path.isTypeCastExpression() ||
    path.isTSTypeAssertion() ||
    path.isParenthesizedExpression()
  ) {
    path = path.get("expression");
  }

  return path;
}
