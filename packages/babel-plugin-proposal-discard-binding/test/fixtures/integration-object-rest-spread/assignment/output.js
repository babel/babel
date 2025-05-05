var _, _ref;
let rest1, rest2;
[, _ref, ...rest2] = [0, {
  p: 1,
  q: 2,
  r: 3
}];
var _ref2 = _ref;
({
  p: _
} = _ref2);
rest1 = babelHelpers.objectWithoutProperties(_ref2, ["p"]);
_ref2;
