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
  let { a3 } = _ref4;
  let { a5 } = _ref5;
  let c5 = babelHelpers.objectWithoutProperties(_ref5, ["a5"]);
  let c3 = babelHelpers.objectWithoutProperties(_ref4, ["a3"]);
}
// Unchanged
function b(a) {}
function b2(a, ...b) {}
function b3({ b }) {}
