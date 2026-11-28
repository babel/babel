import _Reflect$apply from "core-js-pure/features/reflect/apply.js";
import structRegistry from "./structRegistry.js";
function _structSuper(t, o) {
  var e = structRegistry().s.get(t),
    u = e && e.p;
  return function () {
    if (!u) throw new TypeError("Super constructor is not a constructor");
    return u.i ? _Reflect$apply(u.i(o), o, arguments) : void 0;
  };
}
export { _structSuper as default };