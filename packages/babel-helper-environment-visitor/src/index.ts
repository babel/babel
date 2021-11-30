import type { NodePath } from "@babel/traverse";
import { VISITOR_KEYS, staticBlock } from "@babel/types";
import type * as t from "@babel/types";

// TODO (Babel 8): Don't export this function.
export function skipAllButComputedKey(
  path: NodePath<t.Method | t.ClassProperty>,
) {
  // If the path isn't computed, just skip everything.
  if (!path.node.computed) {
    path.skip();
    return;
  }

  // So it's got a computed key. Make sure to skip every other key the
  // traversal would visit.
  const keys = VISITOR_KEYS[path.type];
  for (const key of keys) {
    if (key !== "key") path.skipKey(key);
  }
}

// Methods are handled by the Method visitor; arrows are not skipped because they inherit the context.
const skipKey = process.env.BABEL_8_BREAKING
  ? "StaticBlock|ClassPrivateProperty|TypeAnnotation|FunctionDeclaration|FunctionExpression"
  : (staticBlock ? "StaticBlock|" : "") +
    "ClassPrivateProperty|TypeAnnotation|FunctionDeclaration|FunctionExpression";

// environmentVisitor should be used when traversing the whole class and not for specific class elements/methods.
// For perf reasons, the environmentVisitor might be traversed with `{ noScope: true }`, which means `path.scope` is undefined.
// Avoid using `path.scope` here
export default {
  [skipKey]: path => path.skip(),

  "Method|ClassProperty"(path: NodePath<t.Method | t.ClassProperty>) {
    skipAllButComputedKey(path);
  },
};
