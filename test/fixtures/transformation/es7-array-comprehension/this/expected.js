"use strict";

function add() {
  var _this = this;
  return (function () {
    var _ref = [];

    for (var _iterator = [1, 2, 3][Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      var i = _step.value;
      _ref.push(i * _this.multiplier);
    }

    return _ref;
  })();
}

add.call({ multiplier: 5 });
