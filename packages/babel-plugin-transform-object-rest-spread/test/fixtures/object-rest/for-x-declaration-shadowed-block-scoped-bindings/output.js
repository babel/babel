let a = 0,
  result;
for (const _ref of [["0", "1"]]) {
  var _a;
  const {
      [_a = a++]: x
    } = _ref,
    y = babelHelpers.objectWithoutProperties(_ref, [_a].map(babelHelpers.toPropertyKey));
  {
    const a = 1;
    result = x;
  }
}
