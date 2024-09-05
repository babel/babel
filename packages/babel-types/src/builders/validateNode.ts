import { validateInternal } from "../validators/validate.ts";
import type * as t from "../index.ts";
import { BUILDER_KEYS, NODE_FIELDS } from "../index.ts";

export default function validateNode<N extends t.Node>(node: N) {
  if (node == null || typeof node !== "object") return;
  const fields = NODE_FIELDS[node.type];
  if (!fields) return;

  // todo: because keys not in BUILDER_KEYS are not validated - this actually allows invalid nodes in some cases
  const keys = BUILDER_KEYS[node.type] as (keyof N & string)[];
  for (const key of keys) {
    const field = fields[key];
    if (field != null) validateInternal(field, node, key, node[key]);
  }
  return node;
}
