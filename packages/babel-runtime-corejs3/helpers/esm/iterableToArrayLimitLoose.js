import _Symbol from "core-js-pure/features/symbol/index.js";
import _getIteratorMethod from "core-js-pure/features/get-iterator-method.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
export default function _iterableToArrayLimitLoose(e, t) {
  var o = e && ("undefined" != typeof _Symbol && _getIteratorMethod(e) || e["@@iterator"]);
  if (null == o) return;
  var r = [];
  var l;
  for (o = o.call(e); e.length < t && !(l = o.next()).done;) _pushInstanceProperty(r).call(r, l.value);
  return r;
}