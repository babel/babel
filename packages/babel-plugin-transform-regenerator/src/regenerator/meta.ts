import { types as t } from "@babel/core";

// These types are the direct cause of all leaps in control flow.
const leapTypes = new Set([
  "YieldExpression",
  "AwaitExpression",
  "BreakStatement",
  "ContinueStatement",
  "ReturnStatement",
  "ThrowStatement",
]);

export function containsLeap(node: t.Node | null): boolean {
  if (!node) return false;

  // Functions are "opaque" which means they have no leaps and we don't care
  // about their subexpressions.
  if (
    node.type === "FunctionExpression" ||
    node.type === "ArrowFunctionExpression"
  ) {
    return false;
  }

  if (leapTypes.has(node.type)) return true;

  return containsLeapInChildren(node);
}

const containsLeapInChildrenCache = new WeakMap<t.Node, boolean>();

export function containsLeapInChildren(node: t.Node): boolean {
  if (containsLeapInChildrenCache.has(node)) {
    return containsLeapInChildrenCache.get(node)!;
  }

  const keys = t.VISITOR_KEYS[node.type];
  if (keys) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const child = node[key as keyof typeof node] as unknown as
        t.Node | t.Node[];
      if (Array.isArray(child)) {
        if (child.some(containsLeap)) {
          containsLeapInChildrenCache.set(node, true);
          return true;
        }
      } else if (t.isNode(child)) {
        if (containsLeap(child)) {
          containsLeapInChildrenCache.set(node, true);
          return true;
        }
      }
    }
  }

  containsLeapInChildrenCache.set(node, false);
  return false;
}
