"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in arr) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

for (var _iterator = test.expectation.registers[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
  var _step$value = _slicedToArray(_step.value, 3);

  var name = _step$value[0];
  var before = _step$value[1];
  var after = _step$value[2];
}
