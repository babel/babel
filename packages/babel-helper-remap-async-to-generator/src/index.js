/* @noflow */

import type { NodePath } from "@babel/traverse";
import wrapFunction from "@babel/helper-wrap-function";
import annotateAsPure from "@babel/helper-annotate-as-pure";
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
          ? t.callExpression(wrapAwait, [argument.node])
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

  const isIIFE = path.parentPath.isCallExpression({ callee: path.node });

  path.node.async = false;
  path.node.generator = true;

  wrapFunction(path, helpers.wrapAsync);

  const isProperty =
    path.isObjectMethod() ||
    path.isClassMethod() ||
    path.parentPath.isObjectProperty() ||
    path.parentPath.isClassProperty();

  if (!isProperty && !isIIFE) {
    annotateAsPure(
      path.isDeclaration() ? path.get("declarations.0.init") : path,
    );
  }
}
