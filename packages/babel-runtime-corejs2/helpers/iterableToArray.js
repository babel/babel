var _Array$from = require("@babel/runtime-corejs2/core-js/array/from");

var _isIterable = require("@babel/runtime-corejs2/core-js/is-iterable");

var _Symbol = require("@babel/runtime-corejs2/core-js/symbol");

function _iterableToArray(iter) {
  if (typeof _Symbol !== "undefined" && _isIterable(Object(iter))) return _Array$from(iter);
}

module.exports = _iterableToArray;