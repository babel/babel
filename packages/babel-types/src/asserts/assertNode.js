// @flow
import isNode from "../validators/isNode";

export default function assertNode(node?: Object): void {
  if (!isNode(node)) {
    const type = (node && node.type) || JSON.stringify(node);
    throw new TypeError(`Not a valid node of type "${type}"`);
  }
}
