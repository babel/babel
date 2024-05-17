import _Reflect$get from "core-js-pure/features/reflect/get.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
import _superPropBase from "./superPropBase.js";
export default function _get() {
  var _context;
  var t = _get;
  for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
    e[_key] = arguments[_key];
  }
  return t = "undefined" != typeof Reflect && _Reflect$get ? _bindInstanceProperty(_context = _Reflect$get).call(_context, null) : function (e, t, r) {
    var p = _superPropBase(e, t);
    if (p) {
      var l = _Object$getOwnPropertyDescriptor(p, t);
      return l && l.get ? l.get.call(arguments.length < 3 ? e : r) : l ? l.value : void 0;
    }
  }, t.apply(this, e);
}