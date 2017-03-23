exports.__esModule = true;

exports.default = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};