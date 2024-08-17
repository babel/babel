import _Object$create from "core-js-pure/features/object/create.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import setPrototypeOf from "./setPrototypeOf.js";
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = _Object$create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), _Object$defineProperty(t, "prototype", {
    writable: !1
  }), e && setPrototypeOf(t, e);
}
export { _inherits as default };