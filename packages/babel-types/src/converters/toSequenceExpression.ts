// todo: update once traverse is in TS
// import type { Scope } from "@babel/traverse";
import gatherSequenceExpressions from "./gatherSequenceExpressions";
import type * as types from "../types";

// NOTE: this actually uses Scope from @babel/traverse, but we can't add a dependency on its types,
// as they live in @types. Declare the structural subset that is required.
type Scope = {
  push(value: { id: types.LVal; kind: "var"; init?: types.Expression }): void;
  buildUndefinedNode(): types.Node;
};

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
