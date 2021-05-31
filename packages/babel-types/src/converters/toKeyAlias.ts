import { isIdentifier, isStringLiteral } from "../validators/generated";
import cloneNode from "../clone/cloneNode";
import removePropertiesDeep from "../modifications/removePropertiesDeep";
import type * as t from "..";

export default function toKeyAlias(
  node: t.Method | t.Property,
  key: t.Node = node.key,
): string {
  let alias;

  // @ts-expect-error todo(flow->ts): maybe add node type check before checking `.kind`
  if (node.kind === "method") {
    return toKeyAlias.increment() + "";
  } else if (isIdentifier(key)) {
    alias = key.name;
  } else if (isStringLiteral(key)) {
    alias = JSON.stringify(key.value);
  } else {
    alias = JSON.stringify(removePropertiesDeep(cloneNode(key)));
  }

  // @ts-expect-error todo(flow->ts): maybe add node type check before checking `.computed`
  if (node.computed) {
    alias = `[${alias}]`;
  }

  // @ts-expect-error todo(flow->ts): maybe add node type check before checking `.static`
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
