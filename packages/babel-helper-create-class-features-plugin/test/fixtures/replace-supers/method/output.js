var _foo = /*#__PURE__*/new WeakSet();

class A extends B {
  constructor(...args) {
    super(...args);

    _foo.add(this);
  }

}

function _foo2() {
  let _A;

  babelHelpers.get(babelHelpers.getPrototypeOf(A.prototype), "x", this);
}
