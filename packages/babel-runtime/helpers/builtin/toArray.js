exports.__esModule = true;
exports.default = _default;

function _default(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}