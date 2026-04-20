import * as ruleComposer from "../rule-composer.js";
// eslint-disable-next-line import/no-unresolved
import { builtinRules } from "eslint/use-at-your-own-risk";
const rule = builtinRules.get("no-unused-expressions");

/**
 * @param {ASTNode} node - any node
 * @returns {boolean} whether the given node is either an IfStatement or an
 *   ExpressionStatement and is the last node in the body of a BlockStatement
 */
function isFinalStatementInBlockStatement(node) {
  const parent = node.parent;
  return (
    /^(?:If|Expression)Statement$/.test(node.type) &&
    parent.type === "BlockStatement" &&
    parent.body[parent.body.length - 1] === node
  );
}

/**
 * @param {ASTNode} node - any node
 * @returns {boolean} whether the given node represents an unbroken chain of
 *   tail ExpressionStatements and IfStatements within a DoExpression
 * https://github.com/tc39/proposal-do-expressions
 */
function isInDoStatement(node) {
  if (!node) return false;

  if (node.type === "DoExpression") return true;

  // this is an `else if`
  if (
    node.type === "IfStatement" &&
    node.parent &&
    node.parent.type === "IfStatement"
  ) {
    return isInDoStatement(node.parent);
  }

  if (isFinalStatementInBlockStatement(node)) {
    return isInDoStatement(node.parent.parent);
  }

  return false;
}

export default ruleComposer.filterReports(
  rule,
  problem => !isInDoStatement(problem.node),
);
