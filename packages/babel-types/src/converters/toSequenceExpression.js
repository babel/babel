// @flow
import type { Scope } from "@babel/traverse";
import gatherSequenceExpressions from "./gatherSequenceExpressions";

/**
 * Turn an array of statement `nodes` into a `SequenceExpression`.
 *
 * Variable declarations are turned into simple assignments and their
 * declarations hoisted to the top of the current scope.
 *
 * Expression statements are just resolved to their expression.
 */
export default function toSequenceExpression(
  nodes: Array<Object>,
  scope: Scope,
): ?Object {
  if (!nodes || !nodes.length) return;

  const declars = [];
  const result = gatherSequenceExpressions(nodes, scope, declars);
  if (!result) return;

  for (const declar of declars) {
    scope.push(declar);
  }

  return result;
}
