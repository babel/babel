import _Object$setPrototypeOf from "core-js-pure/features/object/set-prototype-of.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
export default function _setPrototypeOf(t, e) {
  var _context;
  var o = _Object$setPrototypeOf ? _bindInstanceProperty(_context = _Object$setPrototypeOf).call(_context) : function (t, e) {
    return t.__proto__ = e, t;
  };
  return o(t, e);
}