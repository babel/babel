import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
function _isNativeFunction(t) {
  try {
    var _context;
    return -1 !== _indexOfInstanceProperty(_context = Function.toString.call(t)).call(_context, "[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
export { _isNativeFunction as default };