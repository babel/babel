import { types as t, template } from "@babel/core";
import type { NodePath } from "@babel/traverse";

const buildForAwait = template.statements(`
  var ITERATOR_KEY = GET_ITERATOR(OBJECT), STEP_KEY, NOT_DONE_KEY;
  try {
    for (;NOT_DONE_KEY = !(STEP_KEY = await ITERATOR_KEY.next()).done;NOT_DONE_KEY = false) {
    }
  } catch(e) {
    STEP_KEY = null;
    throw e;
  } finally {
    try {
      if (NOT_DONE_KEY && ITERATOR_KEY.return) {
        await ITERATOR_KEY.return();
      }
    } catch (e) {
      if (STEP_KEY) throw e;
    }
  }
`);

export default function (
  path: NodePath<t.ForOfStatement>,
  { getAsyncIterator }: { getAsyncIterator: t.Identifier },
) {
  const { node, scope, parent } = path;

  const stepKey = scope.generateUidIdentifier("step");
  const stepValue = t.memberExpression(stepKey, t.identifier("value"));
  const left = node.left;
  let declar;

  if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
    // for await (i of test), for await ({ i } of test)
    declar = t.expressionStatement(
      t.assignmentExpression("=", left, stepValue),
    );
  } else if (t.isVariableDeclaration(left)) {
    // for await (let i of test)
    declar = t.variableDeclaration(left.kind, [
      t.variableDeclarator(left.declarations[0].id, stepValue),
    ]);
  }
  const template = buildForAwait({
    ITERATOR_KEY: scope.generateUidIdentifier("iterator"),
    NOT_DONE_KEY: scope.generateUidIdentifier("notDone"),
    GET_ITERATOR: getAsyncIterator,
    OBJECT: node.right,
    STEP_KEY: t.cloneNode(stepKey),
  });

  const isLabeledParent = t.isLabeledStatement(parent);
  const tryBody = (template[1] as t.TryStatement).block.body;
  const loop = tryBody[0] as t.ForStatement;

  if (isLabeledParent) {
    tryBody[0] = t.labeledStatement(parent.label, loop);
  }

  return {
    replaceParent: isLabeledParent,
    node: template,
    declar,
    loop,
  };
}
