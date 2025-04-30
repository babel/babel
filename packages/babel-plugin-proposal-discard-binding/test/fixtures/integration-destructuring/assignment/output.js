var _;
let rest1, rest2;
var _ref = [0, {
  p: 1,
  q: 2,
  r: 3
}];
var _ref$ = _ref[1];
_ = _ref$.p;
rest1 = babelHelpers.objectWithoutProperties(_ref$, ["p"]);
rest2 = _ref.slice(2);
_ref;
