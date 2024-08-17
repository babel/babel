var _privateField = /*#__PURE__*/new WeakMap();
var _Cl_brand = /*#__PURE__*/new WeakSet();
class Cl {
  get self() {
    this.counter++;
    return this;
  }
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Cl_brand);
    babelHelpers.classPrivateFieldInitSpec(this, _privateField, 0);
    babelHelpers.defineProperty(this, "counter", 0);
    this.self, 1([(this.self, babelHelpers.readOnlyError("#privateFieldValue"))._] = [1]), babelHelpers.readOnlyError("#privateFieldValue");
  }
}
function _get_privateFieldValue(_this) {
  return babelHelpers.classPrivateFieldGet2(_privateField, _this);
}
var cl = new Cl();
