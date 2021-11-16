/* @minVersion 7.16.5 */

import isArrayLike from "isArrayLike";
import appendArrayLike from "appendArrayLike";
import maybeAppendIterable from "maybeAppendIterable";
import maybeAppendUnsupportedIterable from "maybeAppendUnsupportedIterable";
import nonIterableSpread from "nonIterableSpread";

/**
 * Append all elements from @p src into @p dest.
 *
 * @param {Array}               dest
 * @param {ArrayLike|Iterable}  src
 * @return {Array}              @p dest
 */
export default function _spreadIterableOrArrayLike(dest, src) {
  return isArrayLike(src)
    ? appendArrayLike(dest, src)
    : maybeAppendIterable(dest, src) ||
        maybeAppendUnsupportedIterable(dest, src) ||
        nonIterableSpread();
}
