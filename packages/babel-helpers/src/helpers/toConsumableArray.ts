/* @minVersion 7.0.0-beta.0 */

import arrayLikeToArray from "./arrayLikeToArray.ts";
import iterableToArray from "./iterableToArray.ts";
import unsupportedIterableToArray from "./unsupportedIterableToArray.ts";
// @ts-expect-error nonIterableSpread is still being converted to TS.
import nonIterableSpread from "./nonIterableSpread.ts";

export default function _toConsumableArray<T>(arr: any): T[] {
  var result = iterableToArray<T>(arr);
  // iterableToArray returns the array itself when it has the default
  // iterator, but spread must copy it
  if (result === arr) return arrayLikeToArray<T>(arr);
  return result || unsupportedIterableToArray<T>(arr) || nonIterableSpread();
}
