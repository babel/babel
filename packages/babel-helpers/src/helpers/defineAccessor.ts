/* @minVersion 7.20.7 */

export default function _defineAccessor<Type extends "get" | "set">(
  type: Type,
  obj: any,
  key: string | symbol,
  fn: PropertyDescriptor[Type],
) {
  var desc: PropertyDescriptor = { configurable: true, enumerable: true };
  desc[type] = fn;
  return Object.defineProperty(obj, key, desc);
}
