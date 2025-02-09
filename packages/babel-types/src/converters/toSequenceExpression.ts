// TODO(Babel 8) Remove this file
if (process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH) {
  throw new Error(
    "Internal Babel error: This file should only be loaded in Babel 7",
  );
}

import gatherSequenceExpressions from "./gatherSequenceExpressions.ts";
import type * as t from "../index.ts";
import type { DeclarationInfo } from "./gatherSequenceExpressions.ts";

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
  const result = gatherSequenceExpressions(nodes, declars);
  if (!result) return;

  for (const declar of declars) {
    scope.push(declar);
  }

  // @ts-expect-error fixme: gatherSequenceExpressions will return an Expression when there are only one element
  return result;
}
