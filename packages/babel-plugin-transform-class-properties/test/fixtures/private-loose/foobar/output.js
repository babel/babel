var _scopedFunctionWithThis = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("scopedFunctionWithThis");
let Child = /*#__PURE__*/function (_Parent) {
  "use strict";

  babelHelpers.inherits(Child, _Parent);
  function Child() {
    var _this;
    babelHelpers.classCallCheck(this, Child);
    _this = babelHelpers.callSuper(this, Child);
    Object.defineProperty(babelHelpers.assertThisInitialized(_this), _scopedFunctionWithThis, {
      writable: true,
      value: function () {
        _this.name = {};
      }
    });
    return _this;
  }
  return babelHelpers.createClass(Child);
}(Parent);
