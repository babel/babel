const ruleComposer = require("eslint-rule-composer");
const eslint = require("eslint");
const eslintVersion = eslint.ESLint.version;

const rule = (
  parseInt(eslintVersion, 10) >= 9
    ? require("eslint/use-at-your-own-risk").builtinRules
    : new eslint.Linter().getRules()
).get("no-undef");

/**
 * Returns whether a node is under a decorator or not.
 * @param  {ASTNode}  node CallExpression node
 * @returns {Boolean} Returns true if the node is under a decorator.
 */
function isAccessorFieldName(node) {
  const parent = node.parent;
  return (
    (parent.type === "AccessorProperty" ||
      (!process.env.BABEL_8_BREAKING &&
        parent.type === "ClassAccessorProperty")) &&
    parent.key === node &&
    !parent.computed
  );
}

module.exports = ruleComposer.filterReports(
  rule,
  problem => !isAccessorFieldName(problem.node),
);
