import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
function _toSetter(t, e, n) {
  e || (e = []);
  var r = e.length++;
  return _Object$defineProperty({}, "_", {
    set: function set(o) {
      e[r] = o, t.apply(n, e);
    }
  });
}
export { _toSetter as default };