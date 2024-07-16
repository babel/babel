import environmentVisitor from "@babel/helper-environment-visitor";
import { traverse, types as t } from "@babel/core";
const { numericLiteral, unaryExpression } = t;

import type { NodePath } from "@babel/core";

/**
 * A lazily constructed visitor to walk the tree, rewriting all `this` references in the
 * top-level scope to be `void 0` (undefined).
 *
 */
let rewriteThisVisitor: Parameters<typeof traverse>[1];

export default function rewriteThis(programPath: NodePath) {
  if (!rewriteThisVisitor) {
    rewriteThisVisitor = traverse.visitors.merge([
      environmentVisitor,
      {
        ThisExpression(path) {
          path.replaceWith(unaryExpression("void", numericLiteral(0), true));
        },
      },
    ]);
    rewriteThisVisitor.noScope = true;
  }
  // Rewrite "this" to be "undefined".
  traverse(programPath.node, rewriteThisVisitor);
}
