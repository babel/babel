var Child = /*#__PURE__*/function (_Parent) {
  "use strict";

  babelHelpers.inherits(Child, _Parent);
  var _super = babelHelpers.createSuper(Child);
  function Child() {
    var _this;
    babelHelpers.classCallCheck(this, Child);
    _this = _super.call(this);
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "scopedFunctionWithThis", function () {
      _this.name = {};
    });
    return _this;
  }
  return babelHelpers.createClass(Child);
}(Parent);
