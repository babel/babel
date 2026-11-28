import structRegistry from "./structRegistry.js";
import wrapStructMethod from "./wrapStructMethod.js";
function _structPrivateMethod(e, o, u) {
  var i = structRegistry(),
    s = i.w.get(o);
  return s || (s = wrapStructMethod(o, i.s.get(e).b, u), i.w.set(o, s)), s;
}
export { _structPrivateMethod as default };