/* @minVersion 7.16.5 */

/**
 * Concatenate all arguments, which must be array-like objects.
 *
 * This helper always returns an array without holes, even if given sparse
 * array arguments.
 * It does not use `[Symbol.isConcatSpreadable]` or `[Symbol.iterator]`
 * properties, only `length` and indices from `0` to `length-1`.
 */
export default function _concatArrayLike() {
  var ai = 0,
    an = arguments.length,
    dn = 0;
  while (ai < an) {
    dn += arguments[ai++].length;
  }
  var dest = new Array(dn),
    di = 0;
  for (ai = 0; ai < an; ) {
    var src = arguments[ai++],
      si = 0,
      sn = src.length;
    while (si < sn) {
      dest[di++] = src[si++];
    }
  }
  return dest;
}
