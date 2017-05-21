var _ref3;

let _ref = {},
    {
  [Symbol.for("foo")]: foo
} = _ref,
    rest = babelHelpers.objectWithoutProperties(_ref, [Symbol.for("foo")].map(babelHelpers.toPropertyKey));

var _ref2 = {};
({ [Symbol.for("foo")]: foo } = _ref2);
rest = babelHelpers.objectWithoutProperties(_ref2, [Symbol.for("foo")].map(babelHelpers.toPropertyKey));


if (_ref3 = {}, ({ [Symbol.for("foo")]: foo } = _ref3), rest = babelHelpers.objectWithoutProperties(_ref3, [Symbol.for("foo")].map(babelHelpers.toPropertyKey)), _ref3) {}
