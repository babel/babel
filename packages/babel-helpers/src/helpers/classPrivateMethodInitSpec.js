/* @minVersion 7.14.1 */

import checkPrivateRedeclaration from "checkPrivateRedeclaration";

export default function _classPrivateMethodInitSpec(obj, privateSet) {
  checkPrivateRedeclaration(obj, privateSet);
  privateSet.add(obj);
}
