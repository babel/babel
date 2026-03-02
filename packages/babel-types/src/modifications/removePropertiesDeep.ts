import traverseFast from "../traverse/traverseFast.ts";
import removeProperties from "./removeProperties.ts";
import type * as t from "../index.ts";

export default function removePropertiesDeep<T extends t.Node>(
  tree: T,
  opts?: { preserveComments: boolean } | null,
): T {
  traverseFast(tree, removeProperties, opts);

  return tree;
}
