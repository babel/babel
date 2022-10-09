const _excluded = ["x"];
expect(() => {
  var _ref = null,
    x = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref), _ref));
}).toThrow(/null/);
expect(() => {
  var _ref2 = null,
    {
      x
    } = _ref2,
    y = babelHelpers.objectWithoutProperties(_ref2, _excluded);
}).toThrow(/null/);
