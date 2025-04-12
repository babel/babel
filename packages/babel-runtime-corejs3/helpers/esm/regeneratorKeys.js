import _unshiftInstanceProperty from "core-js-pure/features/instance/unshift.js";
function _regeneratorKeys(e) {
  var n = Object(e),
    t = [];
  for (var r in n) _unshiftInstanceProperty(t).call(t, r);
  return function next() {
    for (; t.length;) if ((r = t.pop()) in n) return next.value = r, next.done = !1, next;
    return next.done = !0, next;
  };
}
export { _regeneratorKeys as default };