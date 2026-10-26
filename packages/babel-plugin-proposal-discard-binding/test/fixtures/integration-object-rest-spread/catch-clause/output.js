const _excluded = ["p"];
let rest1, rest2;
try {
  throw [0, {
    p: 1,
    q: 2,
    r: 3
  }];
} catch (_ref) {
  let [, _ref2, ...rest2_] = _ref,
    {
      p: _
    } = _ref2,
    rest1_ = babelHelpers.objectWithoutProperties(_ref2, _excluded);
  rest1 = rest1_;
  rest2 = rest2_;
}
