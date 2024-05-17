import _Reflect$get from "core-js-pure/features/reflect/get.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
import superPropBase from "./superPropBase.js";
function _get() {
  var _context;
  return _get = "undefined" != typeof Reflect && _Reflect$get ? _bindInstanceProperty(_context = _Reflect$get).call(_context) : function (e, t, r) {
    var p = superPropBase(e, t);
    if (p) {
      var n = _Object$getOwnPropertyDescriptor(p, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
    }
  }, _get.apply(null, arguments);
}
export { _get as default };