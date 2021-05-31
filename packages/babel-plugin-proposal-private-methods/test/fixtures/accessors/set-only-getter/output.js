var _privateField = /*#__PURE__*/new WeakMap();

var _privateFieldValue = /*#__PURE__*/new WeakMap();

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
    this.self, 1([babelHelpers.classPrivateFieldDestructureSet(this.self, _privateFieldValue).value] = [1]), babelHelpers.readOnlyError("#privateFieldValue");
  }

}

function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldGet(this, _privateField);
}

var cl = new Cl();
