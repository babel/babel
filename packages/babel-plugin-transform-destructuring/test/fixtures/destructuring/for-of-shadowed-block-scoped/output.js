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
  babelHelpers.objectDestructuringEmpty(_ref2);
  _ = _ref2[a];
  {
    const a = "A";
  }
}
