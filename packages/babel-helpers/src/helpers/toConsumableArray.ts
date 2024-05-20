/* @minVersion 7.0.0-beta.0 */

import arrayWithoutHoles from "./arrayWithoutHoles.ts";
import iterableToArray from "./iterableToArray.ts";
import unsupportedIterableToArray from "./unsupportedIterableToArray.ts";
// @ts-expect-error nonIterableSpread is still being converted to TS.
import nonIterableSpread from "./nonIterableSpread.ts";

export default function _toConsumableArray<T>(arr: any): T[] {
  return (
    arrayWithoutHoles<T>(arr) ||
    iterableToArray<T>(arr) ||
    unsupportedIterableToArray<T>(arr) ||
    nonIterableSpread()
  );
}
