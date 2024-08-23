import get from "./get.js";
import getPrototypeOf from "./getPrototypeOf.js";
function _superPropertyGet(t, e, o, r) {
  var p = get(getPrototypeOf(1 & r ? t.prototype : t), e, o);
  return 2 & r && "function" == typeof p ? function (t) {
    return p.apply(o, t);
  } : p;
}
export { _superPropertyGet as default };