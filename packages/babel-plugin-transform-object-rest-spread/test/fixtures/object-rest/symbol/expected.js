var _ref2, _Symbol$for3;

const _Symbol$for = Symbol.for("foo");

let {
  [_Symbol$for]: foo
} = {};

let rest = babelHelpers.objectWithoutProperties({}, [_Symbol$for]);
var _ref = {};

var _Symbol$for2 = Symbol.for("foo");

({ [_Symbol$for2]: foo } = _ref);
rest = babelHelpers.objectWithoutProperties(_ref, [_Symbol$for2]);


if (_ref2 = {}, _Symbol$for3 = Symbol.for("foo"), ({ [_Symbol$for3]: foo } = _ref2), rest = babelHelpers.objectWithoutProperties(_ref2, [_Symbol$for3]), _ref2) {}