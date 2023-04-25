import { declare } from "@babel/helper-plugin-utils";
import { template, types as t } from "@babel/core";
import type { NodePath } from "@babel/traverse";

import transformWithoutHelper from "./no-helper-implementation";

export interface Options {
  allowArrayLike?: boolean;
  assumeArray?: boolean;
  loose?: boolean;
}

function buildLoopBody(
  path: NodePath<t.ForXStatement>,
  declar: t.Statement,
  newBody?: t.Statement | t.Expression,
) {
  let block;
  const bodyPath = path.get("body");
  const body = newBody ?? bodyPath.node;
  if (
    t.isBlockStatement(body) &&
    Object.keys(path.getBindingIdentifiers()).some(id =>
      bodyPath.scope.hasOwnBinding(id),
    )
  ) {
    block = t.blockStatement([declar, body]);
  } else {
    block = t.toBlock(body);
    block.body.unshift(declar);
  }
  return block;
}

export default declare((api, options: Options) => {
  api.assertVersion(7);

  {
    const { assumeArray, allowArrayLike, loose } = options;

    if (loose === true && assumeArray === true) {
      throw new Error(
        `The loose and assumeArray options cannot be used together in @babel/plugin-transform-for-of`,
      );
    }

    if (assumeArray === true && allowArrayLike === true) {
      throw new Error(
        `The assumeArray and allowArrayLike options cannot be used together in @babel/plugin-transform-for-of`,
      );
    }

    if (!process.env.BABEL_8_BREAKING) {
      // TODO: Remove in Babel 8
      if (allowArrayLike && /^7\.\d\./.test(api.version)) {
        throw new Error(
          `The allowArrayLike is only supported when using @babel/core@^7.10.0`,
        );
      }
    }
  }

  const iterableIsArray =
    options.assumeArray ??
    // Loose mode is not compatible with 'assumeArray', so we shouldn't read
    // 'iterableIsArray' if 'loose' is true.
    (!options.loose && api.assumption("iterableIsArray"));

  const arrayLikeIsIterable =
    options.allowArrayLike ?? api.assumption("arrayLikeIsIterable");

  const skipIteratorClosing =
    api.assumption("skipForOfIteratorClosing") ?? options.loose;

  if (iterableIsArray && arrayLikeIsIterable) {
    throw new Error(
      `The "iterableIsArray" and "arrayLikeIsIterable" assumptions are not compatible.`,
    );
  }

  if (iterableIsArray) {
    return {
      name: "transform-for-of",

      visitor: {
        ForOfStatement(path) {
          const { scope } = path;
          const { left, right, await: isAwait } = path.node;
          if (isAwait) {
            return;
          }
          const i = scope.generateUidIdentifier("i");
          let array: t.Identifier | t.ThisExpression =
            scope.maybeGenerateMemoised(right, true);

          const inits = [t.variableDeclarator(i, t.numericLiteral(0))];
          if (array) {
            inits.push(t.variableDeclarator(array, right));
          } else {
            array = right as t.Identifier | t.ThisExpression;
          }

          const item = t.memberExpression(
            t.cloneNode(array),
            t.cloneNode(i),
            true,
          );
          let assignment;
          if (t.isVariableDeclaration(left)) {
            assignment = left;
            assignment.declarations[0].init = item;
          } else {
            assignment = t.expressionStatement(
              t.assignmentExpression("=", left, item),
            );
          }

          path.replaceWith(
            t.forStatement(
              t.variableDeclaration("let", inits),
              t.binaryExpression(
                "<",
                t.cloneNode(i),
                t.memberExpression(t.cloneNode(array), t.identifier("length")),
              ),
              t.updateExpression("++", t.cloneNode(i)),
              buildLoopBody(path, assignment),
            ),
          );
        },
      },
    };
  }

  const buildForOfArray = template`
    for (var KEY = 0, NAME = ARR; KEY < NAME.length; KEY++) BODY;
  `;

  const buildForOfNoIteratorClosing = template.statements`
    for (var ITERATOR_HELPER = CREATE_ITERATOR_HELPER(OBJECT, ARRAY_LIKE_IS_ITERABLE), STEP_KEY;
        !(STEP_KEY = ITERATOR_HELPER()).done;) BODY;
  `;

  const buildForOf = template.statements`
    var ITERATOR_HELPER = CREATE_ITERATOR_HELPER(OBJECT, ARRAY_LIKE_IS_ITERABLE), STEP_KEY;
    try {
      for (ITERATOR_HELPER.s(); !(STEP_KEY = ITERATOR_HELPER.n()).done;) BODY;
    } catch (err) {
      ITERATOR_HELPER.e(err);
    } finally {
      ITERATOR_HELPER.f();
    }
  `;

  const builder = skipIteratorClosing
    ? {
        build: buildForOfNoIteratorClosing,
        helper: "createForOfIteratorHelperLoose",
        getContainer: (nodes: t.Statement[]): [t.ForStatement] =>
          nodes as [t.ForStatement],
      }
    : {
        build: buildForOf,
        helper: "createForOfIteratorHelper",
        getContainer: (nodes: t.Statement[]): [t.ForStatement] =>
          (nodes[1] as t.TryStatement).block.body as [t.ForStatement],
      };

  function _ForOfStatementArray(path: NodePath<t.ForOfStatement>) {
    const { node, scope } = path;

    const right = scope.generateUidIdentifierBasedOnNode(node.right, "arr");
    const iterationKey = scope.generateUidIdentifier("i");

    const loop = buildForOfArray({
      BODY: node.body,
      KEY: iterationKey,
      NAME: right,
      ARR: node.right,
    }) as t.For;

    t.inherits(loop, node);

    const iterationValue = t.memberExpression(
      t.cloneNode(right),
      t.cloneNode(iterationKey),
      true,
    );

    let declar;
    const left = node.left;
    if (t.isVariableDeclaration(left)) {
      left.declarations[0].init = iterationValue;
      declar = left;
    } else {
      declar = t.expressionStatement(
        t.assignmentExpression("=", left, iterationValue),
      );
    }

    loop.body = buildLoopBody(path, declar, loop.body);

    return loop;
  }

  return {
    name: "transform-for-of",
    visitor: {
      ForOfStatement(path, state) {
        const right = path.get("right");
        if (
          right.isArrayExpression() ||
          (process.env.BABEL_8_BREAKING
            ? right.isGenericType("Array")
            : right.isGenericType("Array") ||
              t.isArrayTypeAnnotation(right.getTypeAnnotation()))
        ) {
          path.replaceWith(_ForOfStatementArray(path));
          return;
        }

        if (!process.env.BABEL_8_BREAKING) {
          if (!state.availableHelper(builder.helper)) {
            // Babel <7.9.0 doesn't support this helper
            transformWithoutHelper(skipIteratorClosing, path, state);
            return;
          }
        }

        const { node, parent, scope } = path;
        const left = node.left;
        let declar;

        const stepKey = scope.generateUid("step");
        const stepValue = t.memberExpression(
          t.identifier(stepKey),
          t.identifier("value"),
        );

        if (t.isVariableDeclaration(left)) {
          // for (let i of test)
          declar = t.variableDeclaration(left.kind, [
            t.variableDeclarator(left.declarations[0].id, stepValue),
          ]);
        } else {
          // for (i of test), for ({ i } of test)
          declar = t.expressionStatement(
            t.assignmentExpression("=", left, stepValue),
          );
        }

        const nodes = builder.build({
          CREATE_ITERATOR_HELPER: state.addHelper(builder.helper),
          ITERATOR_HELPER: scope.generateUidIdentifier("iterator"),
          ARRAY_LIKE_IS_ITERABLE: arrayLikeIsIterable
            ? t.booleanLiteral(true)
            : null,
          STEP_KEY: t.identifier(stepKey),
          OBJECT: node.right,
          BODY: buildLoopBody(path, declar),
        });
        const container = builder.getContainer(nodes);

        t.inherits(container[0], node);
        t.inherits(container[0].body, node.body);

        if (t.isLabeledStatement(parent)) {
          // @ts-expect-error replacing node types
          container[0] = t.labeledStatement(parent.label, container[0]);

          path.parentPath.replaceWithMultiple(nodes);

          // The parent has been replaced, prevent Babel from traversing a detached path
          path.skip();
        } else {
          path.replaceWithMultiple(nodes);
        }
      },
    },
  };
});
