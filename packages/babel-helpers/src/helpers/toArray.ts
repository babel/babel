/* @minVersion 7.0.0-beta.0 */

import arrayWithHoles from "./arrayWithHoles.ts";
import iterableToArray from "./iterableToArray.ts";
import unsupportedIterableToArray from "./unsupportedIterableToArray.ts";
// @ts-expect-error nonIterableRest is still being converted to TS.
import nonIterableRest from "./nonIterableRest.ts";

export default function _toArray<T>(arr: any): T[] {
  return (
    arrayWithHoles<T>(arr) ||
    iterableToArray<T>(arr) ||
    unsupportedIterableToArray<T>(arr) ||
    nonIterableRest()
  );
}
