import { isIdentifier, isStringLiteral } from "../validators/generated";
import cloneNode from "../clone/cloneNode";
import removePropertiesDeep from "../modifications/removePropertiesDeep";
import type * as types from "../types";

export default function toKeyAlias(
  node: types.Method | types.Property,
  key: types.Node = node.key,
): string {
  let alias;

  // @ts-ignore
  if (node.kind === "method") {
    return toKeyAlias.increment() + "";
  } else if (isIdentifier(key)) {
    alias = key.name;
  } else if (isStringLiteral(key)) {
    alias = JSON.stringify(key.value);
  } else {
    alias = JSON.stringify(removePropertiesDeep(cloneNode(key)));
  }

  // @ts-ignore
  if (node.computed) {
    alias = `[${alias}]`;
  }

  // @ts-ignore
  if (node.static) {
    alias = `static:${alias}`;
  }

  return alias;
}

toKeyAlias.uid = 0;

toKeyAlias.increment = function () {
  if (toKeyAlias.uid >= Number.MAX_SAFE_INTEGER) {
    return (toKeyAlias.uid = 0);
  } else {
    return toKeyAlias.uid++;
  }
};
