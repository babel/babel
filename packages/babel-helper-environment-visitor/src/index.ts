import type { NodePath } from "@babel/traverse";
import { VISITOR_KEYS, staticBlock } from "@babel/types";
import type * as t from "@babel/types";

// TODO (Babel 8): Don't export this function.
export function skipAllButComputedKey(
  path: NodePath<t.Method | t.ClassProperty | t.ClassPrivateProperty>,
) {
  // If the path isn't computed, just skip everything.
  // @ts-expect-error todo(flow->ts) check node type before cheking the property
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

const skipKey = process.env.BABEL_8_BREAKING
  ? "StaticBlock|ClassPrivateProperty|TypeAnnotation"
  : `${staticBlock ? "StaticBlock|" : ""}ClassPrivateProperty|TypeAnnotation`;

// environmentVisitor should be used when traversing the whole class and not for specific class elements/methods.
// For perf reasons, the environmentVisitor might be traversed with `{ noScope: true }`, which means `path.scope` is undefined.
// Avoid using `path.scope` here
export default {
  [skipKey]: path => path.skip(),

  Function(path: NodePath<t.Function>) {
    // Methods will be handled by the Method visit
    if (path.isMethod()) return;
    // Arrow functions inherit their parent's environment
    if (path.isArrowFunctionExpression()) return;
    path.skip();
  },

  "Method|ClassProperty"(path: NodePath<t.Method | t.ClassProperty>) {
    skipAllButComputedKey(path);
  },
};
