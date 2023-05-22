var results = [];
var _privateFieldValue = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _privateFieldValue);
    this.self, results.push(2), babelHelpers.readOnlyError("#privateFieldValue");
  }
  get self() {
    results.push(1);
    return this;
  }
}
function _privateFieldValue2() {
  return 42;
}
