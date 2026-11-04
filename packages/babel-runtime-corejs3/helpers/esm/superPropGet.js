import get from "./get.js";
import getPrototypeOf from "./getPrototypeOf.js";
function _superPropGet(r, e, p, f) {
  var n = get(getPrototypeOf(1 & f ? r.prototype : r), e, p);
  return 2 & f && "function" == typeof n ? function (t) {
    return n.apply(p, t);
  } : n;
}
export { _superPropGet as default };