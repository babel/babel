function a(_ref) {
  let a34 = babelHelpers.objectWithoutProperties(_ref, []);
}
function a2(_ref2) {
  let { a1 } = _ref2;
  let b1 = babelHelpers.objectWithoutProperties(_ref2, ["a1"]);
}
function a3(_ref3) {
  let { a2, b2 } = _ref3;
  let c2 = babelHelpers.objectWithoutProperties(_ref3, ["a2", "b2"]);
}
function a4(_ref4, _ref5) {
  let { a5 } = _ref5;
  let c5 = babelHelpers.objectWithoutProperties(_ref5, ["a5"]);
  let { a3 } = _ref4;
  let c3 = babelHelpers.objectWithoutProperties(_ref4, ["a3"]);
}
function a5(_ref6) {
  let { a3, b2: { ba1 } } = _ref6;
  let ba2 = babelHelpers.objectWithoutProperties(_ref6.b2, ["ba1"]),
      c3 = babelHelpers.objectWithoutProperties(_ref6, ["a3", "b2"]);
}
function a6(_ref7) {
  let { a3, b2: { ba1 } } = _ref7;
  let ba2 = babelHelpers.objectWithoutProperties(_ref7.b2, ["ba1"]);
}
// Unchanged
function b(a) {}
function b2(a, ...b) {}
function b3({ b }) {}
