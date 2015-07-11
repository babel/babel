"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function* x() {
  var _arr = [];

  for (var _i = 0; _i < _arr.length; _i++) {
    var a = _arr[_i];var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = a[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var b = _step.value;

        yield 1;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
}

exports.y = function y() {
  return [].concat(babelHelpers.toConsumableArray(x()));
};

