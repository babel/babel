import { VISITOR_KEYS } from "./index";

/**
 * A prefix AST traversal implementation meant for simple searching
 * and processing.
 */
export function traverseFast(
  node: Node,
  enter: (node: Node) => void,
  opts?: Object,
) {
  if (!node) return;

  const keys = VISITOR_KEYS[node.type];
  if (!keys) return;

  opts = opts || {};
  enter(node, opts);

  for (const key of keys) {
    const subNode = node[key];

    if (Array.isArray(subNode)) {
      for (const node of subNode) {
        traverseFast(node, enter, opts);
      }
    } else {
      traverseFast(subNode, enter, opts);
    }
  }
}

export type TraversalAncestors = Array<{
  node: BabelNode,
  key: string,
  index?: number,
}>;
export type TraversalHandler<T> = (BabelNode, TraversalAncestors, T) => void;
export type TraversalHandlers<T> = {
  enter?: TraversalHandler<T>,
  exit?: TraversalHandler<T>,
};

/**
 * A general AST traversal with both prefix and postfix handlers, and a
 * state object. Exposes ancestry data to each handler so that more complex
 * AST data can be taken into account.
 */
export function traverse<T>(
  node: BabelNode,
  handlers: TraversalHandler<T> | TraversalHandlers<T>,
  state?: T,
) {
  if (typeof handlers === "function") {
    handlers = { enter: handlers };
  }

  const { enter, exit } = handlers;

  traverseSimpleImpl(node, enter, exit, state, []);
}
function traverseSimpleImpl(node, enter, exit, state, ancestors) {
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
