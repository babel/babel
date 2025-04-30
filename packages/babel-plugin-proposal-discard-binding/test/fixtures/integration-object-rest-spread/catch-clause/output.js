const _excluded = ["p"];
let rest1, rest2;
try {
  throw [0, {
    p: 1,
    q: 2,
    r: 3
  }];
} catch ([, _ref, ...rest2_]) {
  let {
      p: _
    } = _ref,
    rest1_ = babelHelpers.objectWithoutProperties(_ref, _excluded);
  rest1 = rest1_;
  rest2 = rest2_;
}
