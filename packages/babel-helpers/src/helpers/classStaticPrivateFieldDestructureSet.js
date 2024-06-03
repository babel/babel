/* @minVersion 7.13.10 */
/* @onlyBabel7 */

import classApplyDescriptorDestructureSet from "classApplyDescriptorDestructureSet";
import assertClassBrand from "assertClassBrand";
import classCheckPrivateStaticFieldDescriptor from "classCheckPrivateStaticFieldDescriptor";
export default function _classStaticPrivateFieldDestructureSet(
  receiver,
  classConstructor,
  descriptor,
) {
  assertClassBrand(classConstructor, receiver);
  classCheckPrivateStaticFieldDescriptor(descriptor, "set");
  return classApplyDescriptorDestructureSet(receiver, descriptor);
}
