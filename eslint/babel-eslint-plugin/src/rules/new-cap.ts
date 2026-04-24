import * as ruleComposer from "../rule-composer.ts";
import type { BabelESTreeNode } from "../types.ts";
// eslint-disable-next-line import/no-unresolved
import { builtinRules } from "eslint/use-at-your-own-risk";
const rule = builtinRules.get("new-cap")!;

/**
 * Returns whether a node is under a decorator or not.
 * @param  {BabelESTreeNode}  node CallExpression node
 * @returns {Boolean} Returns true if the node is under a decorator.
 */
function isDecorator(node: BabelESTreeNode): boolean {
  return node.parent.type === "Decorator";
}

export default ruleComposer.filterReports(
  rule,
  problem => !isDecorator(problem.node),
);
