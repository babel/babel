import traverseFast from "../traverse/traverseFast";
import removeProperties from "./removeProperties";
import type * as t from "..";

export default function removePropertiesDeep<T extends t.Node>(
  tree: T,
  opts?: { preserveComments: boolean } | null,
): T {
  traverseFast(tree, removeProperties, opts);

  return tree;
}
