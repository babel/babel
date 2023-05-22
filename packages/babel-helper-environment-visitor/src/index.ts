import type { NodePath, Visitor } from "@babel/traverse";
import type * as t from "@babel/types";

if (!process.env.BABEL_8_BREAKING) {
  if (!USE_ESM) {
    if (!IS_STANDALONE) {
      // eslint-disable-next-line no-restricted-globals
      exports.skipAllButComputedKey = function skipAllButComputedKey(
        path: NodePath<t.Method | t.ClassProperty>,
      ) {
        path.skip();
        if (path.node.computed) {
          // requeue the computed key
          path.context.maybeQueue(path.get("key"));
        }
      };
    }
  }
}

export function requeueComputedKeyAndDecorators(
  path: NodePath<t.Method | t.Property>,
) {
  const { context, node } = path;
  // @ts-expect-error ClassPrivateProperty does not have computed
  if (node.computed) {
    // requeue the computed key
    context.maybeQueue(path.get("key"));
  }
  if (node.decorators) {
    for (const decorator of path.get("decorators")) {
      // requeue the decorators
      context.maybeQueue(decorator);
    }
  }
}

// environmentVisitor should be used when traversing the whole class and not for specific class elements/methods.
// For perf reasons, the environmentVisitor might be traversed with `{ noScope: true }`, which means `path.scope` is undefined.
// Avoid using `path.scope` here
const visitor: Visitor = {
  FunctionParent(path) {
    if (path.isArrowFunctionExpression()) {
      // arrows are not skipped because they inherit the context.
      return;
    } else {
      path.skip();
      if (path.isMethod()) {
        requeueComputedKeyAndDecorators(path);
      }
    }
  },
  Property(path) {
    if (path.isObjectProperty()) {
      return;
    }
    path.skip();
    requeueComputedKeyAndDecorators(path);
  },
};

export default visitor;
