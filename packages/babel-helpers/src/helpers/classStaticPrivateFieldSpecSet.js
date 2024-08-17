/* @minVersion 7.0.2 */
/* @onlyBabel7 */

import classApplyDescriptorSet from "classApplyDescriptorSet";
import assertClassBrand from "assertClassBrand";
import classCheckPrivateStaticFieldDescriptor from "classCheckPrivateStaticFieldDescriptor";
export default function _classStaticPrivateFieldSpecSet(
  receiver,
  classConstructor,
  descriptor,
  value,
) {
  assertClassBrand(classConstructor, receiver);
  classCheckPrivateStaticFieldDescriptor(descriptor, "set");
  classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}
