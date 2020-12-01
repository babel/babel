import isNode from "../validators/isNode";

export default function assertNode(node?: any): void {
  if (!isNode(node)) {
    const type = node?.type ?? JSON.stringify(node);
    throw new TypeError(`Not a valid node of type "${type as any}"`);
  }
}
