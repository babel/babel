import _Reflect$construct from "core-js-pure/features/reflect/construct.js";
import getPrototypeOf from "./getPrototypeOf.js";
import isNativeReflectConstruct from "./isNativeReflectConstruct.js";
import possibleConstructorReturn from "./possibleConstructorReturn.js";
function _createSuper(o) {
  var i = isNativeReflectConstruct();
  return function () {
    var r,
      c = getPrototypeOf(o);
    if (i) {
      var n = getPrototypeOf(this).constructor;
      r = _Reflect$construct(c, arguments, n);
    } else r = c.apply(this, arguments);
    return possibleConstructorReturn(this, r);
  };
}
export { _createSuper as default };