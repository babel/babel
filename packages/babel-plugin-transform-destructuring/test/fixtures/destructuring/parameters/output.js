function somethingAdvanced(_ref, p2, p3) {
  var _ref$topLeft = _ref.topLeft,
    _ref$topLeft2 = _ref$topLeft === void 0 ? {} : _ref$topLeft,
    x1 = _ref$topLeft2.x,
    y1 = _ref$topLeft2.y,
    _ref$bottomRight = _ref.bottomRight,
    _ref$bottomRight2 = _ref$bottomRight === void 0 ? {} : _ref$bottomRight,
    x2 = _ref$bottomRight2.x,
    y2 = _ref$bottomRight2.y;
}
function unpackObject(_ref2) {
  var title = _ref2.title,
    author = _ref2.author;
  return title + " " + author;
}
console.log(unpackObject({
  title: "title",
  author: "author"
}));
var unpackArray = function (_ref3, _ref4) {
  var _ref5 = babelHelpers.slicedToArray(_ref3, 3),
    a = _ref5[0],
    b = _ref5[1],
    c = _ref5[2];
  var _ref6 = babelHelpers.slicedToArray(_ref4, 3),
    x = _ref6[0],
    y = _ref6[1],
    z = _ref6[2];
  return a + b + c;
};
console.log(unpackArray(["hello", ", ", "world"], [1, 2, 3]));
