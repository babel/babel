// @flow
import createFlowUnionType from "./createFlowUnionType";

/**
 * Takes an array of `types` and flattens them, removing duplicates and
 * returns a `UnionTypeAnnotation` node containg them.
 *
 * @deprecated use `createFlowUnionType`
 * @see {createFlowUnionType}
 */
export default function createUnionTypeAnnotation(
  types: Array<Object>,
): Object {
  return createFlowUnionType(types);
}
