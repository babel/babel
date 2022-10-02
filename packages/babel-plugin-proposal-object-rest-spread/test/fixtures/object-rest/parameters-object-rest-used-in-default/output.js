const _excluded = ["X"];
_ref => {
  let R = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref), _ref));
  let a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : R;
};
(_ref2, _ref3) => {
  let {
      X: Y
    } = _ref2,
    R = babelHelpers.objectWithoutProperties(_ref2, _excluded);
  let {
    a = {
      Y
    }
  } = _ref3;
};
() => {
  let a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : R;
  let _ref4 = arguments.length > 1 ? arguments[1] : undefined;
  let R = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref4), _ref4));
};
(_ref5, e, c = 2) => {
  let R = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref5), _ref5));
  let a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : R;
  let f = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : q;
  return function () {
    let q;
  }();
};
_ref6 => {
  let R = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref6), _ref6));
  let a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : f(R);
};
(_ref7, _ref8) => {
  let R = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref7), _ref7));
  let {
    [R.key]: a = 42
  } = _ref8;
};
(_ref9, {
  a = {
    R: b
  }
}) => {
  let R = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref9), _ref9));
};
(_ref10, {
  a = R => R
} = {
  b: R => R
}) => {
  let R = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref10), _ref10));
};
