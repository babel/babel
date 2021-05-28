const _exclude = ["a1"],
      _exclude2 = ["a2", "b2"],
      _exclude3 = ["a5"],
      _exclude4 = ["a3"],
      _exclude5 = ["ba1"],
      _exclude6 = ["a3", "b2"],
      _exclude7 = ["ba1"],
      _exclude8 = ["a1"],
      _exclude9 = ["a1"];

function a(_ref) {
  let a34 = babelHelpers.extends({}, _ref);
}

function a2(_ref2) {
  let {
    a1
  } = _ref2,
      b1 = babelHelpers.objectWithoutProperties(_ref2, _exclude);
}

function a3(_ref3) {
  let {
    a2,
    b2
  } = _ref3,
      c2 = babelHelpers.objectWithoutProperties(_ref3, _exclude2);
}

function a4(_ref4, _ref5) {
  let {
    a5
  } = _ref5,
      c5 = babelHelpers.objectWithoutProperties(_ref5, _exclude3);
  let {
    a3
  } = _ref4,
      c3 = babelHelpers.objectWithoutProperties(_ref4, _exclude4);
}

function a5(_ref6) {
  let {
    a3,
    b2: {
      ba1
    }
  } = _ref6,
      ba2 = babelHelpers.objectWithoutProperties(_ref6.b2, _exclude5),
      c3 = babelHelpers.objectWithoutProperties(_ref6, _exclude6);
}

function a6(_ref7) {
  let {
    a3,
    b2: {
      ba1
    }
  } = _ref7,
      ba2 = babelHelpers.objectWithoutProperties(_ref7.b2, _exclude7);
}

function a7(_ref8 = {}) {
  let {
    a1 = 1
  } = _ref8,
      b1 = babelHelpers.objectWithoutProperties(_ref8, _exclude8);
}

function a8([_ref9]) {
  let a1 = babelHelpers.extends({}, _ref9);
}

function a9([_ref10]) {
  let {
    a1
  } = _ref10,
      a2 = babelHelpers.objectWithoutProperties(_ref10, _exclude9);
}

function a10([a1, _ref11]) {
  let a2 = babelHelpers.extends({}, _ref11);
} // Unchanged


function b(a) {}

function b2(a, ...b) {}

function b3({
  b
}) {}
