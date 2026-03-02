import _Object$getOwnPropertyNames from "core-js-pure/features/object/get-own-property-names.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
function _defaults(e, r) {
  for (var t = _Object$getOwnPropertyNames(r), o = 0; o < t.length; o++) {
    var n = t[o],
      a = _Object$getOwnPropertyDescriptor(r, n);
    a && a.configurable && void 0 === e[n] && _Object$defineProperty(e, n, a);
  }
  return e;
}
export { _defaults as default };