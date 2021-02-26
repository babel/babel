var _class, _descriptor, _descriptor2, _temp;

function dec() {} // Create a local function binding so babel has to change the name of the helper


function _defineProperty() {}

let A = (_class = (_temp = function A() {
  "use strict";

  babelHelpers.classCallCheck(this, A);
  babelHelpers.initializerDefineProperty(this, "a", _descriptor, this);
  babelHelpers.initializerDefineProperty(this, "b", _descriptor2, this);
  babelHelpers.defineProperty(this, "c", 456);
}, _temp), (_descriptor = babelHelpers.applyDecoratedDescriptor(_class.prototype, "a", [dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = babelHelpers.applyDecoratedDescriptor(_class.prototype, "b", [dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 123;
  }
})), _class);
