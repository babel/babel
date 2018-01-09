/* @noflow */

import type { NodePath } from "@babel/traverse";
import wrapFunction from "@babel/helper-wrap-function";
import annotateAsPure from "@babel/helper-annotate-as-pure";
import * as t from "@babel/types";
import rewriteForAwait from "./for-await";

const awaitVisitor = {
  Function(path) {
    path.skip();
  },

  AwaitExpression(path, { wrapAwait }) {
    const argument = path.get("argument");

    if (path.parentPath.isYieldExpression()) {
      path.replaceWith(argument.node);
      return;
    }

    path.replaceWith(
      t.yieldExpression(
        wrapAwait
          ? t.callExpression(wrapAwait, [argument.node])
          : argument.node,
      ),
    );
  },

  ForOfStatement(path, { file, wrapAwait }) {
    const { node } = path;
    if (!node.await) return;

    const build = rewriteForAwait(path, {
      getAsyncIterator: file.addHelper("asyncIterator"),
      wrapAwait,
    });

    const { declar, loop } = build;
    const block = loop.body;

    // ensure that it's a block so we can take all its statements
    path.ensureBlock();

    // add the value declaration to the new loop body
    if (declar) {
      block.body.push(declar);
    }

    // push the rest of the original loop body onto our new body
    block.body = block.body.concat(node.body.body);

    t.inherits(loop, node);
    t.inherits(loop.body, node.body);

    if (build.replaceParent) {
      path.parentPath.replaceWithMultiple(build.node);
    } else {
      path.replaceWithMultiple(build.node);
    }
  },
};

export default function(path: NodePath, file: Object, helpers: Object) {
  path.traverse(awaitVisitor, {
    file,
    wrapAwait: helpers.wrapAwait,
  });

  const isIIFE = checkIsIIFE(path);

  path.node.async = false;
  path.node.generator = true;

  wrapFunction(path, helpers.wrapAsync);

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
    // this may also catch .bind(this) written by users, but does it matter? 🤔
    const { parentPath } = path;
    if (
      parentPath.isMemberExpression() &&
      t.isIdentifier(parentPath.node.property, { name: "bind" })
    ) {
      const { parentPath: bindCall } = parentPath;

      // (function () { ... }).bind(this)()

      return (
        // first, check if the .bind is actually being called
        bindCall.isCallExpression() &&
        // and whether its sole argument is 'this'
        bindCall.node.arguments.length === 1 &&
        t.isThisExpression(bindCall.node.arguments[0]) &&
        // and whether the result of the .bind(this) is being called
        bindCall.parentPath.isCallExpression({ callee: bindCall.node })
      );
    }

    return false;
  }
}
