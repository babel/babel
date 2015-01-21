"use strict";

function add() {
  var _arguments = arguments;
  return (function () {
    var _ref = [];

    for (var _iterator = [1, 2, 3][Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      var i = _step.value;
      _ref.push(i * _arguments[0]);
    }

    return _ref;
  })();
}

add(5);
