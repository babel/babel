import traverseFast from "../traverse/traverseFast";
import removeProperties from "./removeProperties";
import type * as types from "../types";

export default function removePropertiesDeep<T extends types.Node>(
  tree: T,
  opts?: { preserveComments: boolean } | null,
): T {
  traverseFast(tree, removeProperties, opts);

  return tree;
}
