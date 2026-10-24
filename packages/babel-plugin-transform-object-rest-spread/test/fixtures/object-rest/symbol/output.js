var _Symbol$for, _Symbol$for2, _Symbol$for3, _ref3;
let _ref = {},
  {
    [_Symbol$for = Symbol.for("foo")]: foo
  } = _ref,
  rest = babelHelpers.objectWithoutProperties(_ref, [_Symbol$for]);
var _ref2 = {};
({
  [_Symbol$for2 = Symbol.for("foo")]: foo
} = _ref2);
rest = babelHelpers.objectWithoutProperties(_ref2, [_Symbol$for2]);
if (_ref3 = {}, {
  [_Symbol$for3 = Symbol.for("foo")]: foo
} = _ref3, rest = babelHelpers.objectWithoutProperties(_ref3, [_Symbol$for3]), _ref3) {}
