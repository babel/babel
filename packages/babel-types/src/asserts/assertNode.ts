import isNode from "../validators/isNode";
import type * as t from "..";

export default function assertNode(node?: any): asserts node is t.Node {
  if (!isNode(node)) {
    const type = node?.type ?? JSON.stringify(node);
    throw new TypeError(`Not a valid node of type "${type}"`);
  }
}
