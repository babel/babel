import _sliceInstanceProperty from "core-js-pure/features/instance/slice.js";
import _Object$freeze from "core-js-pure/features/object/freeze.js";
import _Object$defineProperties from "core-js-pure/features/object/define-properties.js";
function _taggedTemplateLiteral(e, t) {
  return t || (t = _sliceInstanceProperty(e).call(e, 0)), _Object$freeze(_Object$defineProperties(e, {
    raw: {
      value: _Object$freeze(t)
    }
  }));
}
export { _taggedTemplateLiteral as default };