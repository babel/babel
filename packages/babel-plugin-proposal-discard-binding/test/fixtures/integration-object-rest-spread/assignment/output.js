var _, _ref;
let rest1, rest2;
var _ref2 = [0, {
  p: 1,
  q: 2,
  r: 3
}];
[, _ref, ...rest2] = _ref2;
({
  p: _
} = _ref);
rest1 = babelHelpers.objectWithoutProperties(_ref, ["p"]);
_ref2;
