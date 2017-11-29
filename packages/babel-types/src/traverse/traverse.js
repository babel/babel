// @flow
import { VISITOR_KEYS } from "../definitions";

export type TraversalAncestors = Array<{
  node: BabelNode,
  key: string,
  index?: number,
}>;
export type TraversalHandler<S: Object> = (
  BabelNode,
  TraversalAncestors,
  S,
) => void;
export type TraversalHandlers<S: Object> = {
  enter?: TraversalHandler<S>,
  exit?: TraversalHandler<S>,
};

/**
 * A general AST traversal with both prefix and postfix handlers, and a
 * state object. Exposes ancestry data to each handler so that more complex
 * AST data can be taken into account.
 */
export default function traverse<S: Object>(
  node: BabelNode,
  handlers: TraversalHandler<S> | TraversalHandlers<S>,
  state?: S,
): void {
  if (typeof handlers === "function") {
    handlers = { enter: handlers };
  }

  const { enter, exit } = (handlers: TraversalHandlers<S>);

  traverseSimpleImpl(node, enter, exit, state, []);
}

function traverseSimpleImpl<T: Object>(
  node: T,
  enter: ?Function,
  exit: ?Function,
  state: ?Object,
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
