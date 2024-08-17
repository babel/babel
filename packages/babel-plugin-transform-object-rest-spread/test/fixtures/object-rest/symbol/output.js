var _ref3;
let _ref = {},
  {
    [Symbol.for("foo")]: foo
  } = _ref,
  rest = babelHelpers.objectWithoutProperties(_ref, [Symbol.for("foo")]);
var _ref2 = {};
({
  [Symbol.for("foo")]: foo
} = _ref2);
rest = babelHelpers.objectWithoutProperties(_ref2, [Symbol.for("foo")]);
_ref2;
if (_ref3 = {}, {
  [Symbol.for("foo")]: foo
} = _ref3, rest = babelHelpers.objectWithoutProperties(_ref3, [Symbol.for("foo")]), _ref3) {}
