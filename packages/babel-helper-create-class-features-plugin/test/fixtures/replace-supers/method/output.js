var _foo = new WeakSet();

class A extends B {
  constructor(...args) {
    super(...args);

    _foo.add(this);
  }

}

var _foo2 = function _foo2() {
  let _A;

  babelHelpers.get(babelHelpers.getPrototypeOf(A.prototype), "x", this);
};
