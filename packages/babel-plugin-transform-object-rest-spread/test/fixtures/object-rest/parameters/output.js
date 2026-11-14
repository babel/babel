const _excluded = ["a1"],
  _excluded2 = ["a2", "b2"],
  _excluded3 = ["a3"],
  _excluded4 = ["a5"],
  _excluded5 = ["ba1"],
  _excluded6 = ["a3", "b2"],
  _excluded7 = ["ba1"],
  _excluded8 = ["a1"],
  _excluded9 = ["a1"],
  _excluded0 = ["0"],
  _excluded1 = ["0"],
  _excluded10 = ["0"],
  _excluded11 = ["0"],
  _excluded12 = ["0"];
function a(_ref) {
  let a34 = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
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
      a3
    } = _ref4,
    c3 = babelHelpers.objectWithoutProperties(_ref4, _excluded3);
  let {
      a5
    } = _ref5,
    c5 = babelHelpers.objectWithoutProperties(_ref5, _excluded4);
}
function a5(_ref6) {
  let {
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
  let {
      a3
    } = _ref7,
    _ref7$b = _ref7.b2,
    {
      ba1
    } = _ref7$b,
    ba2 = babelHelpers.objectWithoutProperties(_ref7$b, _excluded7);
}
function a7(_ref8 = {}) {
  let {
      a1 = 1
    } = _ref8,
    b1 = babelHelpers.objectWithoutProperties(_ref8, _excluded8);
}
function a8([_ref9]) {
  let a1 = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref9), _ref9)), []);
}
function a9([_ref0]) {
  let {
      a1
    } = _ref0,
    a2 = babelHelpers.objectWithoutProperties(_ref0, _excluded9);
}
function a10([a1, _ref1]) {
  let a2 = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref1), _ref1)), []);
}
function a11([..._ref10]) {
  let {
      0: a1
    } = _ref10,
    a2 = babelHelpers.objectWithoutProperties(_ref10, _excluded0);
}
(function ([..._ref11]) {
  let {
      0: a1
    } = _ref11,
    a2 = babelHelpers.objectWithoutProperties(_ref11, _excluded1);
});
(a1 = 0, [..._ref12] = []) => {
  let {
      0: a2
    } = _ref12,
    a3 = babelHelpers.objectWithoutProperties(_ref12, _excluded10);
};
({
  a12([..._ref13]) {
    let {
        0: a1
      } = _ref13,
      a2 = babelHelpers.objectWithoutProperties(_ref13, _excluded11);
  }
});
class A13 {
  a13([..._ref14]) {
    let {
        0: a1
      } = _ref14,
      a2 = babelHelpers.objectWithoutProperties(_ref14, _excluded12);
  }
}
function a14(...[_ref15]) {
  let a1 = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref15), _ref15)), []);
}
// Unchanged
function b(a) {}
function b2(a, ...b) {}
function b3({
  b
}) {}
