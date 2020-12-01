// @flow
import traverseFast from "../traverse/traverseFast";
import removeProperties from "./removeProperties";

export default function removePropertiesDeep<T: Object>(
  tree: T,
  opts?: Object,
): T {
  traverseFast(tree, removeProperties, opts);

  return tree;
}
