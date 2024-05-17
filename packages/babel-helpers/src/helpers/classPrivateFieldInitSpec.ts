/* @minVersion 7.14.1 */

import checkPrivateRedeclaration from "checkPrivateRedeclaration";

export default function _classPrivateFieldInitSpec(obj, privateMap, value) {
  checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
