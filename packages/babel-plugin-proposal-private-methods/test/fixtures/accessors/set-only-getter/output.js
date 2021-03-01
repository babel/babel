var _privateField = new WeakMap();

var _privateFieldValue = new WeakMap();

class Cl {
  get self() {
    this.counter++;
    return this;
  }

  constructor() {
    _privateFieldValue.set(this, {
      get: _get_privateFieldValue,
      set: void 0
    });

    _privateField.set(this, {
      writable: true,
      value: 0
    });

    babelHelpers.defineProperty(this, "counter", 0);
    this.self, 1, babelHelpers.readOnlyError("#privateFieldValue");
  }

}

var _get_privateFieldValue = function () {
  return babelHelpers.classPrivateFieldGet(this, _privateField);
};

var cl = new Cl();
