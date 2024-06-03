import _forEachInstanceProperty from "core-js-pure/features/instance/for-each.js";
import _Object$keys from "core-js-pure/features/object/keys.js";
import _reduceInstanceProperty from "core-js-pure/features/instance/reduce.js";
import _reverseInstanceProperty from "core-js-pure/features/instance/reverse.js";
import _sliceInstanceProperty from "core-js-pure/features/instance/slice.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
function _applyDecoratedDescriptor(i, e, r, n, l) {
  var _context, _context2, _context3;
  var a = {};
  return _forEachInstanceProperty(_context = _Object$keys(n)).call(_context, function (i) {
    a[i] = n[i];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = _reduceInstanceProperty(_context2 = _reverseInstanceProperty(_context3 = _sliceInstanceProperty(r).call(r)).call(_context3)).call(_context2, function (r, n) {
    return n(i, e, r) || r;
  }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer && (_Object$defineProperty(i, e, a), a = null), a;
}
export { _applyDecoratedDescriptor as default };