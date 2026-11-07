const _excluded = ["a"],
  _excluded2 = ["d"],
  _excluded3 = ["e"],
  _excluded4 = ["e"],
  _excluded5 = ["g"],
  _excluded6 = ["e"];
let b;
try {} catch (_ref) {
  let {
      a = b
    } = _ref,
    r = babelHelpers.objectWithoutProperties(_ref, _excluded);
  {
    let b = a;
    const c = () => b;
    function q() {
      return r;
    }
    try {} catch (_ref2) {
      let {
          d = b
        } = _ref2,
        s = babelHelpers.objectWithoutProperties(_ref2, _excluded2);
      {
        let b = d + s;
      }
    }
  }
}
for (const _ref3 of z) {
  const {
      e = b
    } = _ref3,
    t = babelHelpers.objectWithoutProperties(_ref3, _excluded3);
  {
    let b = e;
    f(t, b);
  }
}
let e, t;
for (var _ref4 of z) {
  ({
    e
  } = _ref4), t = babelHelpers.objectWithoutProperties(_ref4, _excluded4);
  f(e, t);
}
for (const _ref5 of z) {
  const {
      g = b
    } = _ref5,
    u = babelHelpers.objectWithoutProperties(_ref5, _excluded5);
  label: for (var _ref6 of u) {
    ({
      e
    } = _ref6), t = babelHelpers.objectWithoutProperties(_ref6, _excluded6);
    if (g) continue label;
  }
}
