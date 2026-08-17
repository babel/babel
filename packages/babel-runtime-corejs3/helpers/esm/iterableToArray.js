import _Symbol from "core-js-pure/features/symbol/index.js";
import _getIteratorMethod from "core-js-pure/features/get-iterator-method.js";
import _Array$isArray from "core-js-pure/features/array/is-array.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
function _iterableToArray(r) {
  var e = "undefined" != typeof _Symbol && _getIteratorMethod(r) || r["@@iterator"];
  if (_Array$isArray(r) && (null == e || e === ("undefined" != typeof _Symbol && _getIteratorMethod(Array.prototype)))) return r;
  if (null != e) {
    for (var t, o = [], a = e.call(r); !(t = a.next()).done;) _pushInstanceProperty(o).call(o, t.value);
    return o;
  }
}
export { _iterableToArray as default };