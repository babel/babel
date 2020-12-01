import getBindingIdentifiers from "./getBindingIdentifiers";

export default function getOuterBindingIdentifiers(
  node: any,
  duplicates?: boolean,
): {
  [x: string]: any | Array<any>;
} {
  return getBindingIdentifiers(node, duplicates, true);
}
