import loClone from "lodash/clone";
import { NODE_FIELDS, BUILDER_KEYS } from "../definitions";
import validate from "../validators/validate";
import type * as types from "../types";

export default function builder(
  type: types.Node["type"],
  ...args: Array<any>
): any {
  const keys = BUILDER_KEYS[type];
  const countArgs = args.length;
  if (countArgs > keys.length) {
    throw new Error(
      `${type}: Too many arguments passed. Received ${countArgs} but can receive no more than ${keys.length}`,
    );
  }

  const node = { type };

  let i = 0;
  keys.forEach(key => {
    const field = NODE_FIELDS[type][key];

    let arg;
    if (i < countArgs) arg = args[i];
    if (arg === undefined) arg = loClone(field.default);

    node[key] = arg;
    i++;
  });

  for (const key of Object.keys(node)) {
    validate(node, key, node[key]);
  }

  return node;
}
