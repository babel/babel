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

  path.node.async = false;
  path.node.generator = true;

  wrapFunction(path, helpers.wrapAsync);

  const isProperty =
    path.isObjectMethod() ||
    path.isClassMethod() ||
    path.parentPath.isObjectProperty() ||
    path.parentPath.isClassProperty();

  if (!isProperty && path.isExpression()) {
    // if this node is still used as part of another expression, the other
    // expression may not necesarily be pure. Parenthesize this to avoid contaminating
    // the outer expression.
    //
    // We have to replace before annotating as path.replaceWith moves comments around.
    path.replaceWith(t.sequenceExpression([t.numericLiteral(0), path.node]));
    annotateAsPure(path.get("expressions.1").node);
  }
}
