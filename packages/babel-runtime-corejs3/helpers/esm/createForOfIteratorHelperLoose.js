import _Symbol from "core-js-pure/features/symbol/index.js";
import _getIteratorMethod from "core-js-pure/features/get-iterator-method.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import _Array$isArray from "core-js-pure/features/array/is-array.js";
import unsupportedIterableToArray from "./unsupportedIterableToArray.js";
function _createForOfIteratorHelperLoose(r, e) {
  var _context;
  var t = "undefined" != typeof _Symbol && _getIteratorMethod(r) || r["@@iterator"];
  if (t) return _bindInstanceProperty(_context = (t = t.call(r)).next).call(_context, t);
  if (_Array$isArray(r) || (t = unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function () {
      return o >= r.length ? {
        done: !0
      } : {
        done: !1,
        value: r[o++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
export { _createForOfIteratorHelperLoose as default };