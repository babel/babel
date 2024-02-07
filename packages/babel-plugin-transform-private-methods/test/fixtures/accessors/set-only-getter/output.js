var _privateField = /*#__PURE__*/new WeakMap();
var _privateFieldValue = /*#__PURE__*/new WeakSet();
class Cl {
  get self() {
    this.counter++;
    return this;
  }
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _privateFieldValue);
    babelHelpers.classPrivateFieldInitSpec(this, _privateField, 0);
    babelHelpers.defineProperty(this, "counter", 0);
    this.self, 1([(this.self, babelHelpers.readOnlyError("#privateFieldValue"))._] = [1]), babelHelpers.readOnlyError("#privateFieldValue");
  }
}
function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldGet2(this, _privateField);
}
var cl = new Cl();
