var _, _ref, _ref2;
let rest1, rest2;
var _ref3 = [0, {
  p: 1,
  q: 2,
  r: 3
}];
[, _ref, ..._ref2] = _ref3;
({
  p: _
} = _ref);
rest1 = babelHelpers.objectWithoutProperties(_ref, ["p"]);
rest2 = _ref2;
_ref3;
