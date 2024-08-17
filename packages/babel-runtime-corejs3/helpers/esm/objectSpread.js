import _Object$keys from "core-js-pure/features/object/keys.js";
import _Object$getOwnPropertySymbols from "core-js-pure/features/object/get-own-property-symbols.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
import _filterInstanceProperty from "core-js-pure/features/instance/filter.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
import _forEachInstanceProperty from "core-js-pure/features/instance/for-each.js";
import defineProperty from "./defineProperty.js";
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var _context;
    var t = null != arguments[r] ? Object(arguments[r]) : {},
      o = _Object$keys(t);
    "function" == typeof _Object$getOwnPropertySymbols && _pushInstanceProperty(o).apply(o, _filterInstanceProperty(_context = _Object$getOwnPropertySymbols(t)).call(_context, function (e) {
      return _Object$getOwnPropertyDescriptor(t, e).enumerable;
    })), _forEachInstanceProperty(o).call(o, function (r) {
      defineProperty(e, r, t[r]);
    });
  }
  return e;
}
export { _objectSpread as default };