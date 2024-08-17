/* @minVersion 7.0.0-beta.0 */
/* @onlyBabel7 */

import classApplyDescriptorGet from "classApplyDescriptorGet";
import classPrivateFieldGet2 from "classPrivateFieldGet2";
export default function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = classPrivateFieldGet2(privateMap, receiver);
  return classApplyDescriptorGet(receiver, descriptor);
}
