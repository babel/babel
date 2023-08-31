import { VISITOR_KEYS } from "../definitions/index.ts";
import type * as t from "../index.ts";

export type TraversalAncestors = Array<{
  node: t.Node;
  key: string;
  index?: number;
}>;

export type TraversalHandler<T> = (
  this: undefined,
  node: t.Node,
  parent: TraversalAncestors,
  state: T,
) => void;

export type TraversalHandlers<T> = {
  enter?: TraversalHandler<T>;
  exit?: TraversalHandler<T>;
};

/**
 * A general AST traversal with both prefix and postfix handlers, and a
 * state object. Exposes ancestry data to each handler so that more complex
 * AST data can be taken into account.
 */
export default function traverse<T>(
  node: t.Node,
  handlers: TraversalHandler<T> | TraversalHandlers<T>,
  state?: T,
): void {
  if (typeof handlers === "function") {
    handlers = { enter: handlers };
  }

  const { enter, exit } = handlers;

  traverseSimpleImpl(node, enter, exit, state, []);
}

function traverseSimpleImpl<T>(
  node: any,
  enter: Function | undefined,
  exit: Function | undefined,
  state: T | undefined,
  ancestors: TraversalAncestors,
) {
  const keys = VISITOR_KEYS[node.type];
  if (!keys) return;

  if (enter) enter(node, ancestors, state);

  for (const key of keys) {
    const subNode = node[key];

    if (Array.isArray(subNode)) {
      for (let i = 0; i < subNode.length; i++) {
        const child = subNode[i];
        if (!child) continue;

        ancestors.push({
          node,
          key,
          index: i,
        });

        traverseSimpleImpl(child, enter, exit, state, ancestors);

        ancestors.pop();
      }
    } else if (subNode) {
      ancestors.push({
        node,
        key,
      });

      traverseSimpleImpl(subNode, enter, exit, state, ancestors);

      ancestors.pop();
    }
  }

  if (exit) exit(node, ancestors, state);
}
