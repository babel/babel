import get from "./get.js";
import getPrototypeOf from "./getPrototypeOf.js";
function _superPropertyGet(t, e, r, o) {
  var p = get(getPrototypeOf(1 & o ? t.prototype : t), e, r);
  return 2 & o ? function (t) {
    return p.apply(r, t);
  } : p;
}
export { _superPropertyGet as default };