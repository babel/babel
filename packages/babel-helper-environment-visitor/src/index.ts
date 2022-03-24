import type { NodePath, Visitor } from "@babel/traverse";
import type * as t from "@babel/types";

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

export function requeueComputedKeyAndDecorator(
  path: NodePath<t.Method | t.Property>,
) {
  const { context } = path;
  //@ts-ignore ClassPrivateProperty does not have computed
  if (path.node.computed) {
    // requeue the computed key
    context.maybeQueue(path.get("key"));
  }
  if (path.node.decorators) {
    for (const decorator of path.get("decorators")) {
      // requeue the decorators
      context.maybeQueue(decorator);
    }
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
    } else {
      path.skip();
      if (path.isMethod()) {
        requeueComputedKeyAndDecorator(path);
      }
    }
  },
  "ClassProperty|ClassPrivateProperty"(
    path: NodePath<t.ClassProperty | t.ClassPrivateProperty>,
  ) {
    path.skip();
    requeueComputedKeyAndDecorator(path);
  },
} as Visitor<unknown>;
