"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

for (var _ref in obj) {
  var _ref2 = _slicedToArray(_ref, 2);

  var name = _ref2[0];
  var value = _ref2[1];
  print("Name: " + name + ", Value: " + value);
}
