import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
import _Reflect$apply from "core-js-pure/features/reflect/apply.js";
import _Object$setPrototypeOf from "core-js-pure/features/object/set-prototype-of.js";
import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import setFunctionName from "./setFunctionName.js";
function _wrapStructMethod(e, r, o) {
  var c = _Object$getOwnPropertyDescriptor({
    get m() {
      if (!r.has(this)) throw new TypeError("Struct method called on an incompatible receiver");
      return _Reflect$apply(e, this, arguments);
    }
  }, "m").get;
  try {
    delete c.length;
  } catch (t) {}
  return setFunctionName(c, o), _Object$setPrototypeOf(c, _Object$getPrototypeOf(e)), c;
}
export { _wrapStructMethod as default };