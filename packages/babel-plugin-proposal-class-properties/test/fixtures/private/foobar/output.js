var _scopedFunctionWithThis = new WeakMap();

var Child = /*#__PURE__*/function (_Parent) {
  "use strict";

  babelHelpers.inherits(Child, _Parent);

  var _super = babelHelpers.createSuper(Child);

  function Child() {
    var _this;

    babelHelpers.classCallCheck(this, Child);
    _this = _super.call(this);

    _scopedFunctionWithThis.set(babelHelpers.assertThisInitialized(_this), {
      writable: true,
      value: () => {
        _this.name = {};
      }
    });

    return _this;
  }

  return Child;
}(Parent);
