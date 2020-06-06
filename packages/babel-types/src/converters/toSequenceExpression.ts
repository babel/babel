import gatherSequenceExpressions from "./gatherSequenceExpressions";
import type * as types from "../types";
import type { Scope } from "./Scope";

/**
 * Turn an array of statement `nodes` into a `SequenceExpression`.
 *
 * Variable declarations are turned into simple assignments and their
 * declarations hoisted to the top of the current scope.
 *
 * Expression statements are just resolved to their expression.
 */
export default function toSequenceExpression(
  nodes: ReadonlyArray<types.Node>,
  scope: Scope,
): types.SequenceExpression | undefined {
  if (!nodes?.length) return;

  const declars = [];
  const result = gatherSequenceExpressions(nodes, scope, declars);
  if (!result) return;

  for (const declar of declars) {
    scope.push(declar);
  }

  return result;
}
