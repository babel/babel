var _scopedFunctionWithThis = babelHelpers.classPrivateFieldLooseKey("scopedFunctionWithThis");

var Child = /*#__PURE__*/function (_Parent) {
  "use strict";

  babelHelpers.inherits(Child, _Parent);

  var _super = babelHelpers.createSuper(Child);

  function Child() {
    var _this;

    babelHelpers.classCallCheck(this, Child);
    _this = _super.call(this);
    Object.defineProperty(babelHelpers.assertThisInitialized(_this), _scopedFunctionWithThis, {
      writable: true,
      value: function value() {
        _this.name = {};
      }
    });
    return _this;
  }

  return Child;
}(Parent);
