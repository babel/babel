var _privateField = /*#__PURE__*/new WeakMap(),
    _privateFieldValue = /*#__PURE__*/new WeakSet();

class Cl {
  get self() {
    this.counter++;
    return this;
  }

  constructor() {
    _privateFieldValue.add(this);

    _privateField.set(this, 0);

    babelHelpers.defineProperty(this, "counter", 0);
    this.self, 1([(this.self, babelHelpers.readOnlyErrorSet("#privateFieldValue"))._] = [1]), babelHelpers.readOnlyError("#privateFieldValue");
  }

}

function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldGet2(this, _privateField);
}

const cl = new Cl();
