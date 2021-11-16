/* @minVersion 7.16.5 */

import getIterator from "getIterator";
import iteratorClose from "iteratorClose";
import iteratorCloseQuiet from "iteratorCloseQuiet";

/**
 * Append elements from iterable @p src into @p dest.
 *
 * @param {Array}       dest
 * @param {any}         src
 * @param {number}      [limit]
 * @return {Array}      @p dest if @p src is Iterable
 * @return {undefined}  otherwise
 */

export default function _maybeAppendIterable(dest, src, limit) {
  var it = src != null && getIterator(src);
  if (it) {
    var s,
      v,
      n = 0;
    // Argument `limit` is optional, which means it is important to loop
    // "while not above limit" rather than "while below limit".
    while (!(++n > limit || (s = it.next()).done)) {
      v = s.value;
      // Exceptions from calling `it.next()` or accessing `s.done` or `s.value`
      // simply propagate without closing the iterator. `it.return()` needs to be
      // invoked only when appending to `dest` fails, or we stop before `s.done`.
      try {
        dest.push(v);
      } catch (e) {
        iteratorCloseQuiet(it);
        throw e;
      }
    }
    if (n > limit) iteratorClose(it);
    return dest;
  }
}
