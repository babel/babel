var _, _ref, _ref2;
let rest1, rest2;
var _ref3 = [0];
[, _ref, ..._ref2] = _ref3;
var _ref4 = _ref === void 0 ? {
  p: 1,
  q: 2,
  r: 3
} : _ref;
({
  p: _
} = _ref4);
rest1 = babelHelpers.objectWithoutProperties(_ref4, ["p"]);
rest2 = _ref2;
_ref3;
