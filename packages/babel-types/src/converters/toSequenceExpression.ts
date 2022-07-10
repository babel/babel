import gatherSequenceExpressions from "./gatherSequenceExpressions";
import type * as t from "..";
import type { DeclarationInfo } from "./gatherSequenceExpressions";

/**
 * Turn an array of statement `nodes` into a `SequenceExpression`.
 *
 * Variable declarations are turned into simple assignments and their
 * declarations hoisted to the top of the current scope.
 *
 * Expression statements are just resolved to their expression.
 */
export default function toSequenceExpression(
  nodes: ReadonlyArray<t.Node>,
  scope: any,
): t.SequenceExpression | undefined {
  if (!nodes?.length) return;

  const declars: DeclarationInfo[] = [];
  const result = gatherSequenceExpressions(nodes, scope, declars);
  if (!result) return;

  for (const declar of declars) {
    scope.push(declar);
  }

  // @ts-expect-error fixme: gatherSequenceExpressions will return an Expression when there are only one element
  return result;
}
