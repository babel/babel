import { types as t, template, type NodePath } from "@babel/core";

const buildForAwait = template(`
  async function wrapper() {
    var ITERATOR_ABRUPT_COMPLETION = false;
    var ITERATOR_HAD_ERROR_KEY = false;
    var ITERATOR_ERROR_KEY;
    try {
      for (
        var ITERATOR_KEY = GET_ITERATOR(OBJECT), STEP_KEY;
        ITERATOR_ABRUPT_COMPLETION = !(STEP_KEY = await ITERATOR_KEY.next()).done;
        ITERATOR_ABRUPT_COMPLETION = false
      ) {
      }
    } catch (err) {
      ITERATOR_HAD_ERROR_KEY = true;
      ITERATOR_ERROR_KEY = err;
    } finally {
      try {
        if (ITERATOR_ABRUPT_COMPLETION && ITERATOR_KEY.return != null) {
          await ITERATOR_KEY.return();
        }
      } finally {
        if (ITERATOR_HAD_ERROR_KEY) {
          throw ITERATOR_ERROR_KEY;
        }
      }
    }
  }
`);

// Per spec (ForIn/OfHeadEvaluation), const/let ForDeclarations create a TDZ
// scope before the iterable expression is evaluated. Check if the iterable
// expression references any of the declared binding names to determine if a
// TDZ wrapper is needed to preserve this behavior after transformation.
function nodeReferencesNames(node: t.Node, names: Set<string>): boolean {
  if (t.isIdentifier(node)) return names.has(node.name);

  const keys = t.VISITOR_KEYS[node.type];
  if (!keys) return false;

  for (const key of keys) {
    const child = (node as unknown as Record<string, unknown>)[key];
    if (Array.isArray(child)) {
      for (const item of child) {
        if (
          (item as t.Node)?.type &&
          nodeReferencesNames(item as t.Node, names)
        ) {
          return true;
        }
      }
    } else if (
      (child as t.Node)?.type &&
      nodeReferencesNames(child as t.Node, names)
    ) {
      return true;
    }
  }

  return false;
}

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

  // When the for-await has a const/let declaration whose bound names appear
  // in the iterable expression, we must wrap the iterator initialization in a
  // block that creates TDZ bindings for those names, matching the spec's
  // ForIn/OfHeadEvaluation behavior.
  let object: t.Expression = node.right;
  let tdzNodes: t.Statement[] | undefined;

  if (t.isVariableDeclaration(left) && left.kind !== "var") {
    const boundNames = Object.keys(
      t.getBindingIdentifiers(left.declarations[0].id),
    );
    if (boundNames.length > 0) {
      const nameSet = new Set(boundNames);
      if (nodeReferencesNames(node.right, nameSet)) {
        const objectUid = scope.generateUidIdentifier("object");
        tdzNodes = [
          // var _object;
          t.variableDeclaration("var", [t.variableDeclarator(objectUid)]),
          // { _object = EXPR; let name1, name2, ...; }
          t.blockStatement([
            t.expressionStatement(
              t.assignmentExpression("=", t.cloneNode(objectUid), node.right),
            ),
            t.variableDeclaration(
              "let",
              boundNames.map(name => t.variableDeclarator(t.identifier(name))),
            ),
          ]),
        ];
        object = t.cloneNode(objectUid);
      }
    }
  }

  const tmpl = buildForAwait({
    ITERATOR_HAD_ERROR_KEY: scope.generateUidIdentifier("didIteratorError"),
    ITERATOR_ABRUPT_COMPLETION: scope.generateUidIdentifier(
      "iteratorAbruptCompletion",
    ),
    ITERATOR_ERROR_KEY: scope.generateUidIdentifier("iteratorError"),
    ITERATOR_KEY: scope.generateUidIdentifier("iterator"),
    GET_ITERATOR: getAsyncIterator,
    OBJECT: object,
    STEP_KEY: t.cloneNode(stepKey),
  });

  // remove async function wrapper
  // @ts-expect-error todo(flow->ts) improve type annotation for buildForAwait
  const statements = tmpl.body.body as t.Statement[];

  // Get the try statement reference before any splice
  const tryStatement = statements[3] as t.TryStatement;

  // Insert TDZ wrapper nodes before the try statement
  if (tdzNodes) {
    statements.splice(3, 0, ...tdzNodes);
  }

  const isLabeledParent = t.isLabeledStatement(parent);
  const tryBody = tryStatement.block.body;
  const loop = tryBody[0] as t.ForStatement;

  if (isLabeledParent) {
    tryBody[0] = t.labeledStatement(parent.label, loop);
  }

  return {
    replaceParent: isLabeledParent,
    node: statements,
    declar,
    loop,
  };
}
