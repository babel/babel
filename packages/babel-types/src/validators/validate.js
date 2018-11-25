// @flow
import { NODE_FIELDS } from "../definitions";

export default function validate(node?: Object, key: string, val: any): void {
  if (!node) return;

  const fields = NODE_FIELDS[node.type];
  if (!fields) return;

  const field = fields[key];
  if (!field || !field.validate) return;
  if (field.optional && val == null) return;

  field.validate(node, key, val);
}
