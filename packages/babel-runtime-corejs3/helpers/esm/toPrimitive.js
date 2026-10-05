import _typeof from "./typeof.js";
import _Symbol from "core-js-pure/features/symbol/index.js";
import _Symbol$toPrimitive from "core-js-pure/features/symbol/to-primitive.js";
function toPrimitive(t, e) {
  if ("object" != _typeof(t) || !t) return t;
  var r;
  if ("undefined" != typeof _Symbol && void 0 !== (r = t[_Symbol$toPrimitive])) {
    var i = r.call(t, e || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === e ? String : Number)(t);
}
export { toPrimitive as default };