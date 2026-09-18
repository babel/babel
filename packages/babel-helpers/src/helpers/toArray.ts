/* @minVersion 7.0.0-beta.0 */

import iterableToArray from "./iterableToArray.ts";
import unsupportedIterableToArray from "./unsupportedIterableToArray.ts";
// @ts-expect-error nonIterableRest is still being converted to TS.
import nonIterableRest from "./nonIterableRest.ts";

export default function _toArray<T>(arr: any): T[] {
  return (
    iterableToArray<T>(arr) ||
    unsupportedIterableToArray<T>(arr) ||
    nonIterableRest()
  );
}
