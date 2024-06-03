/* @minVersion 7.14.1 */

import checkPrivateRedeclaration from "./checkPrivateRedeclaration.ts";

export default function _classPrivateFieldInitSpec(
  obj: object,
  privateMap: WeakMap<object, unknown>,
  value: unknown,
) {
  checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
