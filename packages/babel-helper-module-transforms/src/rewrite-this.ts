import type { NodePath, Visitor } from "@babel/core";
import { types as t } from "@babel/core";
import traverse, { visitors } from "@babel/traverse";

const { numericLiteral, unaryExpression } = t;

/**
 * A visitor to walk the tree, rewriting all `this` references in the top-level scope to be
 * `void 0` (undefined).
 */
const rewriteThisVisitor: Visitor = visitors.environmentVisitor({
  ThisExpression(path) {
    path.replaceWith(unaryExpression("void", numericLiteral(0), true));
  },
});

export default function rewriteThis(programPath: NodePath) {
  // Rewrite "this" to be "undefined".
  traverse(programPath.node, { ...rewriteThisVisitor, noScope: true });
}
