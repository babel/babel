// @flow

/**
 * Create a shallow clone of a `node` excluding `_private` properties.
 */
export default function clone<T: Object>(node: T): T {
  if (!node) return node;
  const newNode = (({}: any): T);

  Object.keys(node).forEach(key => {
    if (key[0] === "_") return;
    newNode[key] = node[key];
  });

  return newNode;
}
