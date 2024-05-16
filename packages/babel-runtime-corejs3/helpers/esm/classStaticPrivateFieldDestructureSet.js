import classApplyDescriptorDestructureSet from "./classApplyDescriptorDestructureSet.js";
import assertClassBrand from "./assertClassBrand.js";
import classCheckPrivateStaticFieldDescriptor from "./classCheckPrivateStaticFieldDescriptor.js";
export default function _classStaticPrivateFieldDestructureSet(t, r, s) {
  return assertClassBrand(r, t), classCheckPrivateStaticFieldDescriptor(s, "set"), classApplyDescriptorDestructureSet(t, s);
}