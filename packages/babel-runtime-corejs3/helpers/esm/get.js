import _Reflect$get from "core-js-pure/features/reflect/get.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
import _superPropBase from "./superPropBase.js";
export default function _get() {
  var _context;
  for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
    e[_key] = arguments[_key];
  }
  return _get = "undefined" != typeof Reflect && _Reflect$get ? _bindInstanceProperty(_context = _Reflect$get).call(_context, null) : function (e, t, r) {
    var p = _superPropBase(e, t);
    if (p) {
      var n = _Object$getOwnPropertyDescriptor(p, t);
      return n && n.get ? n.get.call(arguments.length < 3 ? e : r) : n ? n.value : void 0;
    }
  }, _get.apply(this, e);
}