import { types as t, template } from "@babel/core";
import type { NodePath } from "@babel/traverse";

const buildForAwait = template(`
  async function wrapper() {
    var STEP_KEY = {};
    try {
      for (
        var ITERATOR_KEY = GET_ITERATOR(OBJECT);
        !(STEP_KEY = await ITERATOR_KEY.next()).done;
      ) {
      }
    } finally {
      try {
        if (!STEP_KEY.done && ITERATOR_KEY.return != null) {
          await ITERATOR_KEY.return();
        }
      } catch (e) {}
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
  let template = buildForAwait({
    ITERATOR_KEY: scope.generateUidIdentifier("iterator"),
    GET_ITERATOR: getAsyncIterator,
    OBJECT: node.right,
    STEP_KEY: t.cloneNode(stepKey),
  });

  // remove async function wrapper
  // @ts-expect-error todo(flow->ts) improve type annotation for buildForAwait
  template = template.body.body as t.Statement[];

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
