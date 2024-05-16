/* @minVersion 7.0.0-beta.0 */

export default function _arrayWithHoles<T>(arr: any) {
  if (Array.isArray(arr)) return arr as Array<T>;
}
