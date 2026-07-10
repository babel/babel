var _class, _descriptor;
let Example = (_class = class Example {
  constructor() {
    babelHelpers.initializerDefineProperty(this, "decorated", _descriptor, this);
    babelHelpers.defineProperty(this, "after", 3);
  }
  before = 1;
  method() {}
}, _descriptor = babelHelpers.applyDecoratedDescriptor(_class.prototype, "decorated", [dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 2;
  }
}), _class);
