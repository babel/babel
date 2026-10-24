const _excluded = ["a1"],
  _excluded2 = ["a2", "b2"],
  _excluded3 = ["a3"],
  _excluded4 = ["a5"],
  _excluded5 = ["ba1"],
  _excluded6 = ["a3", "b2"],
  _excluded7 = ["ba1"],
  _excluded8 = ["a1"],
  _excluded9 = ["a1"];
function a(_ref) {
  var a34 = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
}
function a2(_ref2) {
  var {
      a1
    } = _ref2,
    b1 = babelHelpers.objectWithoutProperties(_ref2, _excluded);
}
function a3(_ref3) {
  var {
      a2,
      b2
    } = _ref3,
    c2 = babelHelpers.objectWithoutProperties(_ref3, _excluded2);
}
function a4(_ref4, _ref5) {
  var {
      a3
    } = _ref4,
    c3 = babelHelpers.objectWithoutProperties(_ref4, _excluded3);
  var {
      a5
    } = _ref5,
    c5 = babelHelpers.objectWithoutProperties(_ref5, _excluded4);
}
function a5(_ref6) {
  var {
      a3
    } = _ref6,
    _ref6$b = _ref6.b2,
    {
      ba1
    } = _ref6$b,
    ba2 = babelHelpers.objectWithoutProperties(_ref6$b, _excluded5),
    c3 = babelHelpers.objectWithoutProperties(_ref6, _excluded6);
}
function a6(_ref7) {
  var {
      a3
    } = _ref7,
    _ref7$b = _ref7.b2,
    {
      ba1
    } = _ref7$b,
    ba2 = babelHelpers.objectWithoutProperties(_ref7$b, _excluded7);
}
function a7(_ref8 = {}) {
  var {
      a1 = 1
    } = _ref8,
    b1 = babelHelpers.objectWithoutProperties(_ref8, _excluded8);
}
function a8(_ref9) {
  var [_ref0] = _ref9,
    a1 = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref0), _ref0)), []);
}
function a9(_ref1) {
  var [_ref10] = _ref1,
    {
      a1
    } = _ref10,
    a2 = babelHelpers.objectWithoutProperties(_ref10, _excluded9);
}
function a10(_ref11) {
  var [a1, _ref12] = _ref11,
    a2 = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref12), _ref12)), []);
}
// Unchanged
function b(a) {}
function b2(a, ...b) {}
function b3({
  b
}) {}
