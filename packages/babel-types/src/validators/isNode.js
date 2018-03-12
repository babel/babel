// @flow
import { VISITOR_KEYS } from "../definitions";

export default function isNode(node?: Object): boolean {
  return !!(node && VISITOR_KEYS[node.type]);
}
