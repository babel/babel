"use strict";

var _slicedToArray = function (arr, i) {
  if (Array.isArray(arr)) {
    return arr;
  } else {
    var _arr = [];
    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);

      if (i && _arr.length === i) break;
    }

    return _arr;
  }
};

for (var _iterator = this.test.expectation.registers[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
  var _ref = _step.value;
  var _ref2 = _slicedToArray(_ref, 3);

  var name = _ref2[0];
  var before = _ref2[1];
  var after = _ref2[2];
}
