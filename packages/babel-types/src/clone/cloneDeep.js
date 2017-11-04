// @flow

/**
 * Create a deep clone of a `node` and all of it's child nodes
 * excluding `_private` properties.
 */
export default function cloneDeep<T: Object>(node: T): T {
  if (!node) return node;
  const newNode = (({}: any): T);

  Object.keys(node).forEach(key => {
    if (key[0] === "_") return;

    let val = node[key];

    if (val) {
      if (val.type) {
        val = cloneDeep(val);
      } else if (Array.isArray(val)) {
        val = val.map(cloneDeep);
      }
    }

    newNode[key] = val;
  });

  return newNode;
}
