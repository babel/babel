var _method = new WeakSet();

class A {
  self() {
    this.counter++;
    return this;
  }

  constructor() {
    _method.add(this);

    babelHelpers.defineProperty(this, "counter", 0);
    this.self(), 2, babelHelpers.readOnlyError("#method");
  }

}

var _method2 = function _method2() {};
