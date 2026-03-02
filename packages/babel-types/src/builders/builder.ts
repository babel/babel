import { NODE_FIELDS, BUILDER_KEYS } from "../definitions";
import validate from "../validators/validate";
import type * as t from "..";

export default function builder<T extends t.Node>(this: T["type"]): T {
  const type = this;
  const keys = BUILDER_KEYS[type];
  const countArgs = arguments.length;
  if (countArgs > keys.length) {
    throw new Error(
      `${type}: Too many arguments passed. Received ${countArgs} but can receive no more than ${keys.length}`,
    );
  }

  const node = { type };

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    const field = NODE_FIELDS[type][key];

    let arg;
    if (i < countArgs) arg = arguments[i];
    if (arg === undefined) {
      arg = Array.isArray(field.default) ? [] : field.default;
    }

    node[key] = arg;
  }

  // (assume all enumerable properties are own)
  // eslint-disable-next-line guard-for-in
  for (const key in node) {
    validate(node as t.Node, key, node[key]);
  }

  return node as T;
}
