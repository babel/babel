var arrayWithHoles = require("@babel/runtime/helpers/arrayWithHoles");

var iterableToArray = require("@babel/runtime/helpers/iterableToArray");

var unsupportedIterableToArray = require("@babel/runtime/helpers/unsupportedIterableToArray");

var nonIterableRest = require("@babel/runtime/helpers/nonIterableRest");

function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}

module.exports = _toArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;