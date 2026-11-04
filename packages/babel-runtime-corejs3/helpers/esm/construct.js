import _Reflect$construct from "core-js-pure/features/reflect/construct.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import isNativeReflectConstruct from "./isNativeReflectConstruct.js";
import setPrototypeOf from "./setPrototypeOf.js";
function _construct(e, o, p) {
  if (isNativeReflectConstruct()) return _Reflect$construct.apply(null, arguments);
  var n = [null];
  _pushInstanceProperty(n).apply(n, o);
  var l = new (_bindInstanceProperty(e).apply(e, n))();
  return p && setPrototypeOf(l, p.prototype), l;
}
export { _construct as default };