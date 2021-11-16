/* @minVersion 7.16.5 */

import iterableToArray from "iterableToArray";
import unsupportedIterableToArray from "unsupportedIterableToArray";
import nonIterableSpread from "nonIterableSpread";

export default function _spreadCoerceToArray(src) {
  return Array.isArray(src)
    ? src
    : iterableToArray(src) ||
        unsupportedIterableToArray(src) ||
        nonIterableSpread();
}
