/* @minVersion 7.14.1 */

import checkPrivateRedeclaration from "./checkPrivateRedeclaration.ts";

export default function _classPrivateMethodInitSpec(
  obj: object,
  privateSet: WeakSet<object>,
) {
  checkPrivateRedeclaration(obj, privateSet);
  privateSet.add(obj);
}
