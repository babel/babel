var _;
let rest1, rest2;
[, _ref, ...rest2] = [0, {
  p: 1,
  q: 2,
  r: 3
}];
var {
    p: _
  } = _ref,
  rest1 = babelHelpers.objectWithoutProperties(_ref, ["p"]);
