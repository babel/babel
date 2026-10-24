const _excluded = ["a", "b"],
  _excluded2 = ["x"];
for (const _ref of items) {
  const a = _ref.a,
    _ref$b = _ref.b,
    _ref$b2 = _ref$b === void 0 ? [] : _ref$b,
    _ref$b3 = babelHelpers.toArray(_ref$b2),
    _ref$b3$ = _ref$b3[0],
    c = _ref$b3$ === void 0 ? 10 : _ref$b3$,
    d = babelHelpers.arrayLikeToArray(_ref$b3).slice(1),
    rest = babelHelpers.objectWithoutProperties(_ref, _excluded);
  use(a, c, d, rest);
}
for (var _ref2 of items) {
  var _ref3 = _ref2;
  x = _ref3.x;
  y = babelHelpers.objectWithoutProperties(_ref3, _excluded2);
}
for (var _ref4 in obj) {
  var _ref5 = babelHelpers.slicedToArray(_ref4, 2),
    k = _ref5[0],
    v = _ref5[1].v;
  ;
}
