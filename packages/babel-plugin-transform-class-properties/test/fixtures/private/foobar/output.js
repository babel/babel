var _scopedFunctionWithThis = /*#__PURE__*/new WeakMap();
var Child = /*#__PURE__*/function (_Parent) {
  "use strict";

  babelHelpers.inherits(Child, _Parent);
  function Child() {
    var _this;
    babelHelpers.classCallCheck(this, Child);
    _this = babelHelpers.callSuper(this, Child);
    babelHelpers.classPrivateFieldInitSpec(babelHelpers.assertThisInitialized(_this), _scopedFunctionWithThis, {
      writable: true,
      value: () => {
        _this.name = {};
      }
    });
    return _this;
  }
  return babelHelpers.createClass(Child);
}(Parent);
