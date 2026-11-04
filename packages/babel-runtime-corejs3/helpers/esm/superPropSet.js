import set from "./set.js";
import getPrototypeOf from "./getPrototypeOf.js";
function _superPropSet(r, e, p, f, m, u) {
  return set(getPrototypeOf(u ? r.prototype : r), e, p, f, m);
}
export { _superPropSet as default };