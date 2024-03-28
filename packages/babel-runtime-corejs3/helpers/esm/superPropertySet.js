import set from "./set.js";
import getPrototypeOf from "./getPrototypeOf.js";
export default function _superPropertySet(t, e, o, r, p, f) {
  return set(getPrototypeOf(f ? t.prototype : t), e, o, r, p);
}