var _Array$from = require("../core-js/array/from");

var _isIterable = require("../core-js/is-iterable");

var _Array$isArray = require("../core-js/array/is-array");

function _iterableToArray(iter) {
  if (_Array$isArray(iter) || typeof iter === 'string' || typeof global.Symbol === 'function' && _isIterable(Object(iter)) || iter && 'length' in iter || typeof global.Map !== 'undefined' && iter instanceof global.Map || typeof global.Set !== 'undefined' && iter instanceof global.Set || Object.prototype.toString.call(iter) === "[object Arguments]") return _Array$from(iter);
}

module.exports = _iterableToArray;