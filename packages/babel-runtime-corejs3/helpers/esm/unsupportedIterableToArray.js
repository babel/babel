import _sliceInstanceProperty from "core-js-pure/features/instance/slice.js";
import _Array$from from "core-js-pure/features/array/from.js";
import arrayLikeToArray from "./arrayLikeToArray.js";
function _unsupportedIterableToArray(r, a) {
  if (r) {
    var _context;
    if ("string" == typeof r) return arrayLikeToArray(r, a);
    var t = _sliceInstanceProperty(_context = {}.toString.call(r)).call(_context, 8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? _Array$from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
  }
}
export { _unsupportedIterableToArray as default };