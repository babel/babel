import { unionTypeAnnotation } from "../generated";
import removeTypeDuplicates from "../../modifications/flow/removeTypeDuplicates";
import type * as types from "../../types";

/**
 * Takes an array of `types` and flattens them, removing duplicates and
 * returns a `UnionTypeAnnotation` node containing them.
 */
export default function createFlowUnionType<T extends types.FlowType>(
  types: [T] | Array<T>,
): T | types.UnionTypeAnnotation {
  const flattened = removeTypeDuplicates(types);

  if (flattened.length === 1) {
    return flattened[0] as T;
  } else {
    return unionTypeAnnotation(flattened);
  }
}
