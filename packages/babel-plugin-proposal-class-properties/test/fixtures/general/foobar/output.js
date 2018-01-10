var Child =
/*#__PURE__*/
function (_Parent) {
  babelHelpers.inherits(Child, _Parent);

  function Child() {
    var _this;

    babelHelpers.classCallCheck(this, Child);
    _this = babelHelpers.possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this));
    Object.defineProperty(babelHelpers.assertThisInitialized(_this), "scopedFunctionWithThis", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.name = {};
      }
    });
    return _this;
  }

  return Child;
}(Parent);
