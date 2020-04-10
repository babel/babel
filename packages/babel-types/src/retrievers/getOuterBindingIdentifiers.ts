import getBindingIdentifiers from "./getBindingIdentifiers";
import type * as types from "../types";

export default function getOuterBindingIdentifiers(
  node: types.Node,
  duplicates: true,
): Record<string, Array<types.Identifier>>;

export default function getOuterBindingIdentifiers(
  node: types.Node,
  duplicates?: false,
): Record<string, types.Identifier>;

export default function getOuterBindingIdentifiers(
  node: types.Node,
  duplicates: boolean,
): Record<string, types.Identifier | Array<types.Identifier>>;

export default function getOuterBindingIdentifiers(
  node: types.Node,
  duplicates: boolean,
): Record<string, types.Identifier | Array<types.Identifier>> {
  return getBindingIdentifiers(node, duplicates, true);
}
