import get from "./get.js";
import getPrototypeOf from "./getPrototypeOf.js";
function _superPropertyGetCall(t, e, o, r, p) {
  var f = get(getPrototypeOf(r ? t.prototype : t), e, o);
  return p ? f.apply(o, p) : f;
}
export { _superPropertyGetCall as default };