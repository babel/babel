/* @minVersion 7.16.5 */

import isArrayLike from "isArrayLike";
import iterableToArray from "iterableToArray";
import unsupportedIterableToArray from "unsupportedIterableToArray";
import nonIterableSpread from "nonIterableSpread";

export default function _spreadCoerceToArrayLike(src) {
  return isArrayLike(src)
    ? src
    : iterableToArray(src) ||
        unsupportedIterableToArray(src) ||
        nonIterableSpread();
}
