var _scopedFunctionWithThis = /*#__PURE__*/new WeakMap();
let Child = /*#__PURE__*/function (_Parent) {
  "use strict";

  function Child() {
    var _this;
    babelHelpers.classCallCheck(this, Child);
    _this = babelHelpers.callSuper(this, Child);
    babelHelpers.classPrivateFieldInitSpec(_this, _scopedFunctionWithThis, () => {
      _this.name = {};
    });
    return _this;
  }
  babelHelpers.inherits(Child, _Parent);
  return babelHelpers.createClass(Child);
}(Parent);
