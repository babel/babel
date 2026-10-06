import _createForOfIteratorHelper from "./createForOfIteratorHelper.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
import _Promise from "core-js-pure/features/promise/index.js";
import _sortInstanceProperty from "core-js-pure/features/instance/sort.js";
import createModuleNsFilter from "./createModuleNsFilter.js";
function _filterModuleNamespace(r) {
  var t,
    e = !1;
  try {
    var o = r(function (r) {
      if (Object(r) === r) try {
        var o = r.exports;
        if (void 0 !== o) {
          if (Object(o) !== o) throw new TypeError("import()'s `exports` must be an object");
          var _iterator = _createForOfIteratorHelper((t = [], o)),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var i = _step.value;
              if ("string" != typeof i) throw new TypeError("import()'s `exports` must be strings");
              _pushInstanceProperty(t).call(t, i);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      } catch (r) {
        throw e = !0, r;
      }
      return r;
    });
  } catch (r) {
    if (e) return _Promise.reject(r);
    throw r;
  }
  return t ? (_sortInstanceProperty(t).call(t), o.then(createModuleNsFilter(t))) : o;
}
export { _filterModuleNamespace as default };