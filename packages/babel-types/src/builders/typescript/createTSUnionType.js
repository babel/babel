import { TSUnionType } from "../generated";
import removeTypeDuplicates from "../../modifications/typescript/removeTypeDuplicates";

/**
 * Takes an array of `types` and flattens them, removing duplicates and
 * returns a `UnionTypeAnnotation` node containg them.
 */
export default function createTSUnionType(types: Array<Object>): Object {
  const flattened = removeTypeDuplicates(types);

  if (flattened.length === 1) {
    return flattened[0];
  } else {
    return TSUnionType(flattened);
  }
}
