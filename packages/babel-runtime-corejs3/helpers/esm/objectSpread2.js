import _Object$keys from "core-js-pure/features/object/keys.js";
import _Object$getOwnPropertySymbols from "core-js-pure/features/object/get-own-property-symbols.js";
import _filterInstanceProperty from "core-js-pure/features/instance/filter.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
import _Reflect$ownKeys from "core-js-pure/features/reflect/own-keys.js";
import _Object$getOwnPropertyNames from "core-js-pure/features/object/get-own-property-names.js";
import _forEachInstanceProperty from "core-js-pure/features/instance/for-each.js";
import _Object$getOwnPropertyDescriptors from "core-js-pure/features/object/get-own-property-descriptors.js";
import _Object$defineProperties from "core-js-pure/features/object/define-properties.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import defineProperty from "./defineProperty.js";
function ownKeys(e, t) {
  var r = _Object$keys(e);
  if (_Object$getOwnPropertySymbols) {
    var o = _Object$getOwnPropertySymbols(e);
    t && (o = _filterInstanceProperty(o).call(o, function (t) {
      return _Object$getOwnPropertyDescriptor(e, t).enumerable;
    })), _pushInstanceProperty(r).apply(r, o);
  }
  return r;
}
function _objectSpread2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var _context;
    var r,
      o = null != arguments[t] ? arguments[t] : {};
    t % 2 ? (o = Object(o), "undefined" != typeof Reflect && _Reflect$ownKeys ? r = _Reflect$ownKeys(o) : (r = _Object$getOwnPropertyNames(o), _Object$getOwnPropertySymbols && _pushInstanceProperty(r).apply(r, _Object$getOwnPropertySymbols(o))), _forEachInstanceProperty(r).call(r, function (t) {
      var r = _Object$getOwnPropertyDescriptor(o, t);
      r && r.enumerable && defineProperty(e, t, o[t]);
    })) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(o)) : _forEachInstanceProperty(_context = ownKeys(Object(o))).call(_context, function (t) {
      _Object$defineProperty(e, t, _Object$getOwnPropertyDescriptor(o, t));
    });
  }
  return e;
}
export { _objectSpread2 as default };