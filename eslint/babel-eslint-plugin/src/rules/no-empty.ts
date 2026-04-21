import * as ruleComposer from "../rule-composer.ts";
import type { BabelESTreeNode } from "../types.ts";
import { builtinRules } from "eslint/use-at-your-own-risk";
const rule = builtinRules.get("no-empty")!;

/**
 * Returns whether a node is a do expression block.
 * @param  {ASTNode}  node CallExpression node
 * @returns {Boolean} Returns true if the node is a do expression block.
 */
function isDoExpressionBlock(node: BabelESTreeNode): boolean {
  const parent = node.parent;
  return parent.type === "DoExpression";
}

export default ruleComposer.filterReports(
  rule,
  problem => !isDoExpressionBlock(problem.node),
);
