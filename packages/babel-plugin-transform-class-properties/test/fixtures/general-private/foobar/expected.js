var _scopedFunctionWithThis;

var Child = function (_Parent) {
  babelHelpers.inherits(Child, _Parent);

  function Child() {
    var _this;

    babelHelpers.classCallCheck(this, Child);
    _this = babelHelpers.possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this));

    _scopedFunctionWithThis.set(_this, () => {
      _this.name = {};
    });

    return _this;
  }

  return Child;
}(Parent);

_scopedFunctionWithThis = new WeakMap();
