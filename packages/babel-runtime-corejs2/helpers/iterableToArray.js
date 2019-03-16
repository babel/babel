var _Array$from = require("../core-js/array/from");

var _isIterable = require("../core-js/is-iterable");

function _iterableToArray(iter) {
  var prototypeWhiteList = ['[object Arguments]'];
  var hasSymbol = false;

  try {
    if (_isIterable(Object(iter))) {
      hasSymbol = true;
    }
  } catch (e) {}

  if (hasSymbol) {
    return _Array$from(iter);
  }

  if (prototypeWhiteList.indexOf(Object.prototype.toString.call(iter)) !== -1) {
    return _Array$from(iter);
  }

  return null;
}

module.exports = _iterableToArray;