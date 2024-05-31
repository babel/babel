/* @minVersion 7.20.7 */

export default function _defineAccessor(
  type: "get" | "set",
  obj: any,
  key: string | symbol,
  fn: (() => any) | ((v: any) => void),
) {
  var desc: PropertyDescriptor = { configurable: true, enumerable: true };
  // type should be "get" or "set"
  desc[type] = fn as any;
  return Object.defineProperty(obj, key, desc);
}
