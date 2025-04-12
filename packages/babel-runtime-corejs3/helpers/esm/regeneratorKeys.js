import _unshiftInstanceProperty from "core-js-pure/features/instance/unshift.js";
function _regeneratorKeys(e) {
  var n = Object(e),
    r = [];
  for (var t in n) _unshiftInstanceProperty(r).call(r, t);
  return function e() {
    for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e;
    return e.done = !0, e;
  };
}
export { _regeneratorKeys as default };