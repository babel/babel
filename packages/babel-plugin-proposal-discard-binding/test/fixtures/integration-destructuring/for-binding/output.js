const _excluded = ["p"];
let rest1, rest2;
for (const _ref = [0, {
    p: 1,
    q: 2,
    r: 3
  }], _ref$ = _ref[1], _ = _ref$.p, rest1_ = babelHelpers.objectWithoutProperties(_ref$, _excluded), rest2_ = _ref.slice(2); true;) {
  rest1 = rest1_;
  rest2 = rest2_;
  break;
}
;
