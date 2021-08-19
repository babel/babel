import { environmentVisitor } from "@babel/helper-replace-supers";
import traverse from "@babel/traverse";
import { numericLiteral, unaryExpression } from "@babel/types";
import type * as t from "@babel/types";

import type { NodePath, Visitor } from "@babel/traverse";
export default function rewriteThis(programPath: NodePath) {
  // Rewrite "this" to be "undefined".
  traverse(programPath.node, { ...rewriteThisVisitor, noScope: true });
}

/**
 * A visitor to walk the tree, rewriting all `this` references in the top-level scope to be
 * `void 0` (undefined).
 */
const rewriteThisVisitor: Visitor = traverse.visitors.merge([
  environmentVisitor,
  {
    ThisExpression(path: NodePath<t.ThisExpression>) {
      path.replaceWith(unaryExpression("void", numericLiteral(0), true));
    },
  },
]);
