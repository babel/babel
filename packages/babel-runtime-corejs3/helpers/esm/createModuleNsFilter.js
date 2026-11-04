import _Object$create from "core-js-pure/features/object/create.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import _Symbol$toStringTag from "core-js-pure/features/symbol/to-string-tag.js";
import _Object$freeze from "core-js-pure/features/object/freeze.js";
function _createModuleNsFilter(e) {
  return function (r) {
    for (var getter = function getter(e) {
        return function () {
          return r[e];
        };
      }, t = _Object$create(null), n = 0; n < e.length; n++) {
      var o = e[n];
      if (!(o in r)) throw new ReferenceError("The requested module does not provide an export named '" + o + "'");
      o in t || _Object$defineProperty(t, o, {
        enumerable: !0,
        get: getter(o)
      });
    }
    return _Object$defineProperty(t, _Symbol$toStringTag, {
      value: "Module"
    }), _Object$freeze(t);
  };
}
export { _createModuleNsFilter as default };