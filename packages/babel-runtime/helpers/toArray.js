exports.__esModule = true;
exports.default = _toArray;

var _from = _interopRequireDefault(require("../core-js/array/from"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) {
  return Array.isArray(arr) ? arr : (0, _from.default)(arr);
}
