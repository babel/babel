"use strict";

var arr = (function () {
  var _arr = [];

  for (var _iterator = [1, 2, 3][Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
    var _i = _step.value;
    if (_i > 1) {
      _arr.push(_i * _i);
    }
  }

  return _arr;
})();
