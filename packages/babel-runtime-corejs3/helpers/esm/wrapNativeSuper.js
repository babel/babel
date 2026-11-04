import _Map from "core-js-pure/features/map/index.js";
import _Object$create from "core-js-pure/features/object/create.js";
import getPrototypeOf from "./getPrototypeOf.js";
import setPrototypeOf from "./setPrototypeOf.js";
import isNativeFunction from "./isNativeFunction.js";
import construct from "./construct.js";
function _wrapNativeSuper(p) {
  var n = "function" == typeof _Map ? new _Map() : void 0;
  return _wrapNativeSuper = function _wrapNativeSuper(p) {
    if (null === p || !isNativeFunction(p)) return p;
    if ("function" != typeof p) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== n) {
      if (n.has(p)) return n.get(p);
      n.set(p, Wrapper);
    }
    function Wrapper() {
      return construct(p, arguments, getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = _Object$create(p.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), setPrototypeOf(Wrapper, p);
  }, _wrapNativeSuper(p);
}
export { _wrapNativeSuper as default };