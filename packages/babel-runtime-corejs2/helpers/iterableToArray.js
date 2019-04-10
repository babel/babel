var _isIterable = require("../core-js/is-iterable");

var _Array$from = require("../core-js/array/from");

function _iterableToArray(iter) {
  var prototypeWhiteList = [String.prototype, Array.prototype];
  var iterObject = Object(iter);

  if (prototypeWhiteList.some(function (prototype) {
    return prototype.isPrototypeOf(iterObject);
  })) {
    return _Array$from(iter);
  }

  if (iterObject.toString() === "[object Arguments]") {
    return _Array$from(iter);
  }

  if (_isIterable(iterObject)) {
    return _Array$from(iter);
  }
}

module.exports = _iterableToArray;