import * as ruleComposer from "../rule-composer.js";
// eslint-disable-next-line import/no-unresolved
import { builtinRules } from "eslint/use-at-your-own-risk";
const rule = builtinRules.get("no-undef");

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

export default ruleComposer.filterReports(
  rule,
  problem => !isAccessorFieldName(problem.node),
);
