var _this = this;
const _excluded = ["length"];
function f(_ref) {
  let a = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
  let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : a;
  for (var _len = arguments.length, _ref2 = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    _ref2[_key - 2] = arguments[_key];
  }
  let [_ref3] = _ref2,
    c = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref3), _ref3)), []);
}
function g(_ref4) {
  let a = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref4), _ref4)), []);
  let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : a;
  for (var _len2 = arguments.length, _ref5 = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    _ref5[_key2 - 2] = arguments[_key2];
  }
  let {
      length
    } = _ref5,
    d = babelHelpers.objectWithoutProperties(_ref5, _excluded);
}
const h = function (_ref6) {
  let a = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref6), _ref6)), []);
  let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : a;
  return _this;
};
function i(_ref7) {
  let a = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref7), _ref7)), []);
  let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : a;
  return (arguments.length <= 2 ? undefined : arguments[2]) + (arguments.length <= 2 ? 0 : arguments.length - 2);
}
