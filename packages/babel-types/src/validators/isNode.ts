import { VISITOR_KEYS } from "../definitions";

export default function isNode(node?: any): boolean {
  return !!(node && VISITOR_KEYS[node.type]);
}
