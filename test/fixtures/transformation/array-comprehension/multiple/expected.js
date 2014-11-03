"use strict";

var arr = (function () {
  var _arr = [];

  for (var _iterator = "abcdefgh".split("")[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
    var x = _step.value;

    for (var _iterator2 = "12345678".split("")[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
      var y = _step2.value;

      _arr.push(x + y);
    }
  }

  return _arr;
})();
