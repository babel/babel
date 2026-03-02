// foo property access should be removed
const _ref = {},
  rest = babelHelpers.objectWithoutProperties(_ref, ["foo"]);
