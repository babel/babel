import _Reflect$ownKeys from "core-js-pure/features/reflect/own-keys.js";
import _Object$getOwnPropertyNames from "core-js-pure/features/object/get-own-property-names.js";
import _Object$getOwnPropertySymbols from "core-js-pure/features/object/get-own-property-symbols.js";
import _concatInstanceProperty from "core-js-pure/features/instance/concat.js";
import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  e = Object(e);
  var r,
    n,
    o,
    c = {};
  for ("undefined" != typeof Reflect && _Reflect$ownKeys ? r = _Reflect$ownKeys(e) : (r = _Object$getOwnPropertyNames(e), _Object$getOwnPropertySymbols && (r = _concatInstanceProperty(r).call(r, _Object$getOwnPropertySymbols(e)))), o = 0; o < r.length; o++) if (n = r[o], -1 === _indexOfInstanceProperty(t).call(t, n)) {
    var f = _Object$getOwnPropertyDescriptor(e, n);
    f && f.enumerable && (c[n] = e[n]);
  }
  return c;
}
export { _objectWithoutProperties as default };