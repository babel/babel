var O = {
  a: "a"
};
const a = "a";
for (const _ref of [O]) {
  babelHelpers.objectDestructuringEmpty(_ref);
  const _ = _ref[a];
  {
    const a = "A";
  }
}
var _;
for (var _ref2 of [O]) {
  var _ref3 = _ref2;
  babelHelpers.objectDestructuringEmpty(_ref3);
  _ = _ref3[a];
  {
    const a = "A";
  }
}
