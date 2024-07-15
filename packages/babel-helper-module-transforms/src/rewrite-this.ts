import { types as t } from "@babel/core";
import traverse, { visitors, type NodePath } from "@babel/traverse";

/**
 * A lazily constructed visitor to walk the tree, rewriting all `this` references in the
 * top-level scope to be `void 0` (undefined).
 *
 */
let rewriteThisVisitor: Parameters<typeof traverse>[1];

export default function rewriteThis(programPath: NodePath) {
  if (!rewriteThisVisitor) {
    rewriteThisVisitor = visitors.environmentVisitor({
      ThisExpression(path) {
        path.replaceWith(t.unaryExpression("void", t.numericLiteral(0), true));
      },
    });
    rewriteThisVisitor.noScope = true;
  }
  // Rewrite "this" to be "undefined".
  traverse(programPath.node, rewriteThisVisitor);
}
