"use strict";

var arr = (function () {
  var _arr = [];

  for (var _iterator = [1, 2, 3][Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
    var i = _step.value;
    _arr.push(i * i);
  }

  return _arr;
})();
