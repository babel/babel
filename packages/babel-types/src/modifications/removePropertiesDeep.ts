import traverseFast from "../traverse/traverseFast";
import removeProperties from "./removeProperties";

export default function removePropertiesDeep<T extends any>(
  tree: T,
  opts?: any,
): T {
  traverseFast(tree, removeProperties, opts);

  return tree;
}
