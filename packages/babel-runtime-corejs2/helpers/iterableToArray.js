var _isIterable = require("../core-js/is-iterable");

var _Array$from = require("../core-js/array/from");

function _iterableToArray(iter) {
  if (typeof iter === 'string') {
    return _Array$from(iter);
  }

  if (Object.prototype.toString.call(iter) === "[object Arguments]") {
    return _Array$from(iter);
  }

  if (_isIterable(Object(iter))) {
    return _Array$from(iter);
  }
}

module.exports = _iterableToArray;