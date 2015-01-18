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

function somethingAdvanced(_ref) {
  var x1 = _ref.topLeft.x;
  var y1 = _ref.topLeft.y;
  var x2 = _ref.bottomRight.x;
  var y2 = _ref.bottomRight.y;
}

function unpackObject(_ref2) {
  var title = _ref2.title;
  var author = _ref2.author;
  return title + " " + author;
}

console.log(unpackObject({ title: "title", author: "author" }));

var unpackArray = function (_ref3, _ref4) {
  var _ref32 = _slicedToArray(_ref3, 3);

  var a = _ref32[0];
  var b = _ref32[1];
  var c = _ref32[2];
  var _ref42 = _slicedToArray(_ref4, 3);

  var x = _ref42[0];
  var y = _ref42[1];
  var z = _ref42[2];
  return a + b + c;
};

console.log(unpackArray(["hello", ", ", "world"], [1, 2, 3]));
