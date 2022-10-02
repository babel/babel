type Point = {
  x: number;
  y: number;
};
function value(_ref: Point) {
  var x = _ref.x,
    y = _ref.y;
  return x * y;
}
function valueWithDefault() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    x = _ref2.x,
    y = _ref2.y;
  return x * y;
}
