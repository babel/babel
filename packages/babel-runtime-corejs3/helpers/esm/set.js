import _Reflect$set from "core-js-pure/features/reflect/set.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import superPropBase from "./superPropBase.js";
import defineProperty from "./defineProperty.js";
function set(e, r, t, o) {
  return set = "undefined" != typeof Reflect && _Reflect$set ? _Reflect$set : function (e, r, t, o) {
    var f,
      i = superPropBase(e, r);
    if (i) {
      if ((f = _Object$getOwnPropertyDescriptor(i, r)).set) return f.set.call(o, t), !0;
      if (!f.writable) return !1;
    }
    if (f = _Object$getOwnPropertyDescriptor(o, r)) {
      if (!f.writable) return !1;
      f.value = t, _Object$defineProperty(o, r, f);
    } else defineProperty(o, r, t);
    return !0;
  }, set(e, r, t, o);
}
function _set(e, r, t, o, f) {
  if (!set(e, r, t, o || e) && f) throw new TypeError("failed to set property");
  return t;
}
export { _set as default };