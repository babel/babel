import { VISITOR_KEYS } from "../definitions";
import type * as types from "../types";

export default function isNode(node: any): node is types.Node {
  return !!(node && VISITOR_KEYS[node.type]);
}
