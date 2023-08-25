import { tsUnionType } from "../generated/index.ts";
import removeTypeDuplicates from "../../modifications/typescript/removeTypeDuplicates.ts";
import { isTSTypeAnnotation } from "../../validators/generated/index.ts";
import type * as t from "../../index.ts";

/**
 * Takes an array of `types` and flattens them, removing duplicates and
 * returns a `UnionTypeAnnotation` node containing them.
 */
export default function createTSUnionType(
  typeAnnotations: Array<t.TSTypeAnnotation | t.TSType>,
): t.TSType {
  const types = typeAnnotations.map(type => {
    return isTSTypeAnnotation(type) ? type.typeAnnotation : type;
  });
  const flattened = removeTypeDuplicates(types);

  if (flattened.length === 1) {
    return flattened[0];
  } else {
    return tsUnionType(flattened);
  }
}
