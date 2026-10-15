import _Symbol from "core-js-pure/features/symbol/index.js";
import _Symbol$for from "core-js-pure/features/symbol/for.js";
var REACT_ELEMENT_TYPE;
function _createRawReactElement(e, r, o, l) {
  var E = REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof _Symbol && _Symbol$for && _Symbol$for("react.element") || 60103),
    n = e && e.defaultProps,
    t = arguments.length - 3;
  if (r || 0 === t || (r = {
    children: void 0
  }), t > 0) {
    var f = l;
    if (t > 1) {
      f = Array(t);
      for (var a = 0; a < t; a++) f[a] = arguments[a + 3];
    }
    r.children = f;
  }
  if (r && n) for (var i in n) void 0 === r[i] && (r[i] = n[i]);else r || (r = n || {});
  return {
    $$typeof: E,
    type: e,
    key: void 0 === o ? null : "" + o,
    ref: null,
    props: r,
    _owner: null
  };
}
export { _createRawReactElement as default };