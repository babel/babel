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

var _ref = _slicedToArray(rect.topLeft, 2);

var x1 = _ref[0];
var y1 = _ref[1];
var _ref2 = _slicedToArray(rect.bottomRight, 2);

var x2 = _ref2[0];
var y2 = _ref2[1];
