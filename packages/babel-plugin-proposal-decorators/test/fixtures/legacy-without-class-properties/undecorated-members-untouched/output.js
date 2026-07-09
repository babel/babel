var _class, _descriptor;
let Example = (_class = class Example {
  constructor() {
    babelHelpers.initializerDefineProperty(this, "decorated", _descriptor, this);
  }
  undecorated = 2;
  #privateField = 3;
  static staticUndecorated = 4;
  method() {}
  #privateMethod() {
    return this.#privateField;
  }
}, _descriptor = babelHelpers.applyDecoratedDescriptor(_class.prototype, "decorated", [dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _class);
