import { environmentVisitor } from "@babel/helper-replace-supers";
import traverse from "@babel/traverse";
import * as t from "@babel/types";

export default function rewriteThis(programPath: NodePath) {
  // Rewrite "this" to be "undefined".
  traverse(programPath.node, { ...rewriteThisVisitor, noScope: true });
}

/**
 * A visitor to walk the tree, rewriting all `this` references in the top-level scope to be
 * `void 0` (undefined).
 */
const rewriteThisVisitor = traverse.visitors.merge([
  environmentVisitor,
  {
    ThisExpression(path) {
      path.replaceWith(t.unaryExpression("void", t.numericLiteral(0), true));
    },
  },
]);
