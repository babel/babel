import _Symbol from "core-js-pure/features/symbol/index.js";
import _getIteratorMethod from "core-js-pure/features/get-iterator-method.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import _Array$isArray from "core-js-pure/features/array/is-array.js";
import unsupportedIterableToArray from "./unsupportedIterableToArray.js";
function _createForOfIteratorHelperLoose(r, t) {
  var _context;
  var o = "undefined" != typeof _Symbol && _getIteratorMethod(r) || r["@@iterator"];
  if (o) return _bindInstanceProperty(_context = (o = o.call(r)).next).call(_context, o);
  if (_Array$isArray(r) || (o = unsupportedIterableToArray(r)) || t && r && "number" == typeof r.length) {
    o && (r = o);
    var n = 0;
    return function () {
      return n >= r.length ? {
        done: !0
      } : {
        done: !1,
        value: r[n++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
export { _createForOfIteratorHelperLoose as default };