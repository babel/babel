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
import cloneNode from "../clone/cloneNode";
import type * as t from "..";
import type { Scope } from "@babel/traverse";

export type DeclarationInfo = {
  kind: t.VariableDeclaration["kind"];
  id: t.Identifier;
};

export default function gatherSequenceExpressions(
  nodes: ReadonlyArray<t.Node>,
  scope: Scope,
  declars: Array<DeclarationInfo>,
) {
  const exprs: t.Expression[] = [];
  let ensureLastUndefined = true;

  for (const node of nodes) {
    // if we encounter emptyStatement before a non-emptyStatement
    // we want to disregard that
    if (!isEmptyStatement(node)) {
      ensureLastUndefined = false;
    }

    if (isExpression(node)) {
      exprs.push(node);
    } else if (isExpressionStatement(node)) {
      exprs.push(node.expression);
    } else if (isVariableDeclaration(node)) {
      if (node.kind !== "var") return; // bailed

      for (const declar of node.declarations) {
        const bindings = getBindingIdentifiers(declar);
        for (const key of Object.keys(bindings)) {
          declars.push({
            kind: node.kind,
            id: cloneNode(bindings[key]),
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
      // checks if emptyStatement is first
      if (nodes.indexOf(node) === 0) {
        ensureLastUndefined = true;
      }
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
