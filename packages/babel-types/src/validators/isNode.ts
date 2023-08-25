import { VISITOR_KEYS } from "../definitions/index.ts";
import type * as t from "../index.ts";

export default function isNode(node: any): node is t.Node {
  return !!(node && VISITOR_KEYS[node.type]);
}
