"use strict";

function add() {
  var _arguments = arguments;
  return (function () {
    var _arr = [];

    for (var _iterator = [1, 2, 3][Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      var i = _step.value;
      _arr.push(i * _arguments[0]);
    }

    return _arr;
  })();
}

add(5);
