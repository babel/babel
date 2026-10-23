import _sliceInstanceProperty from "core-js-pure/features/instance/slice.js";
import _Array$from from "core-js-pure/features/array/from.js";
import arrayLikeToArray from "./arrayLikeToArray.js";
function _unsupportedIterableToArray(t, e) {
  if (t) {
    var _context;
    if ("string" == typeof t) return arrayLikeToArray(t, e);
    var o = _sliceInstanceProperty(_context = {}.toString.call(t)).call(_context, 8, -1);
    return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? _Array$from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? arrayLikeToArray(t, e) : void 0;
  }
}
export { _unsupportedIterableToArray as default };