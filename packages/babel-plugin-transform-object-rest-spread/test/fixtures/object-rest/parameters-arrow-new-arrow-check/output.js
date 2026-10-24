function outer() {
  var _this = this;
  return function (_ref) {
    babelHelpers.newArrowCheck(this, _this);
    let a = babelHelpers.objectWithoutProperties((babelHelpers.objectDestructuringEmpty(_ref), _ref), []);
    let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : g();
    let c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : a;
    return this;
  }.bind(this);
}
