var _ref3, _Symbol$for3;

let _ref = {},
    _Symbol$for = Symbol.for("foo"),
    {
  [_Symbol$for]: foo
} = _ref,
    rest = babelHelpers.objectWithoutProperties(_ref, [_Symbol$for].map(babelHelpers.toPropertyKey));

var _ref2 = {};

var _Symbol$for2 = Symbol.for("foo");

({
  [_Symbol$for2]: foo
} = _ref2);
rest = babelHelpers.objectWithoutProperties(_ref2, [_Symbol$for2].map(babelHelpers.toPropertyKey));
_ref2;

if (_ref3 = {}, _Symbol$for3 = Symbol.for("foo"), ({
  [_Symbol$for3]: foo
} = _ref3), rest = babelHelpers.objectWithoutProperties(_ref3, [_Symbol$for3].map(babelHelpers.toPropertyKey)), _ref3) {}
