import { validateInternal } from "../validators/validate";
import type * as t from "..";
import { BUILDER_KEYS, NODE_FIELDS } from "..";
import type { FieldDefinitions } from "../definitions/utils";

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

export function validateNodeInternal<N extends t.Node>(
  node: N,
  info: [FieldDefinitions, string[]],
) {
  if (node == null || typeof node !== "object") return;

  const fields = info[0],
    builderKeys = info[1] as (keyof N & string)[];

  for (const key of builderKeys) {
    const field = fields[key];
    if (field != null) validateInternal(field, node, key, node[key]);
  }
  return node;
}
