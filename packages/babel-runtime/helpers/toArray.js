var iterableToArray = require("./iterableToArray.js");
var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");
var nonIterableRest = require("./nonIterableRest.js");
function _toArray(r) {
  return iterableToArray(r) || unsupportedIterableToArray(r) || nonIterableRest();
}
module.exports = _toArray, module.exports.__esModule = true, module.exports["default"] = module.exports;