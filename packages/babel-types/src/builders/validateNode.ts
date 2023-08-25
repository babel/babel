import validate from "../validators/validate.ts";
import type * as t from "../index.ts";
import { BUILDER_KEYS } from "../index.ts";

export default function validateNode<N extends t.Node>(node: N) {
  // todo: because keys not in BUILDER_KEYS are not validated - this actually allows invalid nodes in some cases
  const keys = BUILDER_KEYS[node.type] as (keyof N & string)[];
  for (const key of keys) {
    validate(node, key, node[key]);
  }
  return node;
}
