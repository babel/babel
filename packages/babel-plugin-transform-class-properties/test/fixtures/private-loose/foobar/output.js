var _scopedFunctionWithThis = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("scopedFunctionWithThis");
let Child = /*#__PURE__*/function (_Parent) {
  "use strict";

  function Child() {
    var _this;
    babelHelpers.classCallCheck(this, Child);
    _this = babelHelpers.callSuper(this, Child);
    Object.defineProperty(_this, _scopedFunctionWithThis, {
      writable: true,
      value: function () {
        _this.name = {};
      }
    });
    return _this;
  }
  babelHelpers.inherits(Child, _Parent);
  return babelHelpers.createClass(Child);
}(Parent);
