"use strict";

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
  var a = _ref3[0];
  var b = _ref3[1];
  var c = _ref3[2];
  var x = _ref4[0];
  var y = _ref4[1];
  var z = _ref4[2];

  return a + b + c;
};

console.log(unpackArray(["hello", ", ", "world"], [1, 2, 3]));
