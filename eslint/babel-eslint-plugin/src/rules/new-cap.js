import ruleComposer from "eslint-rule-composer";
import eslint from "eslint";

const newCapRule = new eslint.Linter().getRules().get("new-cap");

/**
 * Returns whether a node is under a decorator or not.
 * @param  {ASTNode}  node CallExpression node
 * @returns {Boolean} Returns true if the node is under a decorator.
 */
function isDecorator(node) {
  return node.parent.type === "Decorator";
}

export default ruleComposer.filterReports(
  newCapRule,
  problem => !isDecorator(problem.node),
);
