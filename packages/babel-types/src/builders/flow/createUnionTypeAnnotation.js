// @flow
import { unionTypeAnnotation } from "../generated";
import removeTypeDuplicates from "../../modifications/flow/removeTypeDuplicates";

/**
 * Takes an array of `types` and flattens them, removing duplicates and
 * returns a `UnionTypeAnnotation` node containg them.
 */
export default function createUnionTypeAnnotation(
  types: Array<Object>,
): Object {
  const flattened = removeTypeDuplicates(types);

  if (flattened.length === 1) {
    return flattened[0];
  } else {
    return unionTypeAnnotation(flattened);
  }
}
