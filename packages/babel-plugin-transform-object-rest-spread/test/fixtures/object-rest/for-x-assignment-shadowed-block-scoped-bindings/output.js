let a = 0,
  result,
  y;
for (var _ref of [["0", "1"]]) {
  var _ref2 = _ref;
  var _a = a++;
  ({
    [_a]: result
  } = _ref2);
  y = babelHelpers.objectWithoutProperties(_ref2, [_a].map(babelHelpers.toPropertyKey));
  _ref2;
  {
    const a = 1;
  }
}
