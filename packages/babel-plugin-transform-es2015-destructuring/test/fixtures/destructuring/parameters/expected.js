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

var unpackArray = function (_ref3, _ref4) {
  var _ref6 = babelHelpers.slicedToArray(_ref3, 3);

  var a = _ref6[0];
  var b = _ref6[1];
  var c = _ref6[2];

  var _ref5 = babelHelpers.slicedToArray(_ref4, 3);

  var x = _ref5[0];
  var y = _ref5[1];
  var z = _ref5[2];

  return a + b + c;
};

console.log(unpackArray(["hello", ", ", "world"], [1, 2, 3]));
