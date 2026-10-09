const _excluded = ["p"];
let rest1, rest2;
for (const _ref of [[0, {
  p: 1,
  q: 2,
  r: 3
}]]) {
  var _ref2 = babelHelpers.toArray(_ref);
  const _ = _ref2[0];
  var _ref2$ = _ref2[1];
  const _2 = _ref2$.p;
  const rest1_ = babelHelpers.objectWithoutProperties(_ref2$, _excluded);
  const rest2_ = babelHelpers.arrayLikeToArray(_ref2).slice(2);
  rest1 = rest1_;
  rest2 = rest2_;
  break;
}
;
