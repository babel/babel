import _Object$create from "core-js-pure/features/object/create.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import setPrototypeOf from "./setPrototypeOf.js";
function _inherits(t, r) {
  if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function");
  t.prototype = _Object$create(r && r.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), _Object$defineProperty(t, "prototype", {
    writable: !1
  }), r && setPrototypeOf(t, r);
}
export { _inherits as default };