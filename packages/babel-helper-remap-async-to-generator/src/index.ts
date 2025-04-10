/* @noflow */

import type { NodePath } from "@babel/core";
import wrapFunction from "@babel/helper-wrap-function";
import annotateAsPure from "@babel/helper-annotate-as-pure";
import { types as t } from "@babel/core";
import { visitors } from "@babel/traverse";
const {
  callExpression,
  cloneNode,
  isIdentifier,
  isThisExpression,
  yieldExpression,
} = t;

const awaitVisitor = visitors.environmentVisitor<{ wrapAwait: t.Expression }>({
  ArrowFunctionExpression(path) {
    path.skip();
  },

  AwaitExpression(path, { wrapAwait }) {
    const argument = path.get("argument");

    path.replaceWith(
      yieldExpression(
        wrapAwait
          ? callExpression(cloneNode(wrapAwait), [argument.node])
          : argument.node,
      ),
    );
  },
});

export default function (
  path: NodePath<t.Function>,
  helpers: {
    wrapAsync: t.Expression;
    wrapAwait?: t.Expression;
  },
  noNewArrows?: boolean,
  ignoreFunctionLength?: boolean,
) {
  path.traverse(awaitVisitor, {
    wrapAwait: helpers.wrapAwait,
  });

  const isIIFE = checkIsIIFE(path);

  path.node.async = false;
  path.node.generator = true;

  wrapFunction(
    path,
    cloneNode(helpers.wrapAsync),
    noNewArrows,
    ignoreFunctionLength,
  );

  const isProperty =
    path.isObjectMethod() ||
    path.isClassMethod() ||
    path.parentPath.isObjectProperty() ||
    path.parentPath.isClassProperty();

  if (!isProperty && !isIIFE && path.isExpression()) {
    annotateAsPure(path);
  }

  function checkIsIIFE(path: NodePath) {
    if (path.parentPath.isCallExpression({ callee: path.node })) {
      return true;
    }

    // try to catch calls to Function#bind, as emitted by arrowFunctionToExpression in spec mode
    // this may also catch .bind(this)/.call()/.apply() written by users, but does it matter? 🤔
    const { parentPath } = path;

    if (
      parentPath.isMemberExpression() &&
      isIdentifier(parentPath.node.property)
    ) {
      const { parentPath: methodCall } = parentPath;
      const { name: methodName } = parentPath.node.property;

      if (["call", "apply"].includes(methodName)) {
        // (function () { ... }).apply(...)
        // (function () { ... }).call(...)

        // check if the result of '.call()' or '.apply()' is immediately invoked
        return methodCall.isCallExpression({ callee: parentPath.node });
      }

      if (methodName === "bind") {
        // (function () { ... }).bind(this)()

        return (
          // first, check if the .bind is actually being called
          methodCall.isCallExpression() &&
          // and whether its sole argument is 'this'
          methodCall.node.arguments.length === 1 &&
          isThisExpression(methodCall.node.arguments[0]) &&
          // and whether the result of the .bind(this) is being called
          methodCall.parentPath.isCallExpression({ callee: methodCall.node })
        );
      }
    }

    return false;
  }
}
