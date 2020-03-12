var Child = /*#__PURE__*/function (_Parent) {
  "use strict";

  babelHelpers.inherits(Child, _Parent);

  function Child() {
    var _this;

    babelHelpers.classCallCheck(this, Child);

    try {
      _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Child).call(this));
    } finally {
      _this.scopedFunctionWithThis = function () {
        _this.name = {};
      };
    }

    return _this;
  }

  return Child;
}(Parent);
