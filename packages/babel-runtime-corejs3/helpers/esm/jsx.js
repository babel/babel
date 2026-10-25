import _Symbol from "core-js-pure/features/symbol/index.js";
import _Symbol$for from "core-js-pure/features/symbol/for.js";
var e;
function _createRawReactElement(r, l, o, n) {
  e || (e = "function" == typeof _Symbol && _Symbol$for && _Symbol$for("react.element") || 60103);
  var t = r && r.defaultProps,
    f = arguments.length - 3;
  if (l || 0 === f || (l = {
    children: void 0
  }), 1 === f) l.children = n;else if (f > 1) {
    for (var i = Array(f), a = 0; a < f; a++) i[a] = arguments[a + 3];
    l.children = i;
  }
  if (l && t) for (var c in t) void 0 === l[c] && (l[c] = t[c]);else l || (l = t || {});
  return {
    $$typeof: e,
    type: r,
    key: void 0 === o ? null : "" + o,
    ref: null,
    props: l,
    _owner: null
  };
}
export { _createRawReactElement as default };