// @flow
import getBindingIdentifiers from "./getBindingIdentifiers";

export default function getOuterBindingIdentifiers(
  node: Object,
  duplicates?: boolean,
): { [string]: Object | Array<Object> } {
  return getBindingIdentifiers(node, duplicates, true);
}
