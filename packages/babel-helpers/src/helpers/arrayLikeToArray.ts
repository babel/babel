/* @minVersion 7.9.0 */

export default function _arrayLikeToArray<T>(
  arr: ArrayLike<T>,
  len?: number | null,
) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array<T>(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
