"use strict";

var _slicedToArray = function (arr, i) { if (!arr || !arr[Symbol.iterator]) { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } else if (Array.isArray(arr)) { return arr; } else { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } };

for (var _ref in obj) {
  var _ref2 = _slicedToArray(_ref, 2);

  var name = _ref2[0];
  var value = _ref2[1];
  print("Name: " + name + ", Value: " + value);
}
