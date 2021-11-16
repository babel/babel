/* @minVersion 7.16.5 */

/**
 * Append at most @p num elements from @p src into @p dest.
 *
 * @param {Array}     dest
 * @param {ArrayLike} src
 * @param {number}    [num=src.length]
 * @return {Array}    @p dest
 */
export default function _appendArrayLike(dest, src, num) {
  var i = 0,
    l = dest.length,
    n = src.length;
  if (n > num) n = num > 0 ? num : 0;
  // inflating destination array length in advance gives the engine a hint
  // of how much space it will need, but more importantly ensures that the
  // final length will not overflow 2**32-1 (otherwise throws RangeError)
  dest.length += n;
  while (i < n) dest[l++] = src[i++];
  return dest;
}
