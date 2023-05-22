const _excluded = ["a1"],
  _excluded2 = ["a2", "b2"],
  _excluded3 = ["a5"],
  _excluded4 = ["a3"],
  _excluded5 = ["ba1"],
  _excluded6 = ["a3", "b2"],
  _excluded7 = ["ba1"],
  _excluded8 = ["a1"],
  _excluded9 = ["a1"];
function a(_ref) {
  let a34 = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref), _ref));
}
function a2(_ref2) {
  let {
      a1
    } = _ref2,
    b1 = babelHelpers.objectWithoutProperties(_ref2, _excluded);
}
function a3(_ref3) {
  let {
      a2,
      b2
    } = _ref3,
    c2 = babelHelpers.objectWithoutProperties(_ref3, _excluded2);
}
function a4(_ref4, _ref5) {
  let {
      a5
    } = _ref5,
    c5 = babelHelpers.objectWithoutProperties(_ref5, _excluded3);
  let {
      a3
    } = _ref4,
    c3 = babelHelpers.objectWithoutProperties(_ref4, _excluded4);
}
function a5(_ref6) {
  let {
      a3,
      b2: {
        ba1
      }
    } = _ref6,
    ba2 = babelHelpers.objectWithoutProperties(_ref6.b2, _excluded5),
    c3 = babelHelpers.objectWithoutProperties(_ref6, _excluded6);
}
function a6(_ref7) {
  let {
      a3,
      b2: {
        ba1
      }
    } = _ref7,
    ba2 = babelHelpers.objectWithoutProperties(_ref7.b2, _excluded7);
}
function a7(_ref8 = {}) {
  let {
      a1 = 1
    } = _ref8,
    b1 = babelHelpers.objectWithoutProperties(_ref8, _excluded8);
}
function a8([_ref9]) {
  let a1 = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref9), _ref9));
}
function a9([_ref10]) {
  let {
      a1
    } = _ref10,
    a2 = babelHelpers.objectWithoutProperties(_ref10, _excluded9);
}
function a10([a1, _ref11]) {
  let a2 = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref11), _ref11));
}
// Unchanged
function b(a) {}
function b2(a, ...b) {}
function b3({
  b
}) {}
