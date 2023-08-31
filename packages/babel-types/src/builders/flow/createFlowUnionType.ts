import { unionTypeAnnotation } from "../generated/index.ts";
import removeTypeDuplicates from "../../modifications/flow/removeTypeDuplicates.ts";
import type * as t from "../../index.ts";

/**
 * Takes an array of `types` and flattens them, removing duplicates and
 * returns a `UnionTypeAnnotation` node containing them.
 */
export default function createFlowUnionType<T extends t.FlowType>(
  types: [T] | Array<T>,
): T | t.UnionTypeAnnotation {
  const flattened = removeTypeDuplicates(types);

  if (flattened.length === 1) {
    return flattened[0] as T;
  } else {
    return unionTypeAnnotation(flattened);
  }
}
