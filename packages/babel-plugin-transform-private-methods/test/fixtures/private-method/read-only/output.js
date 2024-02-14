var _A_brand = /*#__PURE__*/new WeakSet();
class A {
  self() {
    this.counter++;
    return this;
  }
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _A_brand);
    babelHelpers.defineProperty(this, "counter", 0);
    this.self(), 2, babelHelpers.readOnlyError("#method");
    [(this, babelHelpers.readOnlyError("#method"))._] = [2];
  }
}
function _method() {}
