var _Array$from = require("../core-js/array/from");

var _isIterable = require("../core-js/is-iterable");

function _iterableToArray(iter) {
  if (typeof iter === 'string' || Object.prototype.toString.call(iter) === "[object Arguments]" || _isIterable(Object(iter))) return _Array$from(iter);
}

module.exports = _iterableToArray;