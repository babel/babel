function f(_ref) {
  let [_ref2, _ref3] = _ref,
    r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref2), _ref2)), []),
    b = _ref3 === void 0 ? r : _ref3;
  return [r, b];
}
function g(_ref4) {
  let [_ref5, _ref6] = _ref4,
    r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref5), _ref5)), []),
    b = _ref6 === void 0 ? babelHelpers.setFunctionName(() => r, "b") : _ref6;
  return [r, b()];
}
function h(_ref7) {
  let [_ref8, _ref9, _ref0] = _ref7,
    r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref8), _ref8)), []),
    s = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref9), _ref9)), []),
    b = _ref0 === void 0 ? s : _ref0;
  return [r, s, b];
}
