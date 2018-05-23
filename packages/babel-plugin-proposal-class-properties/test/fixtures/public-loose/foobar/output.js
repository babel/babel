var Child =
/*#__PURE__*/
function (_Parent) {
  "use strict";

  function Child() {
    var _this;

    babelHelpers.classCallCheck(this, Child);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Child).call(this));

    _this.scopedFunctionWithThis = function () {
      _this.name = {};
    };

    return _this;
  }

  babelHelpers.inherits(Child, _Parent);
  return Child;
}(Parent);
