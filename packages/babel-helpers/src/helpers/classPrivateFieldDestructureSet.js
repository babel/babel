/* @minVersion 7.4.4 */
/* @onlyBabel7 */

import classApplyDescriptorDestructureSet from "classApplyDescriptorDestructureSet";
import classPrivateFieldGet2 from "classPrivateFieldGet2";
export default function _classPrivateFieldDestructureSet(receiver, privateMap) {
  var descriptor = classPrivateFieldGet2(privateMap, receiver);
  return classApplyDescriptorDestructureSet(receiver, descriptor);
}
