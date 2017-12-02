// @flow
import { isIdentifier, isStringLiteral } from "../validators/generated";
import cloneDeep from "../clone/cloneDeep";
import removePropertiesDeep from "../modifications/removePropertiesDeep";

export default function toKeyAlias(
  node: Object,
  key: Object = node.key,
): string {
  let alias;

  if (node.kind === "method") {
    return toKeyAlias.increment() + "";
  } else if (isIdentifier(key)) {
    alias = key.name;
  } else if (isStringLiteral(key)) {
    alias = JSON.stringify(key.value);
  } else {
    alias = JSON.stringify(removePropertiesDeep(cloneDeep(key)));
  }

  if (node.computed) {
    alias = `[${alias}]`;
  }

  if (node.static) {
    alias = `static:${alias}`;
  }

  return alias;
}

toKeyAlias.uid = 0;

toKeyAlias.increment = function() {
  if (toKeyAlias.uid >= Number.MAX_SAFE_INTEGER) {
    return (toKeyAlias.uid = 0);
  } else {
    return toKeyAlias.uid++;
  }
};
