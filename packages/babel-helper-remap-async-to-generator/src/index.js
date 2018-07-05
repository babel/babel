/* @noflow */

import type { NodePath } from "@babel/traverse";
import wrapFunction from "@babel/helper-wrap-function";
import * as t from "@babel/types";

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
          ? t.callExpression(t.cloneNode(wrapAwait), [argument.node])
          : argument.node,
      ),
    );
  },
};

export default function(
  path: NodePath,
  helpers: { wrapAsync: Object, wrapAwait: Object },
) {
  path.traverse(awaitVisitor, {
    wrapAwait: helpers.wrapAwait,
  });

  path.node.async = false;
  path.node.generator = false;

  wrapFunction(path, t.cloneNode(helpers.wrapAsync));
}
