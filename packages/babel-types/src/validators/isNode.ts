import { VISITOR_KEYS } from "../definitions";
import type * as types from "../types";

export default function isNode(
  node: object | null | undefined,
): node is types.Node {
  // @ts-ignore
  return !!(node && VISITOR_KEYS[node.type]);
}
