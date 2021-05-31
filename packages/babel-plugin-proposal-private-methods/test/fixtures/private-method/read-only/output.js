var _method = /*#__PURE__*/new WeakSet();

class A {
  self() {
    this.counter++;
    return this;
  }

  constructor() {
    _method.add(this);

    babelHelpers.defineProperty(this, "counter", 0);
    this.self(), 2, babelHelpers.readOnlyError("#method");
    [babelHelpers.classPrivateFieldDestructureSet(this, _method).value] = [2];
  }

}

function _method2() {}
