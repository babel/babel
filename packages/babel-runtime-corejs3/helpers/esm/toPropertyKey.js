import _typeof from "./typeof.js";
import toPrimitive from "./toPrimitive.js";
function toPropertyKey(r) {
  var o = toPrimitive(r, "string");
  return "symbol" == _typeof(o) ? o : o + "";
}
export { toPropertyKey as default };