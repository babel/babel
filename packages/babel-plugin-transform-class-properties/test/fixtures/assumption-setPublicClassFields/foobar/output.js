var Child = /*#__PURE__*/function (_Parent) {
  "use strict";

  function Child() {
    var _this;
    babelHelpers.classCallCheck(this, Child);
    _this = babelHelpers.callSuper(this, Child);
    _this.scopedFunctionWithThis = function () {
      _this.name = {};
    };
    return _this;
  }
  babelHelpers.inherits(Child, _Parent);
  return babelHelpers.createClass(Child);
}(Parent);
