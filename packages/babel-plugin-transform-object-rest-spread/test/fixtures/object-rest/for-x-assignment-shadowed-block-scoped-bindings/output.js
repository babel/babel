let a = 0,
  result,
  y;
for (var _ref of [["0", "1"]]) {
  var _a;
  var _ref2 = _ref;
  ({
    [_a = babelHelpers.toPropertyKey(a++)]: result
  } = _ref2);
  y = babelHelpers.objectWithoutProperties(_ref2, [_a]);
  {
    const a = 1;
  }
}
