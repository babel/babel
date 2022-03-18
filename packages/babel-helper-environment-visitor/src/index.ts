import type { NodePath, Visitor } from "@babel/traverse";
import type * as t from "@babel/types";
import type { PluginPass } from "@babel/core";

// TODO (Babel 8): Don't export this function.
export function skipAllButComputedKey(
  path: NodePath<t.Method | t.ClassProperty>,
) {
  path.skip();
  if (path.node.computed) {
    // requeue the computed key
    path.context.maybeQueue(path.get("key"));
  }
}

// environmentVisitor should be used when traversing the whole class and not for specific class elements/methods.
// For perf reasons, the environmentVisitor might be traversed with `{ noScope: true }`, which means `path.scope` is undefined.
// Avoid using `path.scope` here
export default {
  FunctionParent(path) {
    if (path.isArrowFunctionExpression()) {
      // arrows are not skipped because they inherit the context.
      return;
    } else if (path.isMethod()) {
      skipAllButComputedKey(path);
    } else {
      path.skip();
    }
  },
  ClassProperty(path) {
    skipAllButComputedKey(path);
  },
} as Visitor<PluginPass>;
