import { VISITOR_KEYS } from "../definitions";
import type * as t from "..";

export default function isNode(node: any): node is t.Node {
  return !!(node && VISITOR_KEYS[node.type]);
}
