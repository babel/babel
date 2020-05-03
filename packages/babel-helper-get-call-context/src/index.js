import type { NodePath } from "@babel/traverse";

export default function(callPath: NodePath): NodePath {
  callPath.assertCallExpression();

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
