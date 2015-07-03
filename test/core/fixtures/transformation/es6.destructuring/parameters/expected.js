"use strict";

function somethingAdvanced(_ref, p2, p3) {
  var _ref$topLeft = _ref.topLeft;
  _ref$topLeft = _ref$topLeft === undefined ? {} : _ref$topLeft;
  var x1 = _ref$topLeft.x;
  var y1 = _ref$topLeft.y;
  var _ref$bottomRight = _ref.bottomRight;
  _ref$bottomRight = _ref$bottomRight === undefined ? {} : _ref$bottomRight;
  var x2 = _ref$bottomRight.x;
  var y2 = _ref$bottomRight.y;
}

function unpackObject(_ref2) {
  var title = _ref2.title;
  var author = _ref2.author;

  return title + " " + author;
}

console.log(unpackObject({ title: "title", author: "author" }));

var unpackArray = function unpackArray(_ref3, _ref4) {
  var _ref32 = babelHelpers.slicedToArray(_ref3, 3);

  var a = _ref32[0];
  var b = _ref32[1];
  var c = _ref32[2];

  var _ref42 = babelHelpers.slicedToArray(_ref4, 3);

  var x = _ref42[0];
  var y = _ref42[1];
  var z = _ref42[2];

  return a + b + c;
};

console.log(unpackArray(["hello", ", ", "world"], [1, 2, 3]));