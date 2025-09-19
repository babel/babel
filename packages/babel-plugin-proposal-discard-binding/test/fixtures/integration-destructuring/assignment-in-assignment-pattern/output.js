var _;
let rest1, rest2;
var _ref = [0];
var _ref$ = _ref[1];
_ref$ = _ref$ === void 0 ? {
  p: 1,
  q: 2,
  r: 3
} : _ref$;
_ = _ref$.p;
rest1 = babelHelpers.objectWithoutProperties(_ref$, ["p"]);
rest2 = babelHelpers.arrayLikeToArray(_ref).slice(2);
_ref;
