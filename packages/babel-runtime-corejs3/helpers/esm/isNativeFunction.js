import _includesInstanceProperty from "core-js-pure/features/instance/includes.js";
function _isNativeFunction(t) {
  try {
    var _context;
    return _includesInstanceProperty(_context = Function.toString.call(t)).call(_context, "[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
export { _isNativeFunction as default };