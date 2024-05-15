import classApplyDescriptorGet from "./classApplyDescriptorGet.js";
import assertClassBrand from "./assertClassBrand.js";
import classCheckPrivateStaticFieldDescriptor from "./classCheckPrivateStaticFieldDescriptor.js";
export default function _classStaticPrivateFieldSpecGet(t, s, r) {
  return assertClassBrand(s, t), classCheckPrivateStaticFieldDescriptor(r, "get"), classApplyDescriptorGet(t, r);
}