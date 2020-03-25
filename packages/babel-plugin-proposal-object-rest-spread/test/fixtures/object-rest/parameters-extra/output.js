(_ref) => {
  let R = babelHelpers.extends({}, _ref);
  let a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : R;
};

(_ref2, _ref3) => {
  let R = babelHelpers.extends({}, _ref2);
  let {
    a = {
      R
    }
  } = _ref3;
};

(_ref4, {
  a = {
    R: b
  }
}) => {
  let R = babelHelpers.extends({}, _ref4);
};

(_ref5) => {
  let R = babelHelpers.extends({}, _ref5);
  let {
    a
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : R;
};

(_ref6, _ref7) => {
  let R = babelHelpers.extends({}, _ref6);
  let {
    a = R
  } = _ref7;
};

(_ref8) => {
  let {
    X: Y
  } = _ref8,
      R = babelHelpers.objectWithoutProperties(_ref8, ["X"]);
  let {
    a = b
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Y;
};

(_ref9, {
  a = b
} = X) => {
  let {
    X: Y
  } = _ref9,
      R = babelHelpers.objectWithoutProperties(_ref9, ["X"]);
};

() => {
  let a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : R;

  let _ref10 = arguments.length > 1 ? arguments[1] : undefined;

  let R = babelHelpers.extends({}, _ref10);
};

(_ref11) => {
  let R = babelHelpers.extends({}, _ref11);
  let a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : R;
  let c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
};

(_ref12, c = 2) => {
  let R = babelHelpers.extends({}, _ref12);
  let a = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : R;
};

(_ref13, e, c = 2) => {
  let R = babelHelpers.extends({}, _ref13);
  let a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : R;
  let f = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : q;
  return function () {
    let q;
  }();
};

(_ref14, f = R => R) => {
  let R = babelHelpers.extends({}, _ref14);
};

(_ref15, {
  a = R => R
} = {
  b: R => R
}) => {
  let R = babelHelpers.extends({}, _ref15);
};
