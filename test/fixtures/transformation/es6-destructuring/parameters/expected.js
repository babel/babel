"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } };

function somethingAdvanced(_ref) {
  var x1 = _ref.topLeft.x;
  var y1 = _ref.topLeft.y;
  var x2 = _ref.bottomRight.x;
  var y2 = _ref.bottomRight.y;
}

function unpackObject(_ref) {
  var title = _ref.title;
  var author = _ref.author;
  return title + " " + author;
}

console.log(unpackObject({ title: "title", author: "author" }));

var unpackArray = function (_ref, _ref3) {
  var _ref2 = _slicedToArray(_ref, 3);

  var a = _ref2[0];
  var b = _ref2[1];
  var c = _ref2[2];
  var _ref32 = _slicedToArray(_ref3, 3);

  var x = _ref32[0];
  var y = _ref32[1];
  var z = _ref32[2];
  return a + b + c;
};

console.log(unpackArray(["hello", ", ", "world"], [1, 2, 3]));