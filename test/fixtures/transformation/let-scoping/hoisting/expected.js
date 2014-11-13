"use strict";

for (var _iterator = [1, 2, 3][Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
  var i = _step.value;
  var x;
  (function (i) {
    x = 5;
    fns.push(function () {
      return i * x;
    });
  })(i);
}
