import isNode from "../validators/isNode.ts";
import type * as t from "../index.ts";

export default function assertNode(node?: any): asserts node is t.Node {
  if (!isNode(node)) {
    const type = node?.type ?? JSON.stringify(node);
    throw new TypeError(`Not a valid node of type "${type}"`);
  }
}
