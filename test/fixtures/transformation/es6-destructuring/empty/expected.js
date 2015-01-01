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

var _ref = ["foo", "hello", [", ", "junk"], ["world"]];

var _ref2 = _slicedToArray(_ref, 5);

var a = _ref2[1];
var _ref2$2 = _slicedToArray(_ref2[2], 1);

var b = _ref2$2[0];
var _ref2$3 = _slicedToArray(_ref2[3], 1);

var c = _ref2$3[0];
var d = _ref2[4];
