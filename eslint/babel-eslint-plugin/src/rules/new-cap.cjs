const ruleComposer = require("eslint-rule-composer");
const eslint = require("eslint");
const eslintVersion = eslint.ESLint.version;

const rule = (
  parseInt(eslintVersion, 10) >= 9
    ? require("eslint/use-at-your-own-risk").builtinRules
    : new eslint.Linter().getRules()
).get("new-cap");

/**
 * Returns whether a node is under a decorator or not.
 * @param  {ASTNode}  node CallExpression node
 * @returns {Boolean} Returns true if the node is under a decorator.
 */
function isDecorator(node) {
  return node.parent.type === "Decorator";
}

module.exports = ruleComposer.filterReports(
  rule,
  problem => !isDecorator(problem.node),
);
