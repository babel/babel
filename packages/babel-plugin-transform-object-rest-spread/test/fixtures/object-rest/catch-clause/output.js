const _excluded = ["a1"],
  _excluded2 = ["a2", "b2"],
  _excluded3 = ["c3"];
try {} catch (_ref) {
  let a34 = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
}
try {} catch (_ref2) {
  let {
      a1
    } = _ref2,
    b1 = babelHelpers.objectWithoutProperties(_ref2, _excluded);
}
try {} catch (_ref3) {
  let {
      a2,
      b2
    } = _ref3,
    c2 = babelHelpers.objectWithoutProperties(_ref3, _excluded2);
}
try {} catch (_ref4) {
  let {
      a2,
      b2
    } = _ref4,
    _ref4$c = _ref4.c2,
    {
      c3
    } = _ref4$c,
    c4 = babelHelpers.objectWithoutProperties(_ref4$c, _excluded3);
}

// Unchanged
try {} catch (a) {}
try {} catch ({
  b
}) {}
