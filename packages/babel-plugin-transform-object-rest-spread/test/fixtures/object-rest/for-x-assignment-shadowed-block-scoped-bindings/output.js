let a = 0,
  result,
  y;
for (var _ref of [["0", "1"]]) {
  var _a;
  ({
    [_a = a++]: result
  } = _ref);
  y = babelHelpers.objectWithoutProperties(_ref, [_a].map(babelHelpers.toPropertyKey));
  {
    const a = 1;
  }
}
