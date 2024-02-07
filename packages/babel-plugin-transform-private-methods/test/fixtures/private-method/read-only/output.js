var _method = /*#__PURE__*/new WeakSet();
class A {
  self() {
    this.counter++;
    return this;
  }
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _method);
    babelHelpers.defineProperty(this, "counter", 0);
    this.self(), 2, babelHelpers.readOnlyError("#method");
    [(this, babelHelpers.readOnlyError("#method"))._] = [2];
  }
}
function _method2() {}
