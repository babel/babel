import type { NodePath } from "@babel/traverse";

export default function(callPath: NodePath): NodePath {
  if (!callPath.isCallExpression() && !callPath.isOptionalCallExpression()) {
    throw new Error(
      `Expected type "CallExpression" or "OptionalCallExpression" ` +
        `but instead got "${callPath.type}".`,
    );
  }

  let calleePath = callPath.get("callee");

  while (
    calleePath.isTSAsExpression() ||
    calleePath.isTypeCastExpression() ||
    calleePath.isTSTypeAssertion() ||
    calleePath.isParenthesizedExpression()
  ) {
    calleePath = calleePath.get("expression");
  }

  return calleePath;
}
