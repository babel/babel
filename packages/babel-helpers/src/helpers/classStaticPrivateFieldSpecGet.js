/* @minVersion 7.0.2 */
/* @onlyBabel7 */

import classApplyDescriptorGet from "classApplyDescriptorGet";
import assertClassBrand from "assertClassBrand";
import classCheckPrivateStaticFieldDescriptor from "classCheckPrivateStaticFieldDescriptor";
export default function _classStaticPrivateFieldSpecGet(
  receiver,
  classConstructor,
  descriptor,
) {
  assertClassBrand(classConstructor, receiver);
  classCheckPrivateStaticFieldDescriptor(descriptor, "get");
  return classApplyDescriptorGet(receiver, descriptor);
}
