const _excluded = ["p"];
let rest1, rest2;
try {
  throw [0, {
    p: 1,
    q: 2,
    r: 3
  }];
} catch (_ref) {
  let _ref2 = babelHelpers.toArray(_ref),
    _ref2$ = _ref2[1],
    _ = _ref2$.p,
    rest1_ = babelHelpers.objectWithoutProperties(_ref2$, _excluded),
    rest2_ = babelHelpers.arrayLikeToArray(_ref2).slice(2);
  rest1 = rest1_;
  rest2 = rest2_;
}
