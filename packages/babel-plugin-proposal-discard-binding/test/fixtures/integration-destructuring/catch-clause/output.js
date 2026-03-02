const _excluded = ["p"];
let rest1, rest2;
try {
  throw [0, {
    p: 1,
    q: 2,
    r: 3
  }];
} catch (_ref) {
  var _ref2 = babelHelpers.toArray(_ref);
  let _ = _ref2[0];
  var _ref2$ = _ref2[1];
  let _2 = _ref2$.p;
  let rest1_ = babelHelpers.objectWithoutProperties(_ref2$, _excluded);
  let rest2_ = babelHelpers.arrayLikeToArray(_ref2).slice(2);
  rest1 = rest1_;
  rest2 = rest2_;
}
