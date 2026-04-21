const ruleComposer = require("../rule-composer.cjs");
const rule = require("eslint/use-at-your-own-risk").builtinRules.get(
  "no-undef",
);

/**
 * Returns whether a node is an accessor field name.
 * @param  {ASTNode}  node CallExpression node
 * @returns {Boolean} Returns true if the node is an accessor field name.
 */
function isAccessorFieldName(node) {
  const parent = node.parent;
  return (
    parent.type === "AccessorProperty" &&
    parent.key === node &&
    !parent.computed
  );
}

module.exports = ruleComposer.filterReports(
  rule,
  problem => !isAccessorFieldName(problem.node),
);
