var _method = /*#__PURE__*/new WeakSet();

class A {
  counter = (_method.add(this), 0);

  self() {
    this.counter++;
    return this;
  }

  constructor() {
    this.self(), 2, babelHelpers.readOnlyError("#method");
    [(this, babelHelpers.readOnlyErrorSet("#method"))._] = [2];
  }

}

function _method2() {}
