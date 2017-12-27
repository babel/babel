// @flow
import type { Scope } from "@babel/traverse";
import getBindingIdentifiers from "../retrievers/getBindingIdentifiers";
import {
  isExpression,
  isExpressionStatement,
  isVariableDeclaration,
  isIfStatement,
  isBlockStatement,
  isEmptyStatement,
} from "../validators/generated";
import {
  sequenceExpression,
  assignmentExpression,
  conditionalExpression,
} from "../builders/generated";

export default function gatherSequenceExpressions(
  nodes: Array<Object>,
  scope: Scope,
  declars: Array<Object>,
): ?Object {
  const exprs = [];
  let ensureLastUndefined = true;

  for (const node of nodes) {
    ensureLastUndefined = false;

    if (isExpression(node)) {
      exprs.push(node);
    } else if (isExpressionStatement(node)) {
      exprs.push(node.expression);
    } else if (isVariableDeclaration(node)) {
      if (node.kind !== "var") return; // bailed

      for (const declar of (node.declarations: Array<any>)) {
        const bindings = getBindingIdentifiers(declar);
        for (const key in bindings) {
          declars.push({
            kind: node.kind,
            id: bindings[key],
          });
        }

        if (declar.init) {
          exprs.push(assignmentExpression("=", declar.id, declar.init));
        }
      }

      ensureLastUndefined = true;
    } else if (isIfStatement(node)) {
      const consequent = node.consequent
        ? gatherSequenceExpressions([node.consequent], scope, declars)
        : scope.buildUndefinedNode();
      const alternate = node.alternate
        ? gatherSequenceExpressions([node.alternate], scope, declars)
        : scope.buildUndefinedNode();
      if (!consequent || !alternate) return; // bailed

      exprs.push(conditionalExpression(node.test, consequent, alternate));
    } else if (isBlockStatement(node)) {
      const body = gatherSequenceExpressions(node.body, scope, declars);
      if (!body) return; // bailed

      exprs.push(body);
    } else if (isEmptyStatement(node)) {
      // empty statement so ensure the last item is undefined if we're last
      ensureLastUndefined = true;
    } else {
      // bailed, we can't turn this statement into an expression
      return;
    }
  }

  if (ensureLastUndefined) {
    exprs.push(scope.buildUndefinedNode());
  }

  if (exprs.length === 1) {
    return exprs[0];
  } else {
    return sequenceExpression(exprs);
  }
}
