import _createForOfIteratorHelper from "./createForOfIteratorHelper.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
import _Promise from "core-js-pure/features/promise/index.js";
import _sortInstanceProperty from "core-js-pure/features/instance/sort.js";
import createModuleNsFilter from "./createModuleNsFilter.js";
function _filterModuleNamespace(t) {
  var e,
    o = !1;
  try {
    var i = t(function (r) {
      if (Object(r) === r) try {
        var t = r.exports;
        if (void 0 !== t) {
          if (Object(t) !== t) throw new TypeError("import()'s `exports` must be an object");
          var _iterator = _createForOfIteratorHelper((e = [], t)),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var i = _step.value;
              if ("string" != typeof i) throw new TypeError("import()'s `exports` must be strings");
              _pushInstanceProperty(e).call(e, i);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      } catch (r) {
        throw o = !0, r;
      }
      return r;
    });
  } catch (r) {
    if (o) return _Promise.reject(r);
    throw r;
  }
  return e ? (_sortInstanceProperty(e).call(e), i.then(createModuleNsFilter(e))) : i;
}
export { _filterModuleNamespace as default };